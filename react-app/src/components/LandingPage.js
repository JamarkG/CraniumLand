import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import { useHistory} from "react-router-dom";
import DeckForm from './DeckForm'
import backDrop from './CraniumLandBackCrop.PNG'
import './CSS/LandingPage.css'

const LandingPage = () => {

    const[hideDeckForm, setHideDeckForm] = useState(true)


    return (
        <div>
            <DeckForm props={hideDeckForm}/>
            <div>
                <img className='backDrop' src={backDrop}></img>
                <button className="newDeck"
                onClick={(e)=>{
                    if(hideDeckForm === true){
                        setHideDeckForm(false)
                    }
                    else {
                        setHideDeckForm(true)
                }}}
                >New Deck</button>
                <div className='deckButton' id='DeckListButton'>
                    <a href="/decks">
                    Decks
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
