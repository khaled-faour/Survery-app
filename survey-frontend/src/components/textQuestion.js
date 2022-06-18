import React, {useContext} from 'react'
import { questionsContext } from '../Contexts/questionsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'

function TextQuestion({index}) {
  const {questions, setQuestions} = useContext(questionsContext);

  const onDelete = ()=>{
    setQuestions(questions.filter((question, i)=> index !== i));
  }

  const onChange = (e)=>{
    let temp_questions = [...questions];
    temp_questions[index][e.target.name] = e.target.value
    setQuestions(temp_questions)
  }
  return (
    <div className='question-component'>
        <div className='question-header'>
          <h4 className='title'>{index+1}. Text Question: </h4>
          <FontAwesomeIcon className='remove-choice-btn' icon={faX} onClick={onDelete}/>
        </div>
        <input type="text" name="question" placeholder='Question' onChange={onChange}/>
        <input type="text" name="description" placeholder='Description' onChange={onChange}/>
    </div>
  )
}

export default TextQuestion