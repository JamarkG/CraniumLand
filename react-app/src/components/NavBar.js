import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {login} from "../store/session"
import Modal from "react-modal"
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('')
  const user = useSelector(state => state.session.user)
  console.log(searchTerm)

  const searchGo = async (e) => {
    e.preventDefault();

    history.push(`/search/${searchTerm}`)
  }


  return (
    <nav>
      <div className='TopHalfNav'>
        <div className='NavButton' id='HomeLink'>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div hidden={user} className='NavButton' id='LoginButton'>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </div>
        <div hidden={user} className='NavButton' id='DemoLoginButton'>
          <button onClick={async (e)=>{await dispatch(login('demo@aa.io', 'password'))}}>
            Demo Log In
          </button>
        </div>
        <div hidden={user} className='NavButton' id='SignUpButton'>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </div>
        <div className='NavButton' id='DeckListButton'>
          <NavLink to="/decks" exact={true} activeClassName="active">
            Decks
          </NavLink>
        </div>
        <div hidden={!user}>
          <LogoutButton />
        </div>
      </div>
      <form>
        <input
        id='searchBar'
        type='text'
        placeholder='Search by Deck Name or Tags'
        onChange={(e) => setSearchTerm(e.target.value)}></input>
        <button id='searchButton' onClick={searchGo}>Search</button>
      </form>
    </nav>
  );
}

export default NavBar;
