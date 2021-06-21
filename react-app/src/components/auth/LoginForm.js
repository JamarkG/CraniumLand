import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import '../CSS/LoginForm.css'

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div hidden={props.logInHide} className='TopDivDeckForm' >
      <div className='formDiv'>
        <h3>Log in to CraniumLand</h3>
        <form onSubmit={onLogin}
        className='Form'>
          <div
          className='Form'>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className="InputDiv">
            <label
            htmlFor="email"
            className='Form'>
              Email</label>
            <input
              className='Form'
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='InputDiv'>
            <label
            htmlFor="password"
            className='Form'>
              Password</label>
            <input
              className='Form'
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <button type="submit" className='LoginFormSubmitButton'>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
