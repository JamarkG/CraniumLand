const SET_DECK = "deckStorage/SET_DECK";
const SET_CARDS = "deckStorage/SET_CARDS";
const ADD_CARD = "deckStorage/ADD_CARD";

const addCard = (card) => ({
    type: ADD_CARD,
    payload: card
})

const setCards = (cards) => ({
    type: SET_CARDS,
    payload: cards
})

const setDeck = (deck) => ({
    type: SET_DECK,
    payload: deck
})

export const createDeck = (name, tag) => async (dispatch)=> {
    const response = await fetch("/api/decks/", {
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
    dispatch(setDeck(createdDeck))
    return createdDeck
}

export const getCards = (id) => async (dispatch)=> {
        const response = await fetch(`/api/decks/${id}/cards`);
        const responseData = await response.json();
        dispatch(setCards(responseData.cards));
}

export const createCard = (deckId, question, answer) => async (dispatch) => {
    const response = await fetch("/api/decks/:id/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            question,
            answer,
            deckId
        })
    });
    const createdCard = await response.json();
    dispatch(addCard(createdCard))
}

const initialState = { user: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DECK:
            return {deck: action.payload };
        case SET_CARDS:
            return {cards: action.payload };
        case ADD_CARD:
            return {cards: [...state.cards, action.payload] }
        default:
            return state;
    }
}
