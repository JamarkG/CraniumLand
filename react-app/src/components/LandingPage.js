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
        <div>
            <DeckForm props={hideDeckForm}/>
            <div>
                <img className='backDrop' src={backDrop}></img>
                <button className="newDeck"
                onClick={newDeckButton}
                >New Deck</button>
                <div className='deckButton' id='DeckListButton' onClick={()=> {
                        history.push("/decks")
                        }
                    }>
                    Decks
                    </div>
            </div>
        </div>
    )
}

export default LandingPage
