const ApiEditTask = async (
    token: string,
    taskId: string,
    newTitle: string,
    newDescription: string,
    newStatut: string,
    newPriority: string,
    setError: Function,
) => {
    try {
        const data = {
            task_id: taskId,
            new_title: newTitle,
            new_description: newDescription,
            new_status: newStatut,
            new_priority: newPriority,
        }

        const response = await fetch('http://127.0.0.1:5000/api/edit_task', {
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
        console.log('Task updated successfully:', json)
    } catch (error) {
        console.error('Error updating task:', error)
        setError('Error updating task')
    }
}

export default ApiEditTask
