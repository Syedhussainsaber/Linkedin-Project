import React, { useState,useEffect } from 'react'
import {BiLike} from "react-icons/bi"
import {AiTwotoneLike} from "react-icons/ai"
import { updatePostLikes,uploadComments,getComments } from '../../apis/FirestoreAPI'
import "../../Sass/subComponentStyles/likeButton.scss"
import { getLikesByUser } from '../../apis/FirestoreAPI'
import {FaRegCommentDots} from "react-icons/fa"
import { GetCurrentTimeStamp } from '../../apis/GetCurrentTimeStamp'


const LikeButton = ({userId,postId,currentUser}) => {

    const [likesCount, setLikesCount] = useState(0)
    const [liked,setLiked] = useState(false)
    const [commentState, setCommentState] = useState(false)
    const [commentValue, setCommentValue] = useState()
    const [commentData, setCommentData] = useState([])


useEffect(()=>{
getLikesByUser(userId,postId,setLikesCount,setLiked)
getComments(postId,setCommentData)
},[userId,postId])

const handlePostLikes= ()=>{
    updatePostLikes(userId,postId,liked)
    setChangeLikeBtn(!changeLikeBtn)
}

const handleComment = (event)=>{
setCommentValue(event.target.value)
}

const handleUploadComment = async()=>{
  const commentDetails = {
    commentData: commentValue,
    timeStamp: GetCurrentTimeStamp("LLL"),
    postId:postId,
    userName: currentUser.name,
    userEmail: currentUser.email
  }
await uploadComments(commentDetails)
setCommentValue("")
setCommentState(!commentState)
}

  return (
  <>
    <div className="container">
    <div className='likeContainer'> 
{liked ? <AiTwotoneLike size={25} className='like-icon' onClick={handlePostLikes } color='#0072b1' /> : <BiLike size={25} className='like-icon' onClick={handlePostLikes }/>}
<span className='like-text'>{liked ? "Liked":'Like'}</span> 
<span>{likesCount}</span>
</div>
<div className="comment-icon" onClick={()=> setCommentState(!commentState)}>
<FaRegCommentDots size={25}/>
<span>Comment</span>
</div>
    </div>
   {commentState? <div className='comment-container'>
    <hr />
    <div className="comment-box">
    <input type="text" placeholder='comment' className='comment-input' onChange={handleComment}/> 
     </div> 
     <button className='comment-btn' onClick={handleUploadComment} disabled={commentValue?false:true}>Comment</button>

     <div className='comments-container'>
      {commentData.map((comment)=>{
return(
  <div className="commentSection">
  <div className="comments">
    <div className="topSection">
    <p className='commentUser'>{comment.commentValue.userName}</p>
    <p className='commentTime'>{comment.commentValue.timeStamp}</p>
  </div>
<p className='commentData'>{comment.commentValue.commentData}</p>
</div>
  </div>
)
      })}
     </div>
      </div>:""} 
  
    </>
  )
}

export default LikeButton