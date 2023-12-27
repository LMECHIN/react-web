import React, { useState, useEffect, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './User.css'
import ApiUser from './ApiUser'
import ApiEditUser from './ApiEditUser'
import ApiLogout from '../Auth/ApiLogout'
import ApiDelete from '../Auth/ApiDelete'
import { Box } from '@mui/system'
import MyAlert from '../lib/my_alert'
import { Stack, TextField, Button } from '@mui/material'
import { MySnackbar } from '../lib/my_snackbar'
import ConnectionStatusAlert from '../lib/my_connection_status'

interface UserData {
  username: string
  email: string
  password: string
}

const User: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
    password: '',
  })
  const [newUsername, setNewUsername] = useState<string>('')
  const [newEmail, setNewEmail] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [errorMessage, setError] = useState<string>('')
  const [successMessage, setSuccess] = useState<string>('')
  const [boxSize, setBoxSize] = useState({ width: 500, height: 500 })
  const [isEditing, setIsEditing] = useState(false)
  const [open, setOpen] = useState(false)
  const [userIsEditing, setUserIsEditing] = useState(false)
  const navigate = useNavigate()

  const effectApiUser = async () => {
    try {
      const storedUserData = localStorage.getItem('userData')
      console.log(storedUserData)
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData))
      } else {
        const data = await ApiUser()
        setUserData(data)
        localStorage.setItem('userData', JSON.stringify(data))
      }
    } catch (error) {
      console.error('Error fetching user data', error)
    }
  }

  const handleBoxClick = () => {
    setIsEditing(!isEditing)
  }

  const handleEditUserClick = () => {
    setUserIsEditing(!userIsEditing)
    setError('')
    setBoxSize({
      width: 500,
      height: 500,
    })
  }

  const handleCloseAlert = () => {
    setError('')
    setBoxSize({
      width: 500,
      height: 500,
    })
  }

  const handleApiEditUserClick = async () => {
    const token = localStorage.getItem('token')

    if (!newUsername || !newEmail || !newPassword) {
      setError('Please fill in all the required fields.')
      setBoxSize({
        width: 500,
        height: 600,
      })
      return
    }
    if (token) {
      try {
        await ApiEditUser(newUsername, newEmail, newPassword, token, setError)
        localStorage.setItem(
          'userData',
          JSON.stringify({
            username: newUsername,
            email: newEmail,
            password: newPassword,
          }),
        )
        const updatedUserData = {
          ...userData,
          username: newUsername,
          email: newEmail,
          password: newPassword,
        }
        setUserData(updatedUserData)
        setUserIsEditing(!userIsEditing)
        setSuccess('User informations is updated')
        setOpen(true)
      } catch (error) {
        console.error('Error editing user', error)
      }
    }
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      await ApiLogout(token, navigate, setError)
    }
  }

  const handleSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setSuccess('')
  }

  const handleDelete = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete your account?',
    )

    if (confirmation) {
      const token = localStorage.getItem('token')
      if (token) {
        await ApiDelete(token, navigate, setError)
      }
    } else {
      console.log('Deletion canceled')
    }
  }

  useEffect(() => {
    effectApiUser()
  }, [])

  return (
    <div className='container'>
      <ConnectionStatusAlert onClose={() => {}} />
      <Box
        sx={{
          width: boxSize.width,
          height: boxSize.height,
          borderRadius: 10,
          margin: 'auto',
          overflow: 'hidden',
          transition:
            'box-shadow 0.3s, transform 0.3s, width 0.6s, height 0.6s',
          transform:
            isEditing && !userIsEditing ? 'rotate(180deg)' : 'rotate(0deg)',
          '&:hover': {
            boxShadow: '0 4px 50px rgba(40, 0, 130, 0.8)',
            transform:
              isEditing && !userIsEditing
                ? 'scale(1.1) rotate(180deg)'
                : 'scale(1.1) rotate(0deg)',
          },
        }}
        onClick={handleBoxClick}
      >
        {userIsEditing ? (
          <Stack spacing={2} marginTop='10%' marginBottom={'5%'}>
            <MyAlert errorMessage={errorMessage} onClose={handleCloseAlert} />
            <Stack direction='row' spacing={2} alignSelf='center'>
              <Button
                onClick={handleEditUserClick}
                variant='contained'
                color='secondary'
              >
                Back
              </Button>
              <Button
                onClick={handleApiEditUserClick}
                variant='contained'
                color='primary'
              >
                Validate
              </Button>
            </Stack>
            <TextField
              label='Username'
              variant='outlined'
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
            <TextField
              label='Email'
              variant='outlined'
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
            <TextField
              label='Password'
              helperText='Do not share your password with anyone'
              type='password'
              variant='outlined'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Stack>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '70%',
              backgroundImage: `url(${process.env.PUBLIC_URL}/violet.png)`,
              backgroundSize: 'cover',
            }}
          />
        )}
        <Box
          sx={{
            width: '100%',
            height: '70%',
            bgcolor: '#4B0082',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#FFFFFF',
            padding: '5px',
          }}
        >
          {isEditing && !userIsEditing ? (
            <Button
              onClick={handleEditUserClick}
              variant='contained'
              color='primary'
              sx={{
                transform: 'rotate(180deg)',
                marginTop: '10%',
              }}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <div className='profile-container-title'>
                <img
                  className='profile-image-title'
                  src={`${process.env.PUBLIC_URL}/profil.png`}
                  alt='Avatar'
                />
                <p className='profile-text-title'>{userData.username}</p>
              </div>
              <div className='profile-container'>
                <img
                  className='profile-image'
                  src={`${process.env.PUBLIC_URL}/email.png`}
                  alt='Email Icon'
                />
                <p className='profile-text'>{userData.email}</p>
              </div>
              <div className='profile-container'>
                <img
                  className='profile-image'
                  src={`${process.env.PUBLIC_URL}/password.png`}
                  alt='Password Icon'
                />
                <p className='profile-text'>{userData.password.replace(/./g, '*')}</p>
              </div>
            </>
          )}
        </Box>
      </Box>
      <Stack spacing={2} direction='row'>
        <>
          <Button onClick={handleLogout} variant='contained' color='error'>
            Logout
          </Button>
        </>
        <Button onClick={handleDelete} variant='contained' color='error'>
          Delete
        </Button>
      </Stack>
      <MySnackbar open={open} onClose={handleSnack}>
        {successMessage}
      </MySnackbar>
    </div>
  )
}

export default User
