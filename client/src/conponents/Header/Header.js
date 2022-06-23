import './Header.css'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

const Header = () => {
    const { user } = useAuthContext();

    let guestNavigation = (
        <div id="guest" className='guest'>
            <button className="headerBtm"  > <Link to="/login" />Login</button>
            <button className="headerBtm"  > <Link to="/Register" />Register</button>
        </div>
    );


    let userNavigation = (
        <div id="user" className='user'>
            <div className='userBtn'> <Link to="/user" /> {user.username}</div>
            <button className="headerBtm"  > <Link to="/create" />Create</button>
            <button className="headerBtm"  > <Link to="/logout" />Logout</button>
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