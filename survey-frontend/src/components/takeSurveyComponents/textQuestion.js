import React, { useContext, useEffect } from 'react'
import { answersContext } from '../../Contexts/answersContext'


function TextQuestion({index, question}) {
  const {answers, setAnswers} = useContext(answersContext);

  const onChange = (e)=>{
    const temp_array = [...answers].filter(answer=>answer.question_id !== question.id);
    temp_array.push({question_id: question.id, text_answer: e.target.value});
    setAnswers(temp_array)
  }
  return (
    <div className='question-component'>
        <div className='question-header'>
          <h4 className='title'>{index+1}. {question.question} </h4>
        </div>
        <div className='description'>
          <p>{question.description}</p>
        </div>
        <input type="text" name="answer" placeholder='Answer' onChange={onChange}/>
    </div>
  )
}

export default TextQuestion