import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import createDeck from "../store/session"

 const DeckForm = () => {
     const dispatch = useDispatch();
     const [name, setName] = useState('');
     const [tag, setTag] = useState('');
     const [tags, setTags] = useState('');

     const onCreate = async (e) => {
         e.preventDefault();
         await dispatch(createDeck(name, tag));
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
                    >{tags.map(({ id, name }) => <option value={id} >{name}</option>)}</select>
                }
            </div>
         </form>
     )
 }

 export default DeckForm;