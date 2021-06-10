import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../CSS/SignUpForm.css'

const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div hidden={props.signUpHide} className='TopDivDeckForm'>
      <div className='formDiv'>
        <form
        onSubmit={onSignUp}
        className='Form'>
          <div className='Form'>
            <label className='Form'>User Name</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              className='Form'
            ></input>
          </div>
          <div className='Form'>
            <label className='Form'>Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              className='Form'
            ></input>
          </div>
          <div className='Form'>
            <label className='Form'>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              className='Form'
            ></input>
          </div>
          <div className='Form'>
            <label className='Form'>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className='Form'
            ></input>
          </div>
          <button type="submit" className='SignUpFormSubmitButton'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
