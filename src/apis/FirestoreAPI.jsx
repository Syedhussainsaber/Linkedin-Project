import { firestore } from '../firebaseConfig'
import { addDoc, collection, onSnapshot,doc, updateDoc, query, where,setDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const dbRef = collection(firestore, 'posts')
const userRef = collection(firestore,"users")
const likeRef = collection(firestore,"likes")
const commentRef = collection(firestore,"comments")
const connectionRef = collection(firestore,"connections")

export const PostStatus = (postDetails) => {
  addDoc(dbRef, postDetails)
    .then((res) => {
      if (res) {
        toast.success('Post updoaded')
        // console.log('Document Added Successfully')
      } else {
        toast.error('Could not post')
      }
    })
    .catch((err) => {
      toast.error('Could not post')
      console.log(err)
    })
}

export const getPosts = (setAllPosts) => {
  onSnapshot(dbRef, (res) => {
    setAllPosts(
      res.docs.map((docs) => {
        return {
          ...docs.data(),
          id: docs.id,
        }
      }),
    )
  })
}

export const postUserData = async(userData)=>{
await addDoc(userRef,userData)
.then(()=>{
})
.catch((err)=>{
console.log(err)
})
}

export const getCurrentUser =(setCurrentUser)=>{

onSnapshot(userRef,(res)=>{
setCurrentUser(
res.docs.map((docs)=>{
return {
  ...docs.data(),userId:docs.id
}
}).filter((item)=>{
return item.email===localStorage.getItem("userEmail")
})[0]
)
})
}

export const getOtherUsers = (setOtherUsers,id) =>{
  onSnapshot(userRef,(res)=>{
setOtherUsers(res.docs.map((doc)=>{
return {
  ...doc.data(), userId:doc.id
}
}).filter((item)=>{
return item.userId === id
}).map((item)=>{
return item
})
)
  })
}

export const getAllUsers = (setAllUsers)=>{
onSnapshot(userRef,(res)=>{
setAllUsers(res.docs.map((doc)=>{
return {
  ...doc.data(),userId:doc.id
}
}))
})
}
 
export const updateProfileData = (userId, updatedData)=>{
const userDoc = doc(userRef,userId)
updateDoc(userDoc,updatedData)
.then(()=>{
      toast.success('Profile updated Successfully')
})
.catch((err)=>{
console.log(err)
})
}


export const postUpdateData = (id,updatedPostData)=>{
  const postDoc = doc(dbRef,id)
  updateDoc(postDoc,updatedPostData)
  .then(()=>{
toast.success("Post Updated Successfully")
  })
  .catch((err)=>{
console.log(err)
  })
}

export const deletePosts = (id)=>{
  try{
    const postDoc = doc(dbRef,id)
    deleteDoc(postDoc)
    toast.success("Post Deleted Successfully")
  }
  catch(err){
console.log(err)
  }
  }

export  const  getSinglePost = (setAllPosts,id)=>{
const singlePostQuery = query(dbRef,where("userId","==",id))
onSnapshot(singlePostQuery,(res)=>{
setAllPosts(
  res.docs.map((docs)=>{
return {
  ...docs.data(), id: docs.id
}
  })
)
})

}

export const getSingleUser = (setCurrentProfile, email)=>{
const singleUserQuery = query(userRef, where("email","==", email))
onSnapshot(singleUserQuery,(res)=>{
setCurrentProfile(
  res.docs.map((docs)=>{
return {
  ...docs.data(),id:docs.id
}})[0]
)
})
}


export const updatePostLikes= (userId,postId,liked)=>{
  try{
    let likeDocs = doc(likeRef,`${userId}_${postId}`)
   
if(liked){
  deleteDoc(likeDocs)
}
else{
  setDoc(likeDocs,{userId,postId})
}
  }
  catch(err){
console.log(err)
  }
}

export const getLikesByUser=(userId,postId,setLikesCount,setLiked)=>{
  try{
let likesQuery = query(likeRef,where("postId","==",postId))
onSnapshot(likesQuery,(res)=>{
let likes = res.docs.map((doc)=> doc.data())
let likesCount = likes?.length

setLikesCount(likesCount)

const liked = likes.some((like)=>{return like.userId === userId})

setLiked(liked)
})
}
catch(err){
console.log(err)
}
}

export const uploadComments= (commentData)=>{
  addDoc(commentRef,commentData)
  .then((res)=>{
if(res){
  toast.success("Comment Added Successfully")
}
  })
  .catch((err)=>{
console.log(err)
  })
}

export const getComments = (postId,setCommentData)=>{
const singlePostComment = query(commentRef,where("postId","==",postId))
onSnapshot(singlePostComment,(res)=>{
setCommentData(res.docs.map((doc)=>{
  return {
commentValue:{...doc.data()},
id:doc.id
  }
}))
})
}

export const addConnection = (userId, targetId)=> {
  try{
    let connectionDocs = doc(connectionRef,`${userId}_${targetId}`)
  setDoc(connectionDocs,{userId,targetId})
  toast.success("Connection Added Successfully")
  }
  catch(err){
console.log(err)
  }
}

export const getConnections=(userId,targetId,setConnection)=>{
  try{
let connectionQuery = query(connectionRef,where("targetId","==",targetId))
onSnapshot(connectionQuery,(res)=>{
let connections = res.docs.map((doc)=>doc.data())
console.log(connections)
let connectionsCount = connections?.length

// setConnectionCount(connectionsCount)

const connected = connections.some((connection)=>{return connection?.userId === userId})

setConnection(connected)
})
}
catch(err){
console.log(err)
}
}