import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getDatabase, ref, push, set,onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {Button} from 'react-bootstrap';

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const googleLogin=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
  
    
    // The signed-in user info.
    const user = result.user;
    setUser({name:result.user.displayName,email:result.user.email })
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  const [msg, setMsg]=useState("");
  const [user, setUser]=useState("");
  const [chats, setChats]=useState([]);
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');
  



const updateHeight=()=>{
  const el=document.getElementById('chat');
  if(el){
    el.scrollTop=el.scrollHeight;
  }
}
useEffect(()=>{
  onChildAdded(chatListRef, (data) => {
    setChats(chats=>[...chats, data.val()])
    setTimeout(()=>{
      updateHeight()
    },100)
  });
  
},[])
  
const sendChat=()=>{

const chatRef = push(chatListRef);
set(chatRef, {
    user,message:msg
  });

  // const c=[...chats];
  // c.push();
  // setChats(c);
  setMsg('');
}
  return (
    <div>
     {
      user.email?null:<div className='start'>
        
        <button class="sign-up"onClick={e=>{googleLogin()}}>Sign Up to continue!</button>
      </div>
     }
    {
     user.email?<div>
      
     <h3>You are Signed in as {user.name}</h3>
        <div  id="chat" className="chat-container">
          {
            chats.map((item,i)=>
            <div key={i} className={`container ${item.user.email===user.email?'me':''}`}>
          <p className="chatbox">
            <strong>{item.user.name}:</strong>
            <span>{item.message}</span>
           </p>
          </div>
            )
          }
        </div>
      </div>:null
    } 
      
      <div className='btm'>
        <input type="text" value={msg} onInput={(e)=>setMsg(e.target.value)} placeholder='Enter Your Message'/>
        <button onClick={()=>sendChat()}>Send</button>
      </div>
    </div>
  );
}

export default App;

