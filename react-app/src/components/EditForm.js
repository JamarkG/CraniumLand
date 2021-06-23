import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import {editCard} from '../../src/store/deck'
import './CSS/EditForm.css'
const EditForm = (props) => {
    const dispatch = useDispatch()
    const params = useParams()
    const oldCardData = props.oldCardData
    let hide = props.hide
    let setEditing = props.hook
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')


    const submitEdit = async (e) => {
        e.preventDefault()
        const createdPost = await dispatch(editCard(oldCardData.deckid, oldCardData.id, question, answer))


        setEditing(false)
    }

    const cancelEdit = () => {
        setQuestion('')
        setAnswer('')
        setEditing(false)
    }

    useEffect(() => {

        if(oldCardData?.question){setQuestion(oldCardData.question)}
        if(oldCardData?.answer){setAnswer(oldCardData.answer)}
    }, [props.hide]);

    return (
<div className='EditCardHolderDivInput' hidden={props.hide}>
                <div className='CardDiv'>
                    <form className='CardDiv' onSubmit={submitEdit}>
                        <div className='CardQuestionDiv'>
                            <h3 className='InputHeader'>Edit question:</h3>
                            <input
                            className='InputCardText'
                            type='text'
                            name='question'
                            onChange={(e) => setQuestion(e.target.value)}
                            value={question}
                            ></input>
                        </div>
                        <div className='CardAnswerDiv'>
                        <h3 className='InputHeader'>Edit answer:</h3>
                            <input
                            className='InputCardText'
                            type='text'
                            name='answer'
                            onChange={(e) => setAnswer(e.target.value)}
                            value={answer}
                            ></input>
                        </div>
                        <button className='cardAddCancelButton' onClick={cancelEdit}>x</button>
                        <button className='cardAddButton' type='submit'>✔️</button>
                    </form>
                </div>
            </div>
    )
}

export default EditForm;
