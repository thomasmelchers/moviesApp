import React from 'react'
import { Link } from 'react-router-dom'
import './notFound.scss'
import useAuth from '../../hooks/useAuth'

const Error = () => {
    return (
        <div className="not-found__container">
            <h2>This page is not found</h2>
            <Link to="/home">
                <button>Home</button>
            </Link>
        </div>
    )
}

export default Error
