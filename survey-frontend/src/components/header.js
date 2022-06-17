import React, {useEffect, useState} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(localStorage.getItem('user_token') || null)

    const login = ()=>{
        navigate('/login')
    }
    const logout = ()=>{
        localStorage.removeItem('user_token')
        setToken(null)
    }

    useEffect(()=>{
    
        if(!token && location.pathname === "/addSurvey"){
            return navigate('/login')
        }
        
    }, [token])

    return (
        <div className='header'>
            <div className='title'>
                <h1>Survey</h1>
            </div>
            <div className='buttons'>
                {token ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
            </div>
        </div>
    )
}

export default Header