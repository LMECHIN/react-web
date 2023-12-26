const ApiEditUser = async (
  newUsername: string,
  newEmail: string,
  newPassword: string,
  token: string,
  setError: Function,
) => {
  try {
    const data = {
      new_username: newUsername,
      new_email: newEmail,
      new_password: newPassword,
    }

    const response = await fetch('http://127.0.0.1:5000/api/edit_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error()
    }

    const json = await response.json()
    console.log('User updated successfully:', json)
  } catch (error) {
    console.error('Error updating user:', error)
    setError('Error updating user')
  }
}

export default ApiEditUser
