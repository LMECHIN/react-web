// Login.tsx

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ApiLogin from './ApiLogin'
import './Login.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import MyAlert from '../lib/my_alert'
import { MySnackbar } from '../lib/my_snackbar'
import ConnectionStatusAlert from '../lib/my_connection_status'

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setError] = useState<string>('')
  const [successMessage, setSuccess] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()
  const successMessageFromLogout = location.state?.successMessage || ''

  const handleLoginClick = () => {
    ApiLogin(username, password, navigate, setError)
  }

  const handleRegisterNavigate = () => {
    navigate('/register')
  }

  const handleCloseAlert = () => {
    setError('')
    setSuccess('')
  }

  useEffect(() => {
    if (successMessageFromLogout) {
      setSuccess(successMessageFromLogout)
    }
  }, [successMessageFromLogout])

  return (
    <div className='container'>
      <Stack spacing={4}>
        <ConnectionStatusAlert onClose={() => {}} />
        <MyAlert errorMessage={errorMessage} onClose={handleCloseAlert} />
        <Stack direction='row' spacing={2}>
          <TextField
            label='Email'
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ width: '100%' }}
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
            sx={{ width: '100%' }}
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
      <MySnackbar open={!!successMessage} onClose={handleCloseAlert}>
        {successMessage}
      </MySnackbar>
    </div>
  )
}

export default Login
