const ApiLogout = async (
  token: string,
  navigate: Function,
  setError: Function,
) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/delete_user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: token,
      },
    })

    if (!response.ok) {
      throw new Error()
    }

    console.log('Delete successful')
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.removeItem('taskData')
    navigate('/', { state: { successMessage: 'Delete user was successful' } })
  } catch (error) {
    console.error('Delete failed', error)
    setError('Delete failed')
  }
}

export default ApiLogout
