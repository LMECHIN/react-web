import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './User.css'
import ApiUser from './ApiUser'
import ApiEditUser from './ApiEditUser'
import ApiLogout from '../Auth/ApiLogout'
import ApiDelete from '../Auth/ApiDelete'
import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

const User: React.FC = () => {
  const [userData, setUserData] = useState({ username: '', email: '' })
  const [newUsername, setNewUsername] = useState<string>('')
  const [newEmail, setNewEmail] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [errorMessage, setError] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
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
  }

  const handleApiEditUserClick = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await ApiEditUser(newUsername, newEmail, newPassword, token, setError)
        localStorage.setItem(
          'userData',
          JSON.stringify({ username: newUsername, email: newEmail }),
        )
        const updatedUserData = {
          ...userData,
          username: newUsername,
          email: newEmail,
        }
        setUserData(updatedUserData)
        setUserIsEditing(!userIsEditing)
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
      // L'utilisateur a annulé la suppression
      console.log('Deletion canceled')
    }
  }

  useEffect(() => {
    effectApiUser()
  }, [])

  return (
    <div className='container'>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Box
        sx={{
          width: 500,
          height: 500,
          borderRadius: 10,
          margin: 'auto',
          overflow: 'hidden',
          transition: 'box-shadow 0.3s, transform 0.3s',
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
            />
            <TextField
              label='Email'
              variant='outlined'
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <TextField
              label='Password'
              helperText='Do not share your password with anyone'
              type='password'
              variant='outlined'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/profil.png`}
                  alt='Avatar'
                  style={{
                    width: '40px',
                    height: '40px',
                    marginRight: '10px',
                    borderRadius: '50%',
                  }}
                />
                <p
                  style={{
                    fontSize: '48px',
                    margin: 10,
                  }}
                >
                  {userData.username}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/email.png`}
                  alt='Email Icon'
                  style={{ width: '30px', height: '30px', marginRight: '10px' }}
                />
                <p>{userData.email}</p>
              </div>
            </>
          )}
        </Box>
      </Box>
      <Stack spacing={2} direction='row'>
        <Button onClick={handleLogout} variant='contained' color='error'>
          Logout
        </Button>
        <Button onClick={handleDelete} variant='contained' color='error'>
          Delete
        </Button>
      </Stack>
    </div>
  )
}

export default User
