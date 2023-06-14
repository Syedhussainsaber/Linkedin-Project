import LoginComponent from '../components/LoginComponent'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import LoaderComponent from '../components/common/LoaderComponent'

export const Login = () => {
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      try {
        if (res.accessToken) {
          setLoader(false)
          navigate('/home')
        } else if (!res.accessToken) {
          setLoader(false)
          navigate('/')
        }
        console.log(res.accessToken)
      } catch (err) {
        setLoader(false)
        navigate('/')
        console.log(err)
      }
    })
  }, [])

  return loader ? <LoaderComponent /> : <LoginComponent />
}
export default Login
