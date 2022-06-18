import React, {useContext} from 'react'
import { questionsContext } from '../Contexts/questionsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'

function TextQuestion({index}) {
  const {questions, setQuestions} = useContext(questionsContext);

  const onDelete = ()=>{
    setQuestions(questions.filter((question, i)=> index !== i));
  }
  return (
    <div className='question-component'>
        <div className='question-header'>
          <h4 className='title'>{index+1}. Text Question: </h4>
          <FontAwesomeIcon className='remove-choice-btn' icon={faX} onClick={onDelete}/>
        </div>
        <input type="text" placeholder='Question'/>
        <input type="text" placeholder='Description'/>
    </div>
  )
}

export default TextQuestion