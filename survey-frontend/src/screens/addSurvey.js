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

    const addSurvey = ()=>{
        console.log("posting: ", questions)
    }

  return (
    <div>
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