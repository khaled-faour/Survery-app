import React, {useContext, useEffect, useState} from 'react'
import {questionsContext} from '../Contexts/questionsContext';
import TextQuestion from '../components/textQuestion';
import ChoiceQuestion from '../components/choiceQuestion';

import axios from 'axios'

const QuestionContainer = ({children})=>{
    return (
        <div className='question-container'>
            {children}
        </div>
    )
}




const AddSurvey = () => {
    const {questions, setQuestions} = useContext(questionsContext)
    const [surveyTitle, setSurveyTitle] = useState(null)

    const initialQuestion = {
        type: 'text', 
        question: null, 
        description: null, 
        choices: [], 
        isMultiple: false, 
        isDropdown: false,
    }

    const addQuestion = (type)=>{
        switch(type){
            case "text": 
                setQuestions([...questions, {...initialQuestion}])
                break;
            case "choice":
                setQuestions([...questions, {...initialQuestion, type: 'choice', choices: ["Choice 1", "Choice 2"]}])
                break;
        }
    }
    
    const surveyTitleChange = (e)=>{
        setSurveyTitle(e.target.value)
    }

    const addSurvey = async()=>{
        await axios.post('http://127.0.0.1:8000/api/survey', {surveyTitle, questions }, {headers: {Authorization: 'Bearer ' + localStorage.getItem('user_token')}})
        .then(response=>console.log("API: ", response.data))
        // console.log({surveyTitle: surveyTitle, questions})
    }

  return (
    <div>
        <input type={"text"} value={surveyTitle} placeholder="Survey Title" onChange={surveyTitleChange}/>
        <div className='add-questions-btns'>
            <button className='add-question-btn' onClick={()=>addQuestion('text')}>Text</button>
            <button className='add-question-btn' onClick={()=>addQuestion('choice')}>Choices</button>
        </div>
        {
            questions.length > 0 ? questions.map((question, index)=>{
                switch(question.type){
                    case "text":
                        return <QuestionContainer key={index}><TextQuestion index={index}/></QuestionContainer>
                    case "choice":
                        return <QuestionContainer key={index} ><ChoiceQuestion index={index}/></QuestionContainer>
                }
            })
            : "No Questions Selected"
        }
        {questions.length > 0 && <button className='btn' onClick={addSurvey}>Save</button>}
    </div>
  )
}

export default AddSurvey