import React, { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TextField } from "@mui/material"
import axios from "../../api/axios"
import { Grid } from "@mui/material"
import style from "./register.module.css"

// User regex : must start with lower or uppercase letter
// Then be followed by 3 to 23 characters (letters or digits)
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/

// 1 lowercase letter
// 1 uppercase letter
// 1 digit
// 1 special character
// total of 8 -24 characters
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const REGISTER_URL = "/register"

const Register = () => {
  const usernameRef = useRef<HTMLElement>()
  const errRef = useRef<HTMLElement>()

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [usernameFocus, setUsernameFocus] = useState(false)

  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState("")
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password, email }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      console.log(response.data)
      // console.log(response.accessToken)
      setSuccess(true)
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUsername("")
      setPassword("")
      setMatchPassword("")
      setEmail("")
    } catch (err: any) {
      console.error(err)
      if (!err?.response) {
        setErrMsg("No Server Response")
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken")
      } else {
        setErrMsg("Registration Failed")
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
    const result = email.includes("@") ? true : false
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
    setValidMatch(password === matchPassword)
  }, [password, matchPassword])

  useEffect(() => {
    setErrMsg("")
  }, [username, email, password, matchPassword])

  return (
    // <Grid
    //   container
    //   flexDirection="column"
    //   justifyContent="center"
    //   alignItems="center"
    // >
    <Grid
      container
      flexDirection="column"
      item
      xs={10}
      md={6}
      lg={4}
      p={3}
      className={style.register__container}
    >
      {success ? (
        <div className={style.success}>
          <h1>You are successfully registered!</h1>
          <Link to="/login">
            <button className={style.signin__button}>Sign In</button>
          </Link>
        </div>
      ) : (
        <>
          <h1>Register</h1>
          <p>{errMsg}</p>

          <form onSubmit={handleSubmit}>
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
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                fullWidth
                // Set invalid at the beginning
                inputProps={{
                  "aria-invalid": validUsername ? "false" : "true",
                }}
                // requirement for the form
                aria-describedby="uidnote"
              />
              <p
                id="uidnote"
                className={
                  usernameFocus && username && !validUsername
                    ? "instructions"
                    : "offscreen"
                }
              >
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div className={style.form__layout}>
              <TextField
                type="email"
                id="email"
                label="Email"
                variant="outlined"
                size="small"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                autoComplete="off"
                aria-describedby="emailnote"
                inputProps={{
                  "aria-invalid": validEmail ? "false" : "true",
                }}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                fullWidth
              />
              <p
                id="pwdnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                Need a valid email
              </p>
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
                aria-describedby="pwdnote"
                inputProps={{
                  "aria-invalid": validPassword ? "false" : "true",
                }}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
                fullWidth
              />
              <p
                id="pwdnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>

            <div className={style.form__layout}>
              <TextField
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                size="small"
                onChange={(e) => setMatchPassword(e.target.value)}
                value={matchPassword}
                required
                autoComplete="off"
                aria-describedby="confirmnote"
                inputProps={{
                  "aria-invalid": validMatch ? "false" : "true",
                }}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                fullWidth
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                Must match the first password input field.
              </p>
            </div>

            <div className={style.form__layout}>
              <button
                className={style.signin__button}
                disabled={
                  !validUsername || !validPassword || !validMatch || !validEmail
                    ? true
                    : false
                }
              >
                Sign Up
              </button>
            </div>

            <div className={style.form__layout}>
              <p>
                Already registered?
                <br />
                <span className="line">
                  {/*put router link here*/}
                  <Link to="/login">Log In</Link>
                </span>
              </p>
            </div>
          </form>
        </>
      )}
    </Grid>
  )
}

export default Register
