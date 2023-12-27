export const ApiUser = async () => {
  const token = localStorage.getItem('token')

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    const url = 'http://127.0.0.1:5000/api/user'

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    })

    if (!response.ok) {
      if (response.status === 401) {
        console.log(localStorage.getItem('token'))
        console.error('Unauthorized - Invalid Token')
      } else {
        console.error('Request failed with status:', response.status)
      }
      throw new Error()
    }

    const userData = await response.json()
    console.log(userData)
    const { username, email, password } = userData
    console.log(token)
    console.log(email)
    console.log(username)
    console.log(password)
    return { username, email, password }
  } catch (error) {
    console.log('salut')
    console.error('Invalid Input')
    throw error
  }
}

export default ApiUser
