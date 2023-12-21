const ApiRegister = async (
  username: string,
  email: string,
  pass: string,
  navigate: Function,
  setError: Function,
) => {
  try {
    const data = {
      username: username,
      email: email,
      password: pass,
    }

    const response = await fetch('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    })

    console.log('Server Response:', response)

    if (!response.ok) {
      throw new Error()
    }

    const json = await response.json()

    localStorage.setItem('token', json.token)
    console.log('Connect')
    navigate('/home')
  } catch (error) {
    console.error('Login failed', 'Invalid email or password', error)
    setError('Invalid email or password')
  }
}

export default ApiRegister
