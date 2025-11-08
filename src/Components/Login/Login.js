import React, { useState } from 'react';
import { useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom';

export default function Login() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase} = useContext(FirebaseContext)

  const history =useHistory()

  const handleLogin = async (e) =>{

    const auth=getAuth(firebase)
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, email, password);
        history.push("/")
  }catch(error){
        alert(error.message)
  }}

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}



