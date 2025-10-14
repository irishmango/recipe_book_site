import { Link, NavLink } from 'react-router-dom'

// styles
import './NavBar.css'

// components
import SearchBar from './SearchBar'


export default function NavBar() {
    return (
        <div className="navbar">
            <nav>
                <NavLink to="/" className="brand"><h1>Cooking Ninja</h1></NavLink>
                <SearchBar />
                <NavLink to="/search">Search Recipes</NavLink>
            </nav>
        </div>
    )
}
