import React from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

interface MyAlertProps {
  errorMessage: string
  onClose: () => void
}

const MyAlert: React.FC<MyAlertProps> = ({ errorMessage, onClose }) => {
  return (
    <>
      {errorMessage && (
        <Alert variant='filled' severity='error' onClose={onClose}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
    </>
  )
}

export default MyAlert
