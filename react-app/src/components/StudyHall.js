import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { getCards, grabDeck } from "../store/deck";
import './CSS/StudyHall.css'

const StudyHall = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const deck = useSelector(state => state.deckStorage.deck)
    const cards = useSelector(state => state.deckStorage.cards)

    const [currentCard, setCurrentCard] = useState(0);

    const [cardChars, setCardChars] = useState("");
    const [flipped, setFlipped] = useState(false)
    const [deckEnd, setDeckEnd] = useState('Next Card')

    const { deckId }  = useParams();

    useEffect(async () => {
        await dispatch(getCards(deckId))
        await dispatch(grabDeck(deckId))
    }, []);

    const flipCard = () => {
        if (flipped === false){
            // setCardChars(cards[currentCard].answer)
            setFlipped(true)
        }
        else {
            // setCardChars(cards[currentCard].question)
            setFlipped(false)
        }
    }

    useEffect(() => {

    }, [flipCard])

    const nextCard = () => {
        if (cards[currentCard + 1]){
            setCurrentCard(currentCard + 1)
            setFlipped(false)
            if(!cards[currentCard + 2] || cards.length === 1){
                setDeckEnd('End Session')
            }
            // setCardChars(cards[currentCard + 1].question)
        } else {
            history.push('/decks')
        }
    }

    const restart = () => {
        setFlipped(false)
        setCurrentCard(0)
        setDeckEnd('Next Card')
    }




    return (
        <>
            {deck && (
                <div className='outerDiv'>
                    <h3 className='deckName'>{`Deck: ${deck.name}`}</h3>
                    <h3 className='currentCard'>{`Card ${currentCard +1}/${cards.length}`}</h3>
                    <div className='cardContainer'>
                        <div className='card' >
                                <div className='cardTextContainer' onClick={flipCard}>
                                    <p className='cardText'>{(flipped) ? cards[currentCard].answer : cards[currentCard].question}</p>
                                </div>
                            <button className='nextButton' onClick={nextCard}>{(cards.length > 1 ? deckEnd : 'End Session')}</button>
                            <button className='restartButton' onClick={restart}>Restart</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default StudyHall;
