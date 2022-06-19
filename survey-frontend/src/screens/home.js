import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const SurveyCard = ({survey})=>{

    const navigate = useNavigate();
    const date = new Date(survey.created_at)
    const closed_at = new Date(survey.closed_at)
    const taken_surveys = JSON.parse(localStorage.getItem('taken_surveys')) || []
    const taken = taken_surveys.includes(survey.id.toString())
    return (
        <div className='survey-card'>
            <div className='card-header'>
                <h4><FontAwesomeIcon icon={faCalendarDays}/> {days[date.getDay()]} {date.toISOString().split('T')[0]}</h4>
                <h3>{survey.title}</h3>
            </div>
            <div className='card-content'>
                <button className='btn' onClick={()=>navigate(`takeSurvey/${survey.id}`)} disabled={survey.closed_at || taken}> {taken? "Taken" : "Take survey"}</button>
                {survey.closed_at && <h4>Closed at: {days[closed_at.getDay()]} {closed_at.toISOString().split('T')[0]}</h4>}
            </div>
        </div>
    )
}


function Home() {
    const [surveys, setSurveys] = useState([])
    const taken_surveys = JSON.parse(localStorage.getItem('taken_surveys')) || []

    useEffect(() => {
        const getSurveys = async () => {
            await axios.get('http://127.0.0.1:8000/api/survey')
            .then(response=>{
                setSurveys(response.data.surveys)
            })
        }
        getSurveys();
    }, [])

  return (
    <>
        <h3>Available Surveys</h3>
        <div className='surveys-container'>
            {surveys.filter(survey=>survey.closed_at === null && !taken_surveys.includes(survey.id.toString())).map((survey, index)=>{
                return <SurveyCard key={index} survey={survey}/>
            })}
        </div>

        <h3>Closed Surveys</h3>
        <div className='surveys-container'>
            {surveys.filter(survey=>survey.closed_at !== null && !taken_surveys.includes(survey.id.toString())).map((survey, index)=>{
                return <SurveyCard key={index} survey={survey}/>
            })}
        </div>

        <h3>Taken Surveys</h3>
        <div className='surveys-container'>
            {surveys.filter(survey=>taken_surveys.includes(survey.id.toString())).map((survey, index)=>{
                return <SurveyCard key={index} survey={survey}/>
            })}
        </div>
    </>
  )
}

export default Home