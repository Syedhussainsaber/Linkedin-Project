import React, { useEffect, useState } from 'react'
import { RegisterApi, GoogleApi } from '../apis/Authapi'
import '../Sass/loginComponent.scss'
import LinkedInLogo from '../assets/LinkedIn_Logo.png'
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { postUserData,getAllUsers } from '../apis/FirestoreAPI'
import { getUniqueId } from '../apis/UniqueId'

const RegisterComponent = () => {
  const [credentials, setCredentials] = useState({})
  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState([])
  const [userState, setUserState] = useState(false)

useEffect(()=>{
  getAllUsers(setAllUsers)
},[])

  const googleAuthHandle = async () => {
    try {
      const res = await GoogleApi()
      if (res?.user) {
        toast.success('Signed in Successfully')

const fakeUsers=allUsers?.filter((user)=>{
  // console.log(user.email)
if(res?.user?.email.includes(user?.email.toString())){
return res.user.email
}
})
if(fakeUsers.length === 0){
  postUserData({name:res?.user?.displayName,email:res?.user?.email,imageLink:res?.user?.photoURL})
}
          localStorage.setItem('userEmail', res.user.email)
          localStorage.setItem('userName', res.user.name)
}

      // console.log(res)

    } catch (err) {
      toast.error('Email not found')
      console.log(err)
    }
  }


  const handleRegister = async () => {
    try {
     
      if (credentials.email  && credentials.name  && credentials.password ) {
        const res = await RegisterApi(credentials.email, credentials.password)
        const userId=getUniqueId()
          postUserData({name:res?.user?.displayName,email:res?.user?.email,imageLink:res?.user?.photoURL})
          toast.success('Created account successfully')
          localStorage.setItem("userId",userId)
          localStorage.setItem("userName", res.user.name)
          localStorage.setItem('userEmail', res.user.email)
          setCredentials('')
    }
    else{
      alert("Pls fill all the details")
    }}
     catch (err) {
      toast.error('Account already in use')
      console.log(err)
    }
  }

  return (
    <>
      <div className="loginPage">
        <div className="loginComponent">
          <img src={LinkedInLogo} alt="LinkedIn" className="linkedInLogo" />
          <div className="signInComponent">
            <h2 className="signInHeading">Create An Account</h2>
            <div className="inputs">
              {/* {console.log(allUsers)} */}
              <label>Name</label>
            <input
                type="text"
                className="common-input"
                placeholder="Name"
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    name: event.target.value,
                  })
                }
              />
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

              <button className="login-btn" onClick={() => handleRegister()}>
                Agree and Join
              </button>

              <hr className="hr-text" data-content="or"></hr>
              <GoogleButton
                className="googleBtn"
                onClick={() => googleAuthHandle()}
              ></GoogleButton>
              <p>
                Already On LinkedIn?{' '}
                <span className="join-now" onClick={() => navigate('/login')}>
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterComponent
