// styles
import './SearchBar.css'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // perform search action with the query
        // ?q=${query}
        navigate(`/search?q=${query}`);
    }


    return (
        <div className='searchbar'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search:</label>
                <input
                    type="text"
                    id="search"
                    onChange={(e) => setQuery(e.target.value)}
                    required

                />
            </form>

        </div>
    )
}
