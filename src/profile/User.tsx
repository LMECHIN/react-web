import React, { useState, useEffect } from 'react'
import ApiUser from './ApiUser'

const User: React.FC = () => {
  const [userData, setUserData] = useState({ username: '', email: '' })
  const test = async () => {
    try {
      const data = await ApiUser()
      setUserData(data)
    } catch (error) {
      console.error('Error fetching user data', error)
    }
  }
  useEffect(() => {
    test()
  }, [])
  return (
    <div>
      <p>{userData.email}</p>
      <p>{userData.username}</p>
    </div>
  )
}

export default User
