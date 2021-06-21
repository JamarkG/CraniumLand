import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./CSS/Search.css"

function Search() {
    const [decks, setDecks] = useState([]);
    const { searchTerm } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/decks/");
            const responseData = await response.json();
            setDecks(responseData.decks);
        }
        fetchData();
    }, []);

    const searchResults = decks.map((deck) => {
        if (deck.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return (
                <li key={deck.id}>
                    <NavLink to={`/decks/${deck.id}`}>{deck.name}</NavLink>
                </li>
            );
        }
    });

    return (
        <div className="SearchResults">
            <h1>Search Results: </h1>
            <ul>{searchResults}</ul>
        </div>
    );
}

export default Search;
