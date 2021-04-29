import React, { useEffect, useState, useSelector } from "react";
import { NavLink } from "react-router-dom";

function StudyHall() {

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch("/api/decks/");
//       const responseData = await response.json();
//       setDecks(responseData.decks);
//     }
//     fetchData();
//   }, []);

    const deckName = useSelector(state => state.deckStorage.deck.name)
    const cards = useSelector(state => state.deckStorage.cards)


  return (
    <>
        <h1>{`Deck: ${deckName}`}</h1>
        <div>
            <div>
                <p>{cards[0].question}</p>
                <p>{cards[0].answer}</p>
            </div>
        </div>
    </>
  );
}

export default StudyHall;
