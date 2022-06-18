import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import {userContext} from './Contexts/userContext';
import {questionsContext} from './Contexts/questionsContext';
import Header from './components/header';
import Login from "./screens/login";
import AddSurvey from "./screens/addSurvey";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem('user_token') || null)
  const [questions, setQuestions] = useState([])

  return (
    <div className="App">
      <userContext.Provider value={{user, setUser}}>
        <Header/>
        <Routes>
            <Route path="/" element={<>HOME</>} />
            <Route path="/login" element={<Login/>} />
            
              <Route path="/addSurvey" element={
                  <questionsContext.Provider value={{questions, setQuestions}}>
                    <AddSurvey/>
                  </questionsContext.Provider>
              } />
        </Routes>
      </userContext.Provider>
    </div>
  );
}



export default App;
