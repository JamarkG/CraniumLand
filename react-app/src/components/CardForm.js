import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { getCards, createCard, deleteCard, grabDeck, deleteDeck } from "../store/deck";


const CardForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [cards, setCards] = useState([]);
    const currentCards = useSelector(state => state.deckStorage.cards)
    const currentDeck = useSelector(state => state.deckStorage.deck)
    const currentStore = useSelector(state => state.deckStorage)

    

    const { deckId }  = useParams();
    const userId = useSelector(state => state.session.user.id)
    

    const onCreate = async (e) => {
        e.preventDefault();
        await dispatch(createCard(deckId, question, answer));
        setAnswer('')
        setQuestion('')
    }

    const onDelete = async (e) => {
        const cardId = e.target.value
        // console.log(e.target.value)

        await dispatch(deleteCard(cardId, deckId))

    }

    const deckDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteDeck(deckId))
        history.push(`/`)
    }

    const studyDeck = async (e) => {

        e.preventDefault();
        history.push(`/decks/${deckId}/study`)
    }

    useEffect(async () => {
        await dispatch(getCards(deckId))
        await dispatch(grabDeck(deckId))
        setCards(currentCards)
    }, []);

    useEffect(async() => {
        setCards(currentCards)

    }, [onCreate])

    useEffect(async() => {
        setCards(currentCards)

    }, [onDelete])

    

    return (
        <>
            <h2>{`Flashcards for this deck`}</h2>
            {currentCards &&
            <div>
                {currentCards.map(({ id, question, answer }) => {
                    return <div>
                        <p key={`q.${id}`}>{question}</p>
                        <p key={`a.${id}`}>{answer}</p>
                        <button className='cardDeleteButton'
                        onClick={onDelete}
                        value={id}
                        >X</button>
                    </div>
                })}
            </div>}
            {currentDeck && currentDeck.userid === userId &&
            <>
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
                <button onClick={deckDelete}>Delete This Deck</button>
            </>}
            {currentCards && !!currentCards.length &&
            <div>
                <button onClick={studyDeck}>Study This Deck</button>
            </div>
            }
        </>
    )
}

export default CardForm;
