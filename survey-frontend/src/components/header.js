import React, {useEffect, useState, useContext} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {userContext} from '../Contexts/userContext'

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const {user, setUser} = useContext(userContext);

    const login = ()=>{
        navigate('/login')
    }
    const logout = ()=>{
        localStorage.removeItem('user_token')
        setUser(null)
    }

    useEffect(()=>{
        console.log(user)
        if(!user && location.pathname === "/addSurvey"){
            return navigate('/login', {state: { from: location },  replace:true})
        }
        
    }, [user])

    return (
        <div className='header'>
            <div className='title'>
                <h1>Survey</h1>
            </div>
            <div className='buttons'>
                {user ? <button onClick={logout}>Logout</button> : <button onClick={login}>Login</button>}
            </div>
        </div>
    )
}

export default Header