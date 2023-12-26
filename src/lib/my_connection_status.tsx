import React, { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

interface ConnectionStatusProps {
  onClose: () => void
}

const ConnectionStatusAlert: React.FC<ConnectionStatusProps> = ({
  onClose,
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) {
    return null
  }

  return (
    <Alert variant='filled' severity='error' onClose={onClose}>
      <AlertTitle>Offline</AlertTitle>
      You are offline. Please check your internet connection.
    </Alert>
  )
}

export default ConnectionStatusAlert
