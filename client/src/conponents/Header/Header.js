import './Header.css'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const Header = () => {
    const { user } = useAuthContext();

    let guestNavigation = (
        <div id="guest" className='guest'>
            <li className="headerLink"><Link to="/login" />Login</li>
            <li className="headerLink"  ><Link to="/Register" />Register</li>
        </div>
    );

    let userNavigation = (
        <div id="user" className='user'>
            <span className='user-text'> <Link to="/user" /> {user.username}</span>
            <button className="update-Btm"  > <Link to="/create" />Create</button>
            <button className="update-Btm"  > <Link to="/logout" />Logout</button>
        </div>
    );
    return (
        <header className="header">
            <h1 className="logo"><Link to="/" />Just</h1>
            <ul className="main-nav">
                {user.username
                    ? userNavigation
                    : guestNavigation
                }
            </ul>
        </header>
    )
}

export default Header