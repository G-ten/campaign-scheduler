import React from 'react'
import { Link } from 'react-router-dom';
import { AuthContext, useAuth } from '../context/AuthContext';

const Header = () => {

    const { user, logout } = useAuth(AuthContext);

    return (
        <header className="header">
            <div className="container mx-auto p-4 d-flex align-items-center justify-content-between">
                <Link to="/" className="fs-5 fw-medium">Hi, {user && user.name}</Link>
                <nav className="d-flex align-items-center">
                    {user ? (
                        <>
                            <Link onClick={logout} className="text-danger fw-bold">Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="me-3 fw-medium">Login</Link>
                            <Link to="/signup" className="fw-medium">Signup</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header