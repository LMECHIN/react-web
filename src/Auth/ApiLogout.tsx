const ApiLogout = async (
  token: string,
  navigate: Function,
  setError: Function,
) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: token,
      },
    })

    if (!response.ok) {
      throw new Error()
    }

    console.log('Logout successful')
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.removeItem('taskData')
    localStorage.removeItem('statusesOrder')
    localStorage.removeItem('boxPosition')
    navigate('/', { state: { successMessage: 'Logout was successful' } })
  } catch (error) {
    console.error('Logout failed', error)
    setError('Logout failed')
  }
}

export default ApiLogout
