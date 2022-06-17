import React, {useState} from 'react'

function Header() {

    const [token, setToken] = useState(localStorage.getItem('user_token') || null)


    const logout = ()=>{
        localStorage.removeItem('user_token')
        setToken(null)
    }

  return (
    <div className='header'>
        <div className='title'>
            <h1>Survey</h1>
        </div>
        <div className='buttons'>
            {token && <button onClick={logout}>Logout</button>}
        </div>
    </div>
  )
}

export default Header