import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../Contexts/userContext';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [credentials, setCredentials] = useState({email: null, password: null})
    const [disabled, setDisabled] = useState(false);
    const {user, setUser} = useContext(userContext)
    
    const change = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    
    const submitLogin = async()=>{
        setDisabled(true);
        await axios.post('http://127.0.0.1:8000/api/login', credentials )
        .then(response=>{
            console.log(response)
            if(response.status == 200){
                const token = response.data.authorisation.token;
                setUser(token)
                localStorage.setItem('user_token', token)
            }
        })
        .then(()=>{
            navigate(location.state?.from?.pathname || "/")
        })
    }

    return (
        <div className="center">
            <div className="header">
                Login
            </div>
            <div className='form'>
                <input type="text" placeholder="Email" name="email" onChange={change} disabled={disabled}/>
                <input id="pswrd" type="password" placeholder="Password" name="password" onChange={change} disabled={disabled}/>
                <input className='btn' type="submit" value="Sign in" onClick={submitLogin} disabled={disabled}/>
            </div>
        </div>
    )
}

export default Login;