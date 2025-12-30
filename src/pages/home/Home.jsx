// styles
import './Home.css'
import { useEffect, useState } from 'react'
import { db } from '../../firebase/config'
import { collection, getDocs } from 'firebase/firestore' // add this
import RecipeList from '../../components/RecipeList'

export default function Home() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsPending(true)
        getDocs(collection(db, 'recipes'))
            .then((snapshot) => {
                if (snapshot.empty) {
                    setError('No recipes to load')
                    setIsPending(false)
                    return
                }
                const recipes = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
                setData(recipes)
                setError(null)
            })
            .catch((e) => {
                console.error(e)
                setError('Failed to load recipes')
            })
            .finally(() => setIsPending(false))
    }, [])

    return (
        <div className="home">
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}