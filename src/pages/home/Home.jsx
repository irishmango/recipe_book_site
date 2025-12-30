// styles
import './Home.css'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import RecipeList from '../../components/RecipeList'

export default function Home() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    const refreshRecipes = async () => {
        setIsPending(true)
        try {
            const snapshot = await getDocs(collection(db, 'recipes'))
            const recipes = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
            setData(recipes)
            setError(recipes.length ? null : 'No recipes to load')
        } catch (e) {
            console.error(e)
            setError('Failed to load recipes')
        } finally {
            setIsPending(false)
        }
    }

    useEffect(() => {
        refreshRecipes()
    }, [])

    return (
        <div className="home">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} onRefresh={refreshRecipes} />}
        </div>
    )
}