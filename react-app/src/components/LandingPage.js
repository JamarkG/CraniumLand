import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import { useHistory} from "react-router-dom";
import DeckForm from './DeckForm'
import backDrop from './CraniumLandBackCrop.PNG'
import './CSS/LandingPage.css'

const LandingPage = () => {

    const[hideDeckForm, setHideDeckForm] = useState(true)
    const history = useHistory()

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
                    <div onClick={()=> {
                        history.push("/decks")
                    }}>
                    Decks
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
