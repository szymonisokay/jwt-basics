import React, { useState } from "react"
import { Link } from "react-router-dom"
//MUI
import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useAuthContext } from "../../context/AuthContext"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn(email, password)
  }

  return (
    <div className='center-grid'>
      <div className='card'>
        <Box component='form' onSubmit={handleSubmit}>
          <div className='card-header'>
            <Typography variant='h4' sx={{ fontWeight: "bold" }}>
              PostsManager
            </Typography>
            <Typography variant='body1' color='GrayText'>
              Sign in to your account
            </Typography>
          </div>
          <div className='card-content'>
            <TextField
              id='email'
              label='Email'
              variant='standard'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              id='password'
              label='Password'
              type='password'
              variant='standard'
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
              Sign In
            </Button>
          </div>
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

export default SignIn