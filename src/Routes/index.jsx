import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import Connections from '../pages/Connections'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Register/>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path:"/profile",
    element: <Profile/>
  },{
    path:"/connections",
    element: <Connections/>
  }
])
