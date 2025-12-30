// styles
import './RecipeList.css'

import { Link } from 'react-router-dom'
import React from 'react'
import { useTheme } from '../hooks/useTheme'
import Trashcan from '../assets/trashcan-icon.svg'
import { db } from '../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'

export default function RecipeList({ recipes, onRefresh }) {
    const { mode } = useTheme()

    const handleClick = async (id) => {
        try {
            await deleteDoc(doc(db, 'recipes', id))
            onRefresh && onRefresh()
        } catch (e) {
            console.error('Failed to delete recipe:', e)
        }
    }

    if (!recipes?.length) {
        return <div className={`error ${mode}`}>No recipes found...</div>
    }

    return (
        <div className='recipe-list'>
            {recipes.map(recipe => (
                <div className={`card ${mode}`} key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make</p>
                    <div>{(recipe.method || '').substring(0, 100)}...</div>
                    <Link to={`/recipes/${recipe.id}`}>Cook this recipe</Link>
                    <img
                        className='delete'
                        src={Trashcan}
                        alt='Delete recipe'
                        onClick={() => handleClick(recipe.id)}
                    />
                </div>
            ))}
        </div>
    )
}
