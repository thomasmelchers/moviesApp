import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './views/Layout'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Unauthorized from './pages/unauthorized/Unauthorized'
import PersistLogin from './views/PersistLogin'
import LandingPage from './pages/landingPage/LandingPage'
import RequireAuth from './views/RequireAuth'
import UserProfilePage from './pages/userProfile/UserProfilePage'
import Home from './pages/home/Home'
import AdminDashboard from './pages/admin/AdminDashboard'
import NotFound from './pages/error/NotFound'
import Movies from './pages/movies/Movies'
import Movie from './pages/movies/Movie'
import MoviesType from './pages/movies/MoviesType'
import TvShow from './pages/tvShows/TvShow'
import TvShows from './pages/tvShows/TvShows'
import TvShowsType from './pages/tvShows/TvShowsType'

function App() {
    const ROLES = {
        user: 1000,
        editor: 2000,
        admin: 3000,
    }

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/" element={<Layout />}>
                {/* PUBLIC ROUTES */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* PERSIST LOGIN */}
                <Route element={<PersistLogin />}>
                    {/* PROTECTED ROUTE */}
                    {/* User routes */}
                    <Route
                        element={
                            <RequireAuth
                                allowedRoles={[
                                    ROLES.admin,
                                    ROLES.editor,
                                    ROLES.user,
                                ]}
                            />
                        }
                    >
                        <Route path="home" element={<Home />} />
                        <Route
                            path="profile/:id"
                            element={<UserProfilePage />}
                        />
                        <Route path="movies" element={<Movies />} />
                        <Route
                            path="movies/:movieType"
                            element={<MoviesType />}
                        />
                        <Route path="movie/:id" element={<Movie />} />
                        <Route path="tv-shows" element={<TvShows />} />
                        <Route
                            path="tv-shows/:tvShowsType"
                            element={<TvShowsType />}
                        />
                        <Route path="tv-show/:id" element={<TvShow />} />
                    </Route>

                    {/* Admin routes */}
                    <Route
                        element={<RequireAuth allowedRoles={[ROLES.admin]} />}
                    >
                        <Route
                            path="admin-dashboard"
                            element={<AdminDashboard />}
                        />
                    </Route>

                    {/* END PERSIST LOGIN */}
                </Route>

                {/* CATCH ALL OTHER ROUTES */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
