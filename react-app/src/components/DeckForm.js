import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from 'react-router-dom';
import {createDeck} from "../store/deck"

const DeckForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [tag, setTag] = useState(1);
    const [tags, setTags] = useState('');

    const { deckId }  = useParams();

    const onCreate = async (e) => {
        e.preventDefault();
        await dispatch(createDeck(name, tag));
        Redirect(`/decks/${deckId}/`)
    }

    useEffect(() => {
        async function fetchData() {
          const response = await fetch("/api/tags/");          // MAKE TAGS
        const responseData = await response.json();
        setTags(responseData.tags);
        }
        console.log(tag)
        console.log(name)
        fetchData();
    }, []);


    return (
        <form onSubmit={onCreate}>
            <div>
                <label>Deck Name</label>
                <input
                type='text'
                name='name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                ></input>
            </div>
            <div>
                <label>Deck Tag</label>
                {tags.length > 0 &&
                <select
                    type='text'
                    name='tag'
                    onChange={(e) => setTag(e.target.value)}
                    value={tag}
                    >{tags.map(({ id, name }) => <option key={id} value={id} >{name}</option>)}</select>
                }
            </div>
            <button onSubmit={onCreate}> Create Deck </button>
        </form>
    )
}

export default DeckForm;
