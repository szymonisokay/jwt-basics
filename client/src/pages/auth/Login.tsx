import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
//MUI
import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useAuthContext } from "../../context/AuthContext"
import logo from "../../images/logo.png"
import Info from "../../components/utils/Info"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [info, setInfo] = useState(false)
  const [infoType, setInfoType] = useState("")
  const [infoMsg, setInfoMsg] = useState("")

  const { signIn } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setEmail("")
    setPassword("")
    setLoading(true)
    setInfo(false)

    const response = await signIn(email, password)

    setLoading(false)

    if (response?.type === "success") {
      setInfoBox(response.msg, response.type)
      setTimeout(() => navigate("/"), 1000)
    } else if (response?.type === "failed") {
      setInfoBox(response.msg, response.type)
    }
  }

  const setInfoBox = (msg: string, type: string) => {
    setInfo(true)
    setInfoMsg(msg)
    setInfoType(type)
  }

  return (
    <div className='center-grid'>
      <div className='card'>
        <Box component='form' onSubmit={handleSubmit}>
          <div className='card-header'>
            <img src={logo} alt='PostsManager' />
            <Typography
              variant='body1'
              color='GrayText'
              sx={{ marginTop: "1rem" }}
            >
              Sign in to your account
            </Typography>
          </div>
          <div className='card-content'>
            <TextField
              id='email'
              label='Email'
              variant='standard'
              color='secondary'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              id='password'
              label='Password'
              type='password'
              variant='standard'
              color='secondary'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='card-actions'>
            <Button
              type='submit'
              variant='contained'
              sx={{
                width: "100%",
                background: "#141721",
                ":hover": { background: "#292f44" },
              }}
            >
              {loading ? "Loading" : "Sign In"}
            </Button>
          </div>
          {info && <Info msg={infoMsg} type={infoType} />}
        </Box>
      </div>

      <Typography
        variant='body2'
        sx={{ textAlign: "center", marginTop: "1rem" }}
      >
        Don't have an account?&nbsp;
        <Link to='/'>Sign Up</Link>
      </Typography>
    </div>
  )
}

export default Login
