const ApiLogin = async (
  email: string,
  password: string,
  navigate: Function,
  setError: Function,
) => {
  try {
    const data = {
      email: email,
      password: password,
    }

    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error()
    }

    const json = await response.json()
    localStorage.setItem('token', json.token)
    console.log(json.token)
    console.log('Connect')
    navigate('/home', { state: { successMessage: 'Login was successful' } })
  } catch (error) {
    console.error('Login failed', 'Invalid email or password', error)
    setError('Invalid email or password')
  }
}

export default ApiLogin
