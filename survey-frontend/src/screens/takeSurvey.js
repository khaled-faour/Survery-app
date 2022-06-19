import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import QuestionContainer from '../components/questionContainer';
import TextQuestion from '../components/takeSurveyComponents/textQuestion';
import ChoiceQuestion from '../components/takeSurveyComponents/choiceQuestion';
import { answersContext } from '../Contexts/answersContext';
import {useNavigate} from 'react-router-dom';

function TakeSurvey() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [survey, setSurvey] = useState({})
    const {answers, setAnswers} = useContext(answersContext);

    const onSubmit = async()=>{
        console.log(answers)
        await axios.post('http://127.0.0.1:8000/api/answer', {answers}, {headers: {Authorization: 'Bearer ' + localStorage.getItem('user_token')}})
        .then(response=>{
            if(response.status === 200){
                const taken_surveys = JSON.parse(localStorage.getItem('taken_surveys')) || [];
                taken_surveys.push(id);
                localStorage.setItem("taken_surveys", JSON.stringify(taken_surveys))
                setAnswers([]);
                navigate('/')
            }
        })
    }

    useEffect(()=>{
        const getSurvey = async()=>{
            await axios.get('http://127.0.0.1:8000/api/survey/'+id)
            .then(response=>{
                console.log(response)
                setSurvey(response.data)
            })
        }
        getSurvey()
    }, [])
  return (
    <div>
        <h2>{survey.title}</h2>
        {
            survey?.questions?.length > 0 ?  survey.questions.map((question, index)=>{
                switch(question.type){
                    case "text":
                        return <QuestionContainer key={index}><TextQuestion index={index} question = {question}/></QuestionContainer>
                    case "choice":
                        return <QuestionContainer key={index} ><ChoiceQuestion index={index} question = {question}/></QuestionContainer>
                }
            })
            : "Survey Not Available"
        }
        {survey?.questions?.length > 0 && <button className='btn' onClick={onSubmit}>submit</button>}
    </div>
  )
}

export default TakeSurvey