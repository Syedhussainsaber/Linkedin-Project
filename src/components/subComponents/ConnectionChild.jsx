import React, { useEffect, useState } from 'react'
import "../../Sass/subComponentStyles/connectionComponent.scss"
import "../../Sass/subComponentStyles/postComponent.scss"
import { ImUser } from 'react-icons/im'
import { addConnection, getConnections} from '../../apis/FirestoreAPI'



const ConnectionChild = ({user,currentUser}) => {

const [connection ,setConnection] = useState(false)
// const [connectionCount ,setConnectionCount] = useState(0)
useEffect(()=>{
getConnections(currentUser?.userId, user?.userId, setConnection)
}
,[currentUser?.userId,user?.userId])

const handleConnection = ()=>{
addConnection(currentUser?.userId,user?.userId)
}

  return (
  connection ? <></>
:<>
<div className="connectionCard">
{/* {console.log(connection)} */}
{/* {console.log(connectionCount)} */}
    {user?.imageLink? <img src={user.imageLink} alt="profile-img" className='connectionProfile' />: <ImUser size={100} className='connectionProfile' color='gray'/>}
    <p className='userName'>{user?.name}</p>
    <p className='userHeadline'>{user?.headline}</p>
    <button className='connectBtn' onClick={handleConnection}>connect</button>
</div>
</>
  )
}

export default ConnectionChild