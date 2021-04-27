import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';


const CardForm = () => {
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState([]);

    const { deckId }  = useParams();

    const createCard = (question, answer) => async ()=> {
        const response = await fetch("/api/decks/:id/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                tag
            }),
        });
        const createdDeck = await response.json();
    }

    const onCreate = async (e) => {
        e.preventDefault();
        await dispatch(createCard(question, answer));
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/decks/${deckId}/cards`);
            const responseData = await response.json();
            setCards(responseData.cards);
        }
        fetchData();
    }, [dispatch]);


    return (
        <>
            <h2>{`Flashcards for ${deckName}`}</h2>
            <div>
                {cards.map(({ id, question, answer }) => {
                    <div className='cardDiv'>
                        <p key={`q.${id}`}>{question}</p>
                        <p key={`a.${id}`}>{answer}</p>
                        <button className='cardDeleteButton'>X</button>
                    </div>
                })}
            </div>
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
                <button onSubmit={onCreate}> Save Cards </button>
            </form>
        </>
    )
}

export default CardForm;
