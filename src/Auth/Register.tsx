import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiRegister from './ApiRegister'
import './Register.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import MyAlert from '../lib/my_alert'
import ConnectionStatusAlert from '../lib/my_connection_status'

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleRegisterClick = () => {
    ApiRegister(username, email, password, navigate, setError)
  }

  const handleLoginNavigate = () => {
    navigate('/')
  }

  const handleCloseAlert = () => {
    setError('')
  }

  return (
    <div className='container'>
      <Stack spacing={4}>
        <ConnectionStatusAlert onClose={() => {}} />
        <MyAlert errorMessage={errorMessage} onClose={handleCloseAlert} />
        <Stack direction='row' spacing={2}>
          <TextField
            label='Username'
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
            label='Email'
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button
            onClick={handleRegisterClick}
            variant='contained'
            color='primary'
          >
            Register
          </Button>
          <Button
            onClick={handleLoginNavigate}
            variant='contained'
            color='secondary'
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </div>
  )
}

export default Register
