import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const StudyHall = () => {
    const history = useHistory();

    const deckName = useSelector(state => state.deckStorage.deck.name)
    const cards = useSelector(state => state.deckStorage.cards)

    const [currentCard, setCurrentCard] = useState(0);
    let cardText = cards[currentCard].question
    const [cardChars, setCardChars] = useState(cardText);

    const flipCard = () => {
        if (cardChars === cardText){
            setCardChars(cards[currentCard].answer)
        }
        else {
            setCardChars(cards[currentCard].question)
        }
    }

    useEffect(() => {

    }, [flipCard])

    const nextCard = () => {
        if (cards[currentCard + 1]){
            setCurrentCard(currentCard + 1)
            setCardChars(cards[currentCard + 1].question)
        } else {
            history.push('/decks')
        }
    }

    return (
        <>
            <h1>{`Deck: ${deckName}`}</h1>
            <p>{`${currentCard +1}/${cards.length}`}</p>
            <div>
                <p>{cardChars}</p>
            </div>
            <button onClick={flipCard}>Flip Card</button>
            <button onClick={nextCard}>Next Card</button>
        </>
    );
}

export default StudyHall;
