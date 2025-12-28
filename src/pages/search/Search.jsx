import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

// styles

import './Search.css'
import RecipeList from '../../components/RecipeList'

export default function Search() {
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')

    // Use the correct `q` param and handle empty queries
    const url = query
        ? 'http://localhost:3000/recipes?q=' + encodeURIComponent(query)
        : 'http://localhost:3000/recipes'

    const { error, isPending, data } = useFetch(url)

    return (
        <div>
            <h2 className="page-title">Recipes including "{query}"</h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading">Loading...</p>}
            {data && <RecipeList recipes={data} />}
        </div>
    )
}