import React, { useEffect, useState, useContext } from 'react'
import { answersContext } from '../../Contexts/answersContext'

const DropdownChoices = ({choices= [], isMultiple, questionId})=>{
    const {answers, setAnswers} = useContext(answersContext);

    const onSelectChange = (e)=>{
        let temp_array = [...answers].filter(answer=>answer.question_id !== questionId);;
        [...e.currentTarget.options].map(option=>{
            if(option.selected){
                temp_array.push({question_id: questionId, option_id: option.value})
            }
        })
    
        setAnswers(temp_array)
    }

    
    return (
        <select multiple={isMultiple} onChange={onSelectChange}>
            {choices.map((choice, index)=>(
                <option key={index} value={choice.id}>{choice.value}</option>
            ))}
        </select>
    )
}

const ItemChoices = ({choices = [], isMultiple, questionId})=>{

    const {answers, setAnswers} = useContext(answersContext);

    const onSelectChange = (e)=>{
        let temp_array = [...answers];
        let answer = isMultiple
        ? temp_array.find(answer=>(answer.question_id === questionId) && (answer.option_id === e.currentTarget.value))
        : temp_array.find(answer=>answer.question_id === questionId)

        if(answer){
            if(isMultiple){
                temp_array = temp_array.filter(answer=>!(answer.question_id === questionId && answer.option_id === e.currentTarget.value));
            }else{
                temp_array = temp_array.filter(answer=>answer.question_id !== questionId);
                temp_array.push({question_id: questionId, option_id: e.currentTarget.value})
            }
        }else{
            temp_array.push({question_id: questionId, option_id: e.currentTarget.value})
        }
        
        setAnswers(temp_array)
    }

    return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            {choices.map((choice, index)=>(
                <label key={index}>
                    <input type={isMultiple? "checkbox":"radio"} value={choice.id} name="answer" onChange={onSelectChange}/> {choice.value}
                </label>
            ))}
        </div>
    )
}

function SingleChoiceQuestion({index, question}) {

  return (
    <div className='question-component'>
        <div className='question-header'>
            <h4 className='title'>{index+1}. {question.question} </h4>
        </div>
        <div className='description'>
          <p>{question.description}</p>
        </div>

        <div className='question-choices'>
            {
            question.isDropdown 
            ? <DropdownChoices questionId={question.id} choices={question.options} isMultiple={question.isMultiple}/> 
            : <ItemChoices questionId={question.id} choices={question.options} isMultiple={question.isMultiple}/>}
            
        </div>
    </div>
  )
}

export default SingleChoiceQuestion