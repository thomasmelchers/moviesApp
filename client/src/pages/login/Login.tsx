import React, { useRef, useState, useEffect } from 'react'
import axios from '../../api/axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { TextField, Grid } from '@mui/material'
import useAuth from '../../hooks/useAuth'
import URL from '../../api/routes'
import './login.scss'

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/home'

    const usernameRef = useRef<HTMLElement>()
    const errRef = useRef<HTMLElement>()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setErrorMessage('')
    }, [username, password])

    // Persist login
    const togglePersist = () => {
        setPersist((prev) => !prev)
    }

    useEffect(() => {
        localStorage.setItem('persist', String(persist))
    }, [persist])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                URL.login,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            )
            const id = response?.data?.id
            const accessToken = response?.data?.accessToken
            const auth = {
                id,
                username,
                accessToken,
            }
            setAuth(auth)
            setUsername('')
            setPassword('')
            navigate(from, { replace: true })
        } catch (error: any) {
            if (!error?.response) {
                setErrorMessage('No server response, try it later!')
            } else if (error.response?.status === 400) {
                setErrorMessage('Missing username or password!')
            } else if (error.response?.status === 401) {
                setErrorMessage('Credentials are not valid!')
            } else {
                setErrorMessage('Sorry, something went wrong!')
            }

            if (errRef.current) {
                errRef.current.focus()
            }
        }
    }

    return (
        <Grid
            container
            flexDirection="column"
            item
            xs={10}
            md={6}
            lg={4}
            p={3}
            className="login__container"
        >
            <section>
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    {errorMessage ? (
                        <div className="form__layout">
                            <p className="error">{errorMessage}</p>
                        </div>
                    ) : null}

                    <div className="form__layout">
                        <TextField
                            type="text"
                            id="username"
                            label="Username"
                            variant="filled"
                            size="small"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            inputRef={usernameRef}
                            required
                            autoComplete="off"
                            fullWidth
                        />
                    </div>

                    <div className="form__layout">
                        <TextField
                            type="password"
                            id="password"
                            label="Password"
                            variant="filled"
                            size="small"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            autoComplete="off"
                            fullWidth
                        />
                    </div>

                    <div className="form__layout">
                        <div className="persistCheck">
                            <input
                                type="checkbox"
                                id="perist"
                                onChange={togglePersist}
                                checked={persist}
                            />
                            <label htmlFor="persist">
                                Save your credentials on this device
                            </label>
                        </div>
                    </div>

                    <div className="form__layout">
                        <button>Sign In</button>
                    </div>

                    <div className="form__layout">
                        <p className="register_link_label">
                            Need an Account?
                            <br />
                            <span>
                                <Link to={URL.register}>Register</Link>
                            </span>
                        </p>
                    </div>
                </form>
            </section>
        </Grid>
    )
}

export default Login
