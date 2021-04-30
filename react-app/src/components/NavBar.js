import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {login} from "../store/session"
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css';
import logo from './CraniumLandLogo.png';

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('')
  const user = useSelector(state => state.session.user)
  console.log(user)

  const searchGo = async (e) => {
    e.preventDefault();

    history.push(`/search/${searchTerm}`)
  }


  return (
    <nav>
      <div className='TopDivHolder'>
        <div className='TopHalfNav'>
          <div hidden={user} className='NavButton' id='LoginButton'>
            <NavLink to="/login" id='LoginButtonText' exact={true} activeClassName="active">
              Login
            </NavLink>
          </div>
          <div hidden={user} className='NavButton' id='DemoLoginButton'>
            <button id='DemoLoginButtonText' onClick={async (e)=>{await dispatch(login('demo@aa.io', 'password'))}}>
              Demo Log In
            </button>
          </div>
          <div hidden={user} className='NavButton' id='SignUpButton'>
            <NavLink to="/sign-up" id='SignUpButtonText' exact={true} activeClassName="active">
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
        <div className='HomeLinkHolder'>
          <div id='HomeLink'>
            <NavLink to="/" id='aTagLogo' exact={true} activeClassName="active">
              <img border={0} alt="CraniumLand Logo" src={logo} width="55" height="55" />
            </NavLink>
          </div>
        </div>
      </div>
      <form className='searchForm'>
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
