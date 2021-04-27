const SET_DECK = "deckStorage/SET_DECK";


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
}

const initialState = { user: null };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DECK:
            return {deck: action.payload };
        default:
            return state;
    }
}
