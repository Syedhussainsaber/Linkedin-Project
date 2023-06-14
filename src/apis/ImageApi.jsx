import { firestore, storage} from "../firebaseConfig";
import {ref,getDownloadURL,uploadBytesResumable} from "firebase/storage"
import {updateProfileData,postUpdateData} from "./FirestoreAPI"

export const imageUpload=(id,file)=>{
//     const imageRef = ref(storage,`profileImage/${file?.name}`)
//     const metadata = {
//         contentType: 'image/jpg'
//       };
//     const uploadTask = uploadBytesResumable(imageRef,file,metadata)
 
//     uploadTask.on("state_changed",(snapshot)=>{
// const progress = Math.round((snapshot.bytesTransferred /snapshot.totalBytes)*100)
// console.log(progress)
//     }),
//     (err)=>{
//         console.log(err)
//             },
// ()=>{
//     getDownloadURL(uploadTask.snapshot.ref).then((res)=>{
// console.log(res.toString())
// updateProfileData(id,{imageLink:res})
//     })
// }

return new Promise((resolve, reject) => {
  if(file.name){
    const storageRef = ref(storage,`images/${file.name}`)
    // const imageRef = storageRef.child(`images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef,file)
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = Math.round((snapshot.bytesTransferred /snapshot.totalBytes)*100)
console.log(progress)
      },
      (error) => {
        reject(error);
      },
      () => {
getDownloadURL(uploadTask.snapshot.ref).then((res)=>{
  updateProfileData(id,{imageLink:res})

    resolve(res)
}).catch((err)=>{
    console.log(err)
})
      }
    );
  }
  });

}


export const uploadPostImage  = (file,setPostImage, setImageProgress)=>{

  return new Promise((resolve,reject)=>{
  if(file.name){
    const postImgRef = ref(storage,`postImages/${file.name}`)
    const uploadTask = uploadBytesResumable(postImgRef,file)
uploadTask.on("state_changed",(snapshot)=>{
const progress = Math.round(((snapshot.bytesTransferred /snapshot.totalBytes)*100))
console.log(progress)
setImageProgress(progress)
},(err)=>{
reject(err)
},()=>{
getDownloadURL(uploadTask.snapshot.ref).then((res)=>{
  setPostImage(res)
  resolve(res)
}).catch((err)=>{
console.log(err)
})
})

  }})

}