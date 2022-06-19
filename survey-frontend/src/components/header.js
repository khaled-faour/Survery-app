import React, {useEffect, useState, useContext} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {userContext} from '../Contexts/userContext'

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const {user, setUser} = useContext(userContext);

    const logout = ()=>{
        localStorage.removeItem('user_token')
        setUser(null)
    }

    useEffect(()=>{
        console.log(location.pathname)
        if(!user && (location.pathname !== "/" && location.pathname !== "/login")){
            return navigate('/login', {state: { from: location },  replace:true})
        }
    }, [])

    return (
        <div className='header'>
            <div className='title'>
                <h1>Survey</h1>
            </div>
            <div className='buttons'>
                <button onClick={()=> navigate('/')}>Home</button>
                {user ? (
                    <>
                        <button onClick={()=> navigate('/addSurvey')}>Add Survey</button>
                        <button onClick={()=> navigate('/mySurveys')}>My Surveys</button>
                        <button onClick={logout}>Logout</button>
                    </>
                ): <button onClick={()=>navigate('/login')}>Login</button>}
            </div>
        </div>
    )
}

export default Header