import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

 const DeckForm = () => {
     const dispatch = useDispatch();
     const [name, setName] = useState('');
     const [tag, setTag] = useState('');

     const onCreate = async (e) => {
         e.preventDefault();
         await dispatch(deckCreate(name, tag));
     }

     tags = tag.query

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
                 <label>Deck Name</label>
                 <select
                     type='text'
                     name='tag'
                     onChange={(e) => setName(e.target.value)}
                     value={name}
                 ></select>
             </div>
         </form>
     )
 }