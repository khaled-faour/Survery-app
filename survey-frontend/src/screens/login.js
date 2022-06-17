import React from 'react'


const Login = () => {
  return (
    <div className="center">
         <div className="header">
            Login
         </div>
         <div className='form'>
            <input type="text" placeholder="Email or Username"/>
            <input id="pswrd" type="password" placeholder="Password"/>
            <input className='btn' type="submit" value="Sign in"/>
         </div>
    </div>
  )
}

export default Login;