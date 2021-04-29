import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { getCards, grabDeck } from "../store/deck";

const StudyHall = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const deck = useSelector(state => state.deckStorage.deck)
    const cards = useSelector(state => state.deckStorage.cards)

    const [currentCard, setCurrentCard] = useState(0);
    
    const [cardChars, setCardChars] = useState("");
    const [flipped, setFlipped] = useState(false)

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
            // setCardChars(cards[currentCard + 1].question)
        } else {
            history.push('/decks')
        }
    }

    


    return (
        <>
            {deck && (
                <>
                    <h1>{`Deck: ${deck.name}`}</h1>
                    <p>{`${currentCard +1}/${cards.length}`}</p>
                    <div>
                        <p>{(flipped) ? cards[currentCard].question : cards[currentCard].answer}</p>
                    </div>
                    <button onClick={flipCard}>Flip Card</button>
                    <button onClick={nextCard}>Next Card</button>
                </>
            )}
        </>
    );
}

export default StudyHall;
