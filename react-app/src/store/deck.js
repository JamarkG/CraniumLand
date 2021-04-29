const SET_DECK = "deckStorage/SET_DECK";
const SET_CARDS = "deckStorage/SET_CARDS";
const ADD_CARD = "deckStorage/ADD_CARD";
const DEL_CARD = "deckStorage/DEL_CARD";
const DEL_DECK = "deckStorage/DEL_DECK";

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

const delCard = (card) => ({
    type: DEL_CARD,
    payload: card
})

const delDeck = (deck) => ({
    type: DEL_DECK,
    payload: deck
})

export const grabDeck = (id) => async (dispatch)=> {
    const response = await fetch(`/api/decks/${id}`);
    const grabbedDeck = await response.json();
    dispatch(setDeck(grabbedDeck))
    return grabbedDeck
}

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
    // dispatch(setDeck(createdDeck))
    return createdDeck
}

export const deleteDeck = (deckId) => async (dispatch) => {
    const response = await fetch(`/api/decks/${deckId}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },

    });
    const deletedDeck = await response.json();
    await dispatch(delDeck(deckId))
}

export const getCards = (id) => async (dispatch)=> {
        const response = await fetch(`/api/decks/${id}`);
        const responseData = await response.json();
        dispatch(setCards(responseData.cards));
}

export const createCard = (deckId, question, answer) => async (dispatch) => {
    const response = await fetch(`/api/decks/${deckId}`, {
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
    await dispatch(addCard(createdCard))
}

export const deleteCard = (cardId, deckId) => async (dispatch) => {
    const response = await fetch(`/api/decks/${deckId}/cards/${cardId}/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },

    });
    const deletedCard = await response.json();
    await dispatch(delCard(cardId))
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DECK:
            return action.payload;
        case DEL_DECK:
            return {deck: {}, cards: []};
        case SET_CARDS:
            return {...state, cards: action.payload };
        case ADD_CARD:
            if(state.cards){
                return {...state, cards: [...state.cards, action.payload] }
            }
            return {cards: [action.payload]}
        case DEL_CARD:
            return {...state, cards: [...state.cards.filter(card => card.id !== Number(action.payload))]}
        default:
            return state;
    }
}
