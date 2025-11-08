import React from 'react';
import { useState } from 'react'
import Logo from '../../olx-logo.png';
import { useContext } from 'react';
import { FirebaseContext } from'../../store/Context';
import './Signup.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";


export default function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const history = useHistory();


  const handleSubmit = async (e) => {
  e.preventDefault();
  const auth = getAuth(firebase);
  const db = getFirestore(firebase);

  try {
    // Create the user
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name in the Auth profile
    await updateProfile(result.user, { displayName: username });

    // Add extra data to Firestore (users collection)
    await setDoc(doc(db, "users", result.user.uid), {
      username: username,
      email: email,
      phone: phone,
      createdAt: new Date(),
    });

    console.log("Signup successful!");
    history.push("/login");
  } catch (error) {
    console.error("Signup error:", error);
  }
};




  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
         
          <label htmlFor="fname">Username</label>
          <br />
          <input

            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}