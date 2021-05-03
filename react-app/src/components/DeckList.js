import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './CSS/DeckList.css'

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [deckComponents, setDeckComponents] = useState()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/decks/");
      const responseData = await response.json();
      setDecks(responseData.decks);
    }
    fetchData();
    if(decks) {
      setDeckComponents(decks.map((deck) => {
        // console.log(deck)
        return (
          <li className='DeckListItem' key={deck.id}>
            <NavLink to={`/decks/${deck.id}`}>{deck.name}</NavLink>
          </li>
        );
      }));
  } else {
    setDeckComponents(<p>No Decks!</p>)
  }

  }, []);



  return (
    <div className='DeckListDiv'>
      <h1>Deck List </h1>
      <p>Browse over 1 million flashcard classes created by top students, professors, publishers, and experts, spanning the world's body of "learnable" knowledge.</p>
      <ul>{deckComponents}</ul>
    </div>
  );
}

export default DeckList;
