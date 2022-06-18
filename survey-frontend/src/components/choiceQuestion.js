import React, {useContext, useEffect, useState} from 'react'
import {questionsContext} from '../Contexts/questionsContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faX } from '@fortawesome/free-solid-svg-icons'

function SingleChoiceQuestion({index}) {
    const {questions, setQuestions} = useContext(questionsContext)


    const removeChoice = (i)=>{
        let temp_questions = [...questions];
        temp_questions[index].choices = temp_questions[index].choices.filter((choice, index)=>index!==i);
        setQuestions(temp_questions);
    }

    const addChoice = ()=>{
        // setChoiceList([...choiceList, "New choice"])
        let temp_questions = [...questions];
        temp_questions[index].choices.push("New choice");
        setQuestions(temp_questions);
    }

    const onDelete = ()=>{
        setQuestions(questions.filter((question, i)=> index !== i));
    }

    const changeType = (e)=>{
        let temp_questions = [...questions];
        temp_questions[index][e.target.name] = e.currentTarget.checked;
        setQuestions(temp_questions);
    }

    useEffect(()=>{
        console.log("All: ", questions)
    },[questions])

  return (
    <div className='question-component'>
        <div className='question-header'>
            <h4 className='title'>{index+1}. Choice Question: </h4>
            <FontAwesomeIcon className='remove-choice-btn' icon={faX} onClick={onDelete}/>
        </div>
        <input type="text" placeholder='Question'/>
        <input type="text" placeholder='Description'/>
        <div className='choice-type'>

            <label><input type="checkbox" name="isMultiple" checked={questions[index].isMultiple} onChange={changeType}/> Multiple</label>
            <label><input type="checkbox" name="isDropdown" checked={questions[index].isDropDown} onChange={changeType}/> Dropdown</label>
        </div>
        <div className='question-choices'>
            {questions[index].choices.map((choice, index)=>(
                <div key={index} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <input type="text" className='choice-option' value={choice}/>
                    <FontAwesomeIcon onClick={()=>removeChoice(index)} className='remove-choice-btn' icon={faTrash} />
                </div>
            ))}
            <button className='btn add-choice-btn' onClick={addChoice}>Add choice</button>
        </div>
    </div>
  )
}

export default SingleChoiceQuestion