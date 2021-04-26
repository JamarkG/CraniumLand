import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {login} from "../store/session"
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const dispatch =useDispatch()
  const user = useSelector(state => state.session.user)
  console.log(user)

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
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
