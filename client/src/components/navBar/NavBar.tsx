import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'
import { Grid } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import { VideocamRounded } from '@mui/icons-material'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import './navBar.scss'

const NavBar = () => {
    const { auth } = useAuth()
    const navigate = useNavigate()
    const logout = useLogout()

    const signOut = async () => {
        await logout()
        navigate('/')
    }
    console.log(auth)

    return (
        <Grid container className="container">
            <Grid item xs={12} md={2}>
                <Link to="/home" className="title-link">
                    <div className="title">
                        <h1>TomFlix</h1>
                    </div>
                </Link>
            </Grid>
            <Grid
                item
                sx={{ display: { xs: 'none', md: 'flex' } }}
                className="menu"
            >
                {auth?.username ? (
                    <div className="menu__container">
                        <Link to="/home">Home</Link>
                        <Link to="/movies">Movies</Link>
                        <Link to="/tv-shows">Series</Link>
                        <Link to="/favorites">Favorites</Link>
                        <Link to={`/profile/${auth.id}`}>Profile</Link>
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

            {/* SMALL */}
            <Grid
                item
                sx={{
                    display: { xs: 'flex', md: 'none' },
                }}
                className="container-xs"
            >
                {auth?.username ? (
                    <div className="menu__container link__xs">
                        <Link to="/home">
                            <HomeRoundedIcon />
                        </Link>
                        <Link to="/movies">
                            <VideocamRounded />
                        </Link>
                        <Link to="/tv-shows">
                            <LiveTvRoundedIcon />
                        </Link>
                        <Link to="/favorites">
                            <FavoriteOutlinedIcon />
                        </Link>
                        <Link to={`/profile/${auth.id}`}>
                            <PersonRoundedIcon />
                        </Link>

                        <ExitToAppRoundedIcon
                            onClick={signOut}
                            className="logout"
                        />
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
