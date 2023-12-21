import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiLogin from './ApiLogin'
import './Login.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleLoginClick = () => {
    ApiLogin(username, password, navigate, setError)
  }

  const handleRegisterNavigate = () => {
    navigate('/register')
  }

  return (
    <div className='container'>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Stack spacing={4}>
        <Stack direction='row' spacing={2}>
          <TextField
            label='Email'
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Stack>
        <Stack direction='row' spacing={2}>
          <TextField
            label='Password'
            helperText='Do not share your password with anyone'
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Stack>
        <Stack direction='row' spacing={2}>
          <Button onClick={handleLoginClick} variant='contained'>
            Login
          </Button>
          <Button
            onClick={handleRegisterNavigate}
            variant='contained'
            color='secondary'
          >
            Register
          </Button>
        </Stack>
      </Stack>
    </div>
  )
}

export default Login
