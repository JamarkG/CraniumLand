import React, { useEffect, useState } from "react";
import { useSelector} from 'react-redux';
import { useHistory} from "react-router-dom";
import DeckForm from './DeckForm'
import backDrop from './CraniumLandBackCrop.PNG'
import './CSS/LandingPage.css'

const LandingPage = () => {
    const user = useSelector(state => state.session.user)
    const[hideDeckForm, setHideDeckForm] = useState(true)
    const history = useHistory()

    const newDeckButton = function(){
        if(user){
            console.log(user)
            if(hideDeckForm === true){
            setHideDeckForm(false)
            }
            else {
            setHideDeckForm(true)
            }
        } else {
            window.alert('Please login to create a deck!')
        }
    }

    return (
        <div className="TopLandingDiv">
            <DeckForm props={hideDeckForm}/>
            <div className="TopLandingDiv">
                <img className='backDrop' src={backDrop}></img>
                <h1 className='title'>Rise to <br/> our challenge!</h1>
                <button className="newDeck" onClick={newDeckButton}>New Deck</button>
                <button className='deckButton' id='DeckListButton' onClick={()=> {
                        history.push("/decks")
                        }
                    }>
                    Decks
                    </button>
                <p className='description'>Our decks page will take you to a list of flash card decks! Once logged in, selecting the New Deck button will allow you to
                    create your own deck, or create or delete cards within a deck you own.
                </p>
            </div>

        </div>
    )
}

export default LandingPage
