import React, { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MySnackbar } from '../lib/my_snackbar'
import MyAppbar from '../lib/app_bar'
import DragAndDrop from '../lib/drag_drop'
import ConnectionStatusAlert from '../lib/my_connection_status'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import './Home.css'
import Stack from '@mui/material/Stack'
import ApiGetTask from './ApiGetTask'
import ApiEditTask from './ApiEditTask'

interface TaskData {
  task_id: string
  title: string
  description: string
  due_date: string
  status: string
  priority: string
  created_at: string
  updated_at: string
}

const Home: React.FC = () => {
  const [successMessage, setSuccess] = useState<string>('')
  const [openTools, setOpenTools] = useState(false)
  const [textFields, setTextFields] = useState<React.ReactElement[]>([])
  const location = useLocation()
  const [errorMessage, setError] = useState<string>('')
  const successMessageFromLogout = location.state?.successMessage || ''
  const [taskList, setTaskList] = useState<TaskData[]>([])
  const [statuses, setStatuses] = useState(['To Do', 'In Progress', 'Done'])
  const dragPerson = useRef<number | null>(null)

  const handleDragStart = (boxIndex: number) => {
    dragPerson.current = boxIndex
  }

  const handleDragEnter = (boxIndex: number) => {
    if (dragPerson.current !== null && dragPerson.current !== boxIndex) {
      const updatedTaskList = [...statuses]
      const draggedTask = updatedTaskList[dragPerson.current]
      updatedTaskList.splice(dragPerson.current, 1)
      updatedTaskList.splice(boxIndex, 0, draggedTask)

      setStatuses(updatedTaskList)
      dragPerson.current = boxIndex
    }
  }

  const handleDragEnd = async () => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   try {
    //     await ApiEditTask(token, "14", "testtcccc", "other test", "Done", "Medium", setError)
    //     localStorage.setItem(
    //       'taskData',
    //       JSON.stringify({
    //         task_id: "14",
    //         title: "testtcccc",
    //         description: "other test",
    //         status: "Done",
    //         priority: "Medium",
    //       }),
    //     )
    //   } catch (error) {
    //     console.error('Error editing user', error)
    //   }
    // }
    dragPerson.current = null
  }

  const renderBoxes = () => {
    const screenHeight = window.innerHeight

    return statuses.map((status, boxIndex) => {
      const filteredTasks = taskList.filter((task) => task.status === status)
      console.log(filteredTasks);
      const boxHeight = 250 + (filteredTasks.length - 1.4) * 150

      return (
        <div
          key={boxIndex}
          draggable
          onDragStart={() => handleDragStart(boxIndex)}
          onDragEnter={() => handleDragEnter(boxIndex)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
        >
          <Box
            key={boxIndex}
            sx={{
              width: 250,
              height: boxHeight,
              borderRadius: 1,
              position: 'absolute',
              top: `${screenHeight / 5}px`,
              left: `${25 + 25 * boxIndex}%`,
              transform: 'translate(-50%, 0%)',
              alignItems: 'center',
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <p className='card-title'>{status}</p>
            {filteredTasks.map((task, taskIndex) => (
              <Box
                sx={{
                  width: 250,
                  height: 125,
                  borderRadius: 1,
                  position: 'absolute',
                  top: `${100 + 150 * taskIndex}px`,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  alignItems: 'center',
                  bgcolor: '#DC143C',
                  '&:hover': {
                    bgcolor: '#B22222',
                  },
                }}
              >
                <p className='task-text-title'>{task.title}</p>
                <p className='task-text-description'>{task.description}</p>
                <p className='task-text-priority'>{task.priority}</p>
                <p className='task-text-priority'>{task.task_id}</p>
              </Box>
            ))}
          </Box>
        </div>
      )
    })
  }

  const effectApiGetTask = async () => {
    try {
      const storedUserData = localStorage.getItem('taskData')
      console.log('Stored Data:', storedUserData)

      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData)

        if (Array.isArray(parsedData)) {
          setTaskList(parsedData)
        } else {
          console.error('Stored data is not an array:', parsedData)
        }
      } else {
        const data = await ApiGetTask()
        setTaskList(data)
        localStorage.setItem('taskData', JSON.stringify(data))
      }
    } catch (error) {
      console.error('Error fetching or parsing task data', error)
    }
  }

  const handleItemClick = () => {
    setOpenTools(!openTools)

    setTextFields((prevTextFields) => [
      ...prevTextFields,
      <TextField
        key={prevTextFields.length}
        label='Your Label'
        variant='outlined'
      />,
    ])
  }

  useEffect(() => {
    effectApiGetTask()
    if (successMessageFromLogout) {
      setSuccess(successMessageFromLogout)
    }
  }, [successMessageFromLogout])

  useEffect(() => {
    const storedOrder = localStorage.getItem('statusesOrder');
    if (storedOrder) {
      setStatuses(JSON.parse(storedOrder));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('statusesOrder', JSON.stringify(statuses));
  }, [statuses]);

  return (
    <div>
      <MyAppbar />
      <ConnectionStatusAlert onClose={() => {}} />

      <img
        src={`${process.env.PUBLIC_URL}/plus.png`}
        alt='Logo'
        className='right-aligned-image'
        onClick={handleItemClick}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />

      {textFields}

      {/* <DragAndDrop /> */}
      <div>{renderBoxes()}</div>
      <MySnackbar open={!!successMessage} onClose={() => setSuccess('')}>
        {successMessage}
      </MySnackbar>
    </div>
  )
}

export default Home
