import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

function SignUp({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("")

  const history = useHistory();


  async function handleSubmit(e){
    e.preventDefault();

    const signupFormData = {
      username,
      password,
      avatar,
      email
    }

    const response = await fetch(`${process.env.REACT_APP_RAILS_URL}/signup`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"username": signupFormData.username, "password": signupFormData.password, "avatar": signupFormData.avatar, "email": signupFormData.email}),
    })
    const jsonify = await response.json()
    setCurrentUser(jsonify);
    history.push('/');
}    



  return (
    <div>

    <form  autoComplete="off" className="signup" onSubmit={handleSubmit}>

      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

    <br></br>
      <input
        type="text"
        name="avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar"
      />
 <br></br>
       <input
         type="text"
         name="email"
         autoComplete="current-password"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="Email"
       />
 <br></br>
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

<br></br>
      

      <input className="signup-btn" type="submit" value="SIGNUP" />
      </form>
    </div>
  );
}

export default SignUp;