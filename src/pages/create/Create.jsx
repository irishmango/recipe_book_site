import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useFetch } from '../../hooks/useFetch'   // remove
import { db } from '../../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

// styles
import './Create.css'

export default function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredient, setNewIngredient] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const ingredientsInput = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPending(true)
        setError(null)
        try {
            const recipe = {
                title,
                ingredients,
                method,
                cookingTime: `${cookingTime} minutes`,
                createdAt: serverTimestamp()
            }
            const docRef = await addDoc(collection(db, 'recipes'), recipe)
            navigate(`/recipes/${docRef.id}`)
        } catch (e) {
            console.error(e)
            setError('Failed to add recipe')
        } finally {
            setIsPending(false)
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredient.trim()
        if (ing && !ingredients.includes(ing)) {
            setIngredients(prev => [...prev, ing])
        }
        setNewIngredient('')
        ingredientsInput.current?.focus()
    }

    return (
        <div className='create'>
            <h2 className='page-title'>Add a New Recipe</h2>

            <form onSubmit={handleSubmit}>

                <label>
                    <span>Recipe title:</span>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />
                </label>

                <label>
                    <span>Recipe Ingredients:</span>
                    <div className='ingredients'>
                        <input type="text"
                            onChange={(e) => setNewIngredient(e.target.value)}
                            value={newIngredient}
                            ref={ingredientsInput}
                        />
                        <button className='btn' onClick={handleAdd} type="button">Add</button>
                    </div>
                </label>
                <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

                <label>
                    <span>Recipe Method:</span>
                    <textarea
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                        required
                    />
                </label>

                <label>
                    <span>Cooking Time:</span>
                    <input type="number"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                        required
                    />
                </label>

                <button className='btn' disabled={isPending}>{isPending ? 'Saving…' : 'Submit'}</button>
                {error && <p className="error">{error}</p>}
            </form>

        </div>
    )
}
