import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';

const EditForm = (props) => {
    const dispatch = useDispatch()
    const params = useParams()
    const oldCardData = props
    const [question, setQuestion] = useState('')
    if(oldCardData.question){setQuestion(oldCardData.question)}
    const [answer, setAnswer] = useState('')
    if(oldCardData.answer){setAnswer(oldCardData.answer)}
    const submitEdit = async (e) => {
        e.preventDefault()
        // dispatch thing to edit
    }

    return (
<div className='CardHolderDivInput'>
                <div className='CardDiv'>
                    <form className='CardDiv' onSubmit={submitEdit}>
                        <div className='CardQuestionDiv'>
                            <h3 className='InputHeader'>Add new question:</h3>
                            <input
                            className='InputCardText'
                            type='text'
                            name='question'
                            onChange={(e) => setQuestion(e.target.value)}
                            value={question}
                            ></input>
                        </div>
                        <div className='CardAnswerDiv'>
                        <h3 className='InputHeader'>Add new answer:</h3>
                            <input
                            className='InputCardText'
                            type='text'
                            name='answer'
                            onChange={(e) => setAnswer(e.target.value)}
                            value={answer}
                            ></input>
                        </div>
                        <button className='cardAddButton' type='submit'>+</button>
                    </form>
                </div>
            </div>
    )
}

export default EditForm;
