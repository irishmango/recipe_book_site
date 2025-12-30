import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

// styles
import './Recipe.css'



export default function Recipe() {
    const { id } = useParams()
    const { mode } = useTheme()

    const [receipe, setReceipe] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        let cancelled = false
        const load = async () => {
            setIsPending(true)
            try {
                const ref = doc(db, 'recipes', id)
                const snap = await getDoc(ref)
                if (!snap.exists()) {
                    if (!cancelled) setError('Recipe not found')
                } else {
                    if (!cancelled) setReceipe({ id: snap.id, ...snap.data() })
                }
            } catch (e) {
                console.error(e)
                if (!cancelled) setError('Failed to load recipe')
            } finally {
                if (!cancelled) setIsPending(false)
            }
        }
        load()
        return () => { cancelled = true }
    }, [id])

    return (
        <div className={`recipe ${mode}`}>
            {error && <p className='error'>{error}</p>}
            {isPending && <p className='loading'>Loading...</p>}
            {receipe && (
                <>
                    <h2 className='page-title'>{receipe.title}</h2>
                    <p>Takes {receipe.cookingTime} to cook</p>
                    <ul>
                        {receipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <p className='method'>{receipe.method}</p>
                </>
            )}
        </div>
    )
}