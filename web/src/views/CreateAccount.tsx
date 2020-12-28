import React, {ChangeEvent, useContext, useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core"
import {Visibility, VisibilityOff} from "@material-ui/icons"
import {Error, Loading} from "../components"
import * as userService from "../services/user"
import * as copyConstant from "../constants/copy"
import * as errorConstant from "../constants/error"
import * as fetchConstant from "../constants/fetch"
import {AuthContext} from "../contexts/auth"

const namePattern = /^[a-zA-Z0-9_\s]{1,100}$/
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{1,100}$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,100}$/

export function CreateAccount(): JSX.Element {
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [fetchStatus, setFetchStatus] = useState(fetchConstant.Status.IDLE)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const userState = {
    name,
    email,
    password,
  }
  const {setAuthenticatedUser} = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (!name || !email || !password || Object.values(errors).includes(true)) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }, [name, email, password, errors])

  function updateName(event: ChangeEvent<HTMLInputElement>): void {
    if (!namePattern.test(event.target.value)) {
      setErrors((errors) => ({...errors, name: true}))
    } else {
      setErrors((errors) => ({...errors, name: false}))
    }

    setName(event.target.value)
  }

  function updateEmail(event: ChangeEvent<HTMLInputElement>): void {
    if (!emailPattern.test(event.target.value)) {
      setErrors((errors) => ({...errors, email: true}))
    } else {
      setErrors((errors) => ({...errors, email: false}))
    }

    setEmail(event.target.value)
  }

  function updatePassword(event: ChangeEvent<HTMLTextAreaElement>): void {
    if (!passwordPattern.test(event.target.value)) {
      setErrors((errors) => ({...errors, password: true}))
    } else {
      setErrors((errors) => ({...errors, password: false}))
    }

    setPassword(event.target.value)
  }

  function toggleShowPassword(): void {
    setShowPassword(!showPassword)
  }

  async function signUp(): Promise<void> {
    setFetchStatus(fetchConstant.Status.LOADING)

    try {
      await userService.signUp(userState)
      await userService.logIn(userState)

      setAuthenticatedUser(true)
      setFetchStatus(fetchConstant.Status.SUCCESS)

      history.push("/plants")
    } catch (error) {
      setFetchStatus(fetchConstant.Status.ERROR)

      console.error(error)
    }
  }

  function cancel(): void {
    history.push("/")
  }

  return (
    <>
      {fetchStatus === fetchConstant.Status.LOADING ? (
        <Loading />
      ) : fetchStatus === fetchConstant.Status.ERROR ? (
        <Error message={errorConstant.GENERIC_MESSAGE} />
      ) : (
        <>
          <Typography variant="h1">{copyConstant.CREATE_ACCOUNT}</Typography>
          <section style={{marginTop: "30px"}}>
            <TextField
              error={errors.name}
              fullWidth
              label="Name"
              onChange={updateName}
              required
              value={name}
              variant="outlined"
            />
            <TextField
              error={errors.email}
              fullWidth
              label="Email"
              onChange={updateEmail}
              required
              type="email"
              value={email}
              variant="outlined"
            />
            <TextField
              error={errors.password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={toggleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label="Password"
              onChange={updatePassword}
              required
              type={showPassword ? "text" : "password"}
              value={password}
              variant="outlined"
            />
            <Button
              color="primary"
              disabled={buttonDisabled}
              fullWidth
              onClick={signUp}
              style={{marginTop: "30px"}}
              variant="contained"
            >
              {copyConstant.CREATE_ACCOUNT}
            </Button>
            <Button
              color="secondary"
              fullWidth
              onClick={cancel}
              style={{marginTop: "30px"}}
              variant="contained"
            >
              {copyConstant.CANCEL}
            </Button>
          </section>
        </>
      )}
    </>
  )
}
