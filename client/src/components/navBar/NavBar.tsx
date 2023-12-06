import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'
import { Grid } from '@mui/material'
import './navBar.scss'

const NavBar = () => {
    const { auth } = useAuth()
    const navigate = useNavigate()
    const logout = useLogout()

    const signOut = async () => {
        await logout()
        navigate('/')
    }

    return (
        <Grid container className="container">
            <Grid item>
                <div className="title">
                    <h1>TomFlix</h1>
                </div>
            </Grid>
            <Grid
                item
                sx={{ display: { xs: 'none', md: 'flex' } }}
                className="menu"
            >
                {auth?.username ? (
                    <div className="menu__container">
                        <Link to="/home" className="menu__link">
                            Home
                        </Link>
                        <Link to="" className="menu__link">
                            Movies
                        </Link>
                        <Link to="" className="menu__link">
                            Series
                        </Link>
                        <Link to={`/profile/${auth.id}`} className="menu__link">
                            Profile
                        </Link>
                        <button onClick={signOut}>Logout</button>
                    </div>
                ) : (
                    <div className="menu__container__not-login">
                        <Link to="/login">
                            <button>Login</button>
                        </Link>
                    </div>
                )}
            </Grid>
        </Grid>
    )
}

export default NavBar
