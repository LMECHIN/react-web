// MySnackbar.tsx

import React, { forwardRef, ReactNode } from 'react'
import { Snackbar, AlertProps, Alert } from '@mui/material'

export const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />
  },
)

interface MySnackbarProps {
  open: boolean
  onClose: () => void
  children: ReactNode // Utilisez 'children' au lieu de 'message'
}

export const MySnackbar: React.FC<MySnackbarProps> = ({
  open,
  onClose,
  children, // Utilisez 'children' au lieu de 'message'
}) => {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <SnackbarAlert onClose={onClose} severity='success'>
        {children} {/* Utilisez 'children' au lieu de 'message' */}
      </SnackbarAlert>
    </Snackbar>
  )
}
