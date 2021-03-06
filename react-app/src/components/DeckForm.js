import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import {createDeck} from "../store/deck"
import './CSS/DeckForm.css'

const DeckForm = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [tag, setTag] = useState(1);
    const [tags, setTags] = useState('');

    // const deckId = useSelector(state => state.deckStorage.deck.id)

    const onCreate = async (e) => {
        e.preventDefault();
        const createdDeck = await dispatch(createDeck(name, tag));
        history.push(`/decks/${createdDeck.id}`)
    }

    useEffect(() => {
        async function fetchData() {
          const response = await fetch("/api/tags/");          // MAKE TAGS
        const responseData = await response.json();
        setTags(responseData.tags);
        }
        fetchData();
    }, []);


    return (
        <div  hidden={props.props} className='TopDivDeckForm' >
            <div className='formDiv'>
                <form className='Form' onSubmit={onCreate}>
                    <div className='FormDiv'>
                        <label className='Form'>Create a New Deck</label>
                        <input
                        type='text'
                        name='name'
                        className='Form'
                        placeholder='Title'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        ></input>
                    </div>
                    <div className='FormDiv'>
                        <label className='Form'>Add Tags</label>
                        {tags.length > 0 &&
                        <select
                            type='text'
                            name='tag'
                            className='Form'
                            id='SelectField'
                            onChange={(e) => setTag(e.target.value)}
                            value={tag}
                            >{tags.map(({ id, name }) => <option key={id} value={id} >{name}</option>)}</select>
                        }
                    </div>
                    <button className='DeckFormSubmitButton' type='submit'> Create Deck </button>
                </form>
            </div>
        </div>
    )
}

export default DeckForm;
