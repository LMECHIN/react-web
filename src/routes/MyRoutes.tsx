import Login from './../Auth/Login'
import Register from './../Auth/Register'
import User from './../profile/User'
import Home from './../home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const MyRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<User />} />
      </Routes>
    </Router>
  )
}

export default MyRoutes
