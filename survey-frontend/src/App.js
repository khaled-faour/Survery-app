import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import {userContext} from './Contexts/userContext';
import Header from './components/header';
import Login from "./screens/login";
import AddSurvey from "./screens/addSurvey";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user_token') || null)


  return (
    <div className="App">
      <userContext.Provider value={{user, setUser}}>
        <Header/>
        <Routes>
            <Route path="/" element={<>HOME</>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/addSurvey" element={<AddSurvey/>} />
        </Routes>
      </userContext.Provider>
    </div>
  );
}



export default App;
