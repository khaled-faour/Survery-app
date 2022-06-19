import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import {userContext} from './Contexts/userContext';
import {questionsContext} from './Contexts/questionsContext';
import {answersContext} from './Contexts/answersContext';
import Header from './components/header';
import Login from "./screens/login";
import AddSurvey from "./screens/addSurvey";
import TakeSurvey from "./screens/takeSurvey";
import Home from "./screens/home";
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])

  
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
  }, [])
  return (
    <div className="App">
      <userContext.Provider value={{user, setUser}}>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            
              <Route path="/addSurvey" element={
                  <questionsContext.Provider value={{questions, setQuestions}}>
                    <AddSurvey/>
                  </questionsContext.Provider>
              } />
              <Route path="/mySurveys" element={<>My Surveys</>}/>
                <Route path="/takeSurvey/:id" element={
                  <answersContext.Provider value={{answers, setAnswers}}>
                    <TakeSurvey/>
                  </answersContext.Provider>
                }/>
        </Routes>
      </userContext.Provider>
    </div>
  );
}



export default App;
