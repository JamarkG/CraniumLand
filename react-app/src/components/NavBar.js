import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {login} from "../store/session"
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const dispatch =useDispatch()
  const user = useSelector(state => state.session.user)
  console.log(user)

  // const deckNameList = [DeckNameList];
  // const searchQuery = ""
  // const result = deckNameList.filter(word => word.toLowerCase().includes(searchQuery.toLowerCase()));


  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li  hidden={user}>
          <button onClick={async (e)=>{await dispatch(login('demo@aa.io', 'password'))}}>
            Demo Log In
          </button>
        </li>
        <li  hidden={user}>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/decks" exact={true} activeClassName="active">
            Decks
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
      <form>
        <input type='text' placeHolder='Search by Deck Name or Tags'></input>
        <button></button>
      </form>
    </nav>
  );
}

export default NavBar;
