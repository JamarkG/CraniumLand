import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { getCards, createCard, deleteCard, grabDeck, deleteDeck } from "../store/deck";
import './CSS/CardForm.css'

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
        <div id='CardFormDiv'>
            <div className='CardFormHeaders'>
                <h2>{currentDeck && `Flashcards for ${currentDeck.name}`}</h2>
                <h3 id='h3Text'><span className='h3Margin'></span>Question<span className='h3Margin2'></span>Answer</h3>
            </div>
            {currentCards &&
            <div className='CardHolderDiv'>
                {currentCards.map(({ id, question, answer }) => {
                    return <div className='CardDiv'>
                        <div className='CardQuestionDiv'>
                            <p className='CardText' key={`q.${id}`}>{question}</p>
                        </div>
                        <div className='CardAnswerDiv'>
                            <p className='CardText' key={`a.${id}`}>{answer}</p>
                        </div>
                        {currentDeck && userId === currentDeck.userid &&<button className='cardDeleteButton'
                        onClick={onDelete}
                        value={id}
                        >x</button>}
                    </div>
                })}
            </div>}
            {currentDeck && currentDeck.userid === userId &&
            <div className='CardHolderDivInput'>
                <div className='CardDiv'>
                    <form className='CardDiv' onSubmit={onCreate}>
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
            </div>}
            <div className='BottomButtonDiv'>
                {currentDeck && userId === currentDeck.userid && <button id='DeleteDeckButton' className='BottomButton' onClick={deckDelete}>Delete This Deck</button>}
                <span className='BottomButtonMargin'></span>
                {currentCards && !!currentCards.length &&
                <div>
                    <button id='StudyDeckButton' className='BottomButton' onClick={studyDeck}>Study This Deck</button>
                </div>
                }
            </div>
        </div>
    )
}

export default CardForm;
