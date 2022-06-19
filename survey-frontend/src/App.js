import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import {userContext} from './Contexts/userContext';
import {questionsContext} from './Contexts/questionsContext';
import Header from './components/header';
import Login from "./screens/login";
import AddSurvey from "./screens/addSurvey";
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])

  
  useEffect(()=>{
    const checkToken = async ()=>{
        await axios.post('http://127.0.0.1:8000/api/check', {}, {headers: {Authorization: 'Bearer ' + localStorage.getItem('user_token')}})
        .then(response=>{
            console.log(response.data)
            if(response.data.valid){
              setUser(localStorage.getItem('user_token'));
            }else{
              localStorage.removeItem('user_token')
            }
            
        })
    }

    checkToken();
  })
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
              <Route path="/mySurveys" element={<>My Surveys</>}/>
        </Routes>
      </userContext.Provider>
    </div>
  );
}



export default App;
