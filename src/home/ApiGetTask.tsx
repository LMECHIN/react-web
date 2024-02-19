export const ApiGetTask = async () => {
  const token = localStorage.getItem('token')

  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }

    const url = 'http://127.0.0.1:5000/api/get_task'

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

    const taskData = await response.json()
    let i = 0
    while (i < taskData.tasks.length) {
      console.log(taskData.tasks[i])
      i += 1
    }
    console.log(taskData)
    return taskData.tasks
  } catch (error) {
    console.log('salut')
    console.error('Invalid Input')
    throw error
  }
}

export default ApiGetTask
