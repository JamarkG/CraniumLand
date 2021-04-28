import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getCards, createCard } from "../store/deck";


const CardForm = () => {
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState([]);
    const deck = useSelector(state => state.deckStorage.deck)


    const { deckId }  = useParams();

    const onCreate = async (e) => {
        e.preventDefault();
        await dispatch(createCard(deckId, question, answer));
    }

    useEffect( async () => {
        await dispatch(getCards(deckId))
    }, []);
    
    console.log(deckId)
    console.log(deck)

    return (
        <>
            <h2>{`Flashcards for this deck`}</h2>
            {cards.length > 0 &&
            <div>
                {cards.map(({ id, question, answer }) => {
                    return <div>
                        <p key={`q.${id}`}>{question}</p>
                        <p key={`a.${id}`}>{answer}</p>
                        <button className='cardDeleteButton'>X</button>
                    </div>
                })}
            </div>}
            <form onSubmit={onCreate}>
                <div>
                    <input
                    type='text'
                    name='question'
                    onChange={(e) => setQuestion(e.target.value)}
                    value={question}
                    ></input>
                    <input
                    type='text'
                    name='answer'
                    onChange={(e) => setAnswer(e.target.value)}
                    value={answer}
                    ></input>
                </div>
                <button type='submit'> Save Cards </button>
            </form>
        </>
    )
}

export default CardForm;
