import React, { useState } from 'react'
import { LoginApi, GoogleApi } from '../apis/Authapi'
import '../Sass/loginComponent.scss'
import LinkedInLogo from '../assets/LinkedIn_Logo.png'
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {
  const [credentials, setCredentials] = useState({})
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      const res = await LoginApi(credentials.email, credentials.password)
      if (res) {
        toast.success('Signed in Successfully')
        localStorage.setItem('userEmail', res.user.email)
        setCredentials('')
      } else {
        toast.error('Email not found')
      }
      console.log(res)
    } catch (err) {
      toast.error('Email not found')
      console.log(err)
    }
  }

  const googleAuthHandle = async () => {
    try {
      const res = await GoogleApi()
      if (res.user) {
        toast.success('Signed in Successfully')
        localStorage.setItem('userEmail', res.user.email)
      }
      console.log(res)
    } catch (err) {
      toast.error('Email not found')
      console.log(err)
    }
  }

  // const handleRegister = async () => {
  //   try {
  //     const res = await RegisterApi(credentials.email, credentials.password)
  //     console.log(res)
  //   } catch (err) {
  //     return err
  //   }
  // }

  return (
    <>
      <div className="loginPage">
        <div className="loginComponent">
          <img src={LinkedInLogo} alt="LinkedIn" className="linkedInLogo" />
          <div className="signInComponent">
            <h2 className="signInHeading">Sign in</h2>
            <div className="inputs">
              <label>Email</label>
              <input
                type="email"
                className="common-input"
                placeholder="Email"
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    email: event.target.value,
                  })
                }
              />
              <label>Password</label>
              <input
                type="password"
                className="common-input"
                placeholder="Password"
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  })
                }
              />

              <button className="login-btn" onClick={() => handleLogin()}>
                Sign in
              </button>

              <hr className="hr-text" data-content="or"></hr>
              <GoogleButton
                className="googleBtn"
                onClick={() => googleAuthHandle()}
              ></GoogleButton>
              <p>
                New to LinkedIn?{' '}
                <span
                  className="join-now"
                  onClick={() => navigate('/register')}
                >
                  Join Now
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginComponent
