import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

// styles
import './NavBar.css'

// components
import SearchBar from './SearchBar'



export default function NavBar() {
    const { color } = useTheme()

    return (
        <div className="navbar" style={{ background: color }}>
            <nav>
                <NavLink to="/" className="brand"><h1>Cooking Ninja</h1></NavLink>
                <SearchBar />
                <NavLink to="/create">Create Recipe</NavLink>
            </nav>
        </div>
    )
}
