import React, { useRef, useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { TextField } from "@mui/material"
import axios from "../../api/axios"
import style from "./login.module.css"
import { Grid } from "@mui/material"
import useAuth from "../../hooks/useAuth"
import URL from "../../api/routes"

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const usernameRef = useRef<HTMLElement>()
  const errRef = useRef<HTMLElement>()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus()
    }
  }, [])

  useEffect(() => {
    setErrorMessage("")
  }, [username, password])

  const togglePersist = () => {
    setPersist((prev) => !prev)
  }

  useEffect(() => {
    if (persist === false || persist === true) {
      return
    } else {
      localStorage.setItem("persist", persist)
    }
  }, [persist])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        URL.login,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )

      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken
      const roles = response?.data?.roles
      const auth = {
        username: username,
        accessToken,
        roles,
      }
      setAuth(auth)
      setUsername("")
      setPassword("")
      setSuccess(true)
    } catch (error: any) {
      if (!error?.response) {
        setErrorMessage("No server response, try it later!")
      } else if (error.response?.status === 400) {
        setErrorMessage("Missing username or password!")
      } else if (error.response?.status === 401) {
        setErrorMessage("Credentials are not valid!")
      } else {
        setErrorMessage("Sorry, something went wrong!")
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
      className={style.login__container}
    >
      <section>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          {errorMessage ? (
            <div className={style.form__layout}>
              <p className={style.error}>{errorMessage}</p>
            </div>
          ) : null}

          <div className={style.form__layout}>
            <TextField
              type="text"
              id="username"
              label="Username"
              variant="outlined"
              size="small"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              inputRef={usernameRef}
              required
              autoComplete="off"
              fullWidth
            />
          </div>

          <div className={style.form__layout}>
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              autoComplete="off"
              fullWidth
            />
          </div>

          <div className={style.form__layout}>
            <div className={style.persistCheck}>
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
          <div className={style.form__layout}>
            <button>Sign In</button>
          </div>

          <div className={style.form__layout}>
            <p>
              Need an Account?
              <br />
              <span>
                <Link to="/register">Register</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </Grid>
  )
}

export default Login
