import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import {login} from "../store/session"
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";
import LogoutButton from './auth/LogoutButton';
import './CSS/NavBar.css';
import logo from './CraniumLandLogo.png';

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('')
  const[hideLoginForm, setHideLoginForm] = useState(true)
  const[hideSignUpForm, setHideSignUpForm] = useState(true)
  const user = useSelector(state => state.session.user)

  const searchGo = async (e) => {
    e.preventDefault();

    history.push(`/search/${searchTerm}`)
  }


  return (
    <nav>
      <div className='TopDivHolder'>
        <div className='TopHalfNav'>
          {!user &&
          <>
            <div className='NavButton' id='LoginButton'>
              <button id='LoginButtonText' onClick={(e)=>{
                console.log(hideLoginForm)
                setHideSignUpForm(true)
                if(hideLoginForm === true){
                  setHideLoginForm(false)
                }
                else {
                  setHideLoginForm(true)
              }}}>
                Login
              </button>
            </div>
            <div className='NavButton' id='DemoLoginButton'>
              <button id='DemoLoginButtonText' onClick={async (e)=>{await dispatch(login('demo@aa.io', 'password'))}}>
                Demo Log In
              </button>
            </div>
            <div className='NavButton' id='SignUpButton'>
              <button id='SignUpButtonText' onClick={(e)=>{
                setHideLoginForm(true)
                  if(hideSignUpForm === true){
                    setHideSignUpForm(false)
                  }
                  else {
                    setHideSignUpForm(true)
                }}}>
                Sign Up
              </button>
            </div>
          </>}
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
      <LoginForm logInHide={hideLoginForm} signUpHide={hideSignUpForm} />
      <SignUpForm signUpHide={hideSignUpForm} logInHide={hideLoginForm}/>
    </nav>
  );
}

export default NavBar;
