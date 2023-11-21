import React, { useRef, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { TextField } from "@mui/material"
import axios from "../../api/axios"

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
  const [validUserame, setValidUsername] = useState(false)
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
    <section>
      <p>{errMsg}</p>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
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
        />

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
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          fullWidth
        />

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
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          fullWidth
        />

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
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          fullWidth
        />

        <button
          disabled={
            !validUserame || !validPassword || !validMatch || !validEmail
              ? true
              : false
          }
        >
          Sign Up
        </button>
      </form>
    </section>
  )
}

export default Register
