import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import axios from '../../api/axios'
import { Grid } from '@mui/material'
import URL from '../../api/routes'
import './register.scss'
import Spinner from '../../components/shared/spinner/Spinner'

// User regex : must start with lower or uppercase letter
// Then be followed by 3 to 23 characters (letters or digits)
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/

// 1 lowercase letter
// 1 uppercase letter
// 1 digit
// 1 special character
// total of 8 -24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {
    const usernameRef = useRef<HTMLElement>()
    const errRef = useRef<HTMLElement>()

    const [username, setUsername] = useState<string>('')
    const [validUsername, setValidUsername] = useState<boolean>(false)
    const [usernameFocus, setUsernameFocus] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')
    const [validEmail, setValidEmail] = useState<boolean>(false)
    const [emailFocus, setEmailFocus] = useState<boolean>(false)

    const [password, setPassword] = useState<string>('')
    const [validPassword, setValidPassword] = useState<boolean>(false)
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false)

    const [matchPassword, setMatchPassword] = useState<string>('')
    const [validMatch, setValidMatch] = useState<boolean>(false)
    const [matchFocus, setMatchFocus] = useState<boolean>(false)

    const [errMessage, setErrMessage] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post(URL.register, JSON.stringify({ username, password, email }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
            console.log(response.data)
            setSuccess(true)
            setUsername('')
            setPassword('')
            setMatchPassword('')
            setEmail('')
            setIsLoading(false)
        } catch (err: any) {
            setIsLoading(false)
            console.error(err)
            if (!err?.response) {
                setErrMessage('No Server Response')
            } else if (err.response?.status === 409) {
                setErrMessage('Username Taken')
            } else if (err.response?.data?.error?.code === 11000) {
                setErrMessage(
                    err.response?.data?.error?.keyValue?.email
                        ? `This email, ${err.response?.data?.error?.keyValue.email}, is already registered. Please find another one!`
                        : `This username, ${err.response?.data?.error?.keyValue.username}, is already registered. Please find another one!`
                )
            } else {
                setErrMessage('Registration Failed')
            }

            if (errRef.current) {
                errRef.current.focus()
            }
        }
    }

    useEffect(() => {
        if (usernameRef.current) {
            usernameRef.current.focus()
        }
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(username)
        setValidUsername(result)
    }, [username])

    useEffect(() => {
        const result = email.includes('@') ? true : false
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setValidMatch(password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setErrMessage('')
    }, [username, email, password, matchPassword])

    return (
        <Grid
            container
            flexDirection="column"
            item
            xs={10}
            md={6}
            lg={4}
            p={3}
            className={!success ? 'register__container' : 'register__container success__container'}
        >
            {isLoading ? <Spinner /> : null}
            {success && !isLoading ? (
                <section>
                    <h1>You are successfully registered!</h1>
                    <Link to="/login">
                        <button>Sign In</button>
                    </Link>
                </section>
            ) : null}
            {!isLoading && !success ? (
                <section>
                    <h1>Register</h1>

                    <form onSubmit={handleSubmit}>
                        {errMessage ? (
                            <div className="form__layout">
                                <p className="error">{errMessage}</p>
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
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                                fullWidth
                                // Set invalid at the beginning
                                sx={{ backgroundColor: 'transparent' }}
                                inputProps={{
                                    'aria-invalid': validUsername ? 'false' : 'true',
                                }}
                                // requirement for the form
                                aria-describedby="uidnote"
                            />
                            <p
                                id="uidnote"
                                className={usernameFocus && username && !validUsername ? 'instructions' : 'offscreen'}
                            >
                                4 to 24 characters.
                                <br />
                                Must begin with a letter.
                                <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>

                        <div className="form__layout">
                            <TextField
                                type="email"
                                id="email"
                                label="Email"
                                variant="filled"
                                size="small"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                autoComplete="off"
                                aria-describedby="emailnote"
                                inputProps={{
                                    'aria-invalid': validEmail ? 'false' : 'true',
                                }}
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                                fullWidth
                            />
                            <p
                                id="pwdnote"
                                className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}
                            >
                                Need a valid email
                            </p>
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
                                aria-describedby="pwdnote"
                                inputProps={{
                                    'aria-invalid': validPassword ? 'false' : 'true',
                                }}
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                                fullWidth
                            />
                            <p id="pwdnote" className={passwordFocus && !validPassword ? 'instructions' : 'offscreen'}>
                                8 to 24 characters.
                                <br />
                                Must include uppercase and lowercase letters, a number and a special character.
                                <br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span>{' '}
                                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{' '}
                                <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                        </div>

                        <div className="form__layout">
                            <TextField
                                type="password"
                                id="confirmPassword"
                                label="Confirm Password"
                                variant="filled"
                                size="small"
                                onChange={(e) => setMatchPassword(e.target.value)}
                                value={matchPassword}
                                required
                                autoComplete="off"
                                aria-describedby="confirmnote"
                                inputProps={{
                                    'aria-invalid': validMatch ? 'false' : 'true',
                                }}
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                fullWidth
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                                Must match the first password input field.
                            </p>
                        </div>

                        <div className="form__layout">
                            <button
                                disabled={!validUsername || !validPassword || !validMatch || !validEmail ? true : false}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="form__layout">
                            <p className="login_link_label">
                                Already registered?
                                <br />
                                <span className="line">
                                    {/*put router link here*/}
                                    <Link to="/login">Sign In</Link>
                                </span>
                            </p>
                        </div>
                    </form>
                </section>
            ) : null}
        </Grid>
    )
}

export default Register
