import React from 'react';

function Login() {
    return (
        <div className="login">
          <form  autoComplete="off">
            <h1>Login</h1>
            <label>Username</label>
            <input
              type="text"
              name="username"
            //   value={formData.username}
            //   onChange={handleChange}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
            //   value={formData.password}
            //   onChange={handleChange}
            />
            <input className="login-btn" type="submit" value="Login" />
          </form>
        </div>
      );
}


export default Login;