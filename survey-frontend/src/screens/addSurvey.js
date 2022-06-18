import React, {useContext, useState} from 'react'
import {questionsContext} from '../Contexts/questionsContext';
import TextQuestion from '../components/textQuestion'
import ChoiceQuestion from '../components/choiceQuestion'

const QuestionContainer = ({children})=>{
    return (
        <div className='question-container'>
            {children}
        </div>
    )
}

const AddSurvey = () => {
    const {questions, setQuestions} = useContext(questionsContext)

    const addQuestion = (type)=>{
        switch(type){
            case "text": 
                setQuestions([...questions, {type: 'text', question: null, description: null}])
                break;
            case "choice":
                setQuestions([...questions, {type: 'choice', question: null, description: null, choices: ["Choice 1", "Choice 2"], isMultiple: false, isDropdown: false}])
                break;
        }
    }

  return (
    <div>
        <button onClick={()=>addQuestion('text')}>Add Text Question</button>
        <button onClick={()=>addQuestion('choice')}>Add Choices Question</button>
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
    </div>
  )
}

export default AddSurvey