import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-background">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src="" alt="" /></Link>
                    <Link className="navbar-title" to="/">Live Code</Link>
                    <div className="row col-4">
                        <ul className="navbar-nav navbar-components">
                            <li><Link className="nav-link" to="/">Home</Link></li>
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            {
                                user ? <></> : <li className="nav-item"><Link className="nav-link button-register" to="/register-admin"><button>Register</button></Link></li>
                            }
                            <li className="nav-item"><Link className="nav-link button-login" to="/login"><button onClick={logout}>{token ? "Logout" : "Login"}</button></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar