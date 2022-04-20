import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// const loginReducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return { value: action.val, isValid: action.val.includes('@') };
//   }
//   // if (action.type === 'INPUT_BLUR') {
//   //   return { value: state.value, isValid: state.value.includes('@') };
//   // }
//   return { value: '', isValid: false };
// };

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL_INPUT':
      // console.log(action.payload, state);
      return {
        ...state,
        enteredEmail: action.payload,
        emailIsValid: action.payload.includes('@'),
      };
    case 'PASSWORD_INPUT':
      // console.log(action.payload, state);
      return {
        ...state,
        enteredPassword: action.payload,
        passwordIsValid: action.payload.trim().length > 6,
      };
    case 'FORM_SUBMIT':
      return {
        ...state,
        formIsValid: state.emailIsValid && state.passwordIsValid,
      };
    case 'INPUT_BLUR':
      return { ...state };
    default:
      return { ...initialState, emailIsValid: false, passwordIsValid: false };
  }
};

const initialState = {
  enteredEmail: '',
  emailIsValid: null,
  enteredPassword: '',
  passwordIsValid: null,
  formIsValid: null,
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  // const [state, dispatch] = useReducer(loginReducer, initialState);
  const [state, dispatch] = useReducer(loginReducer, initialState);

  // console.log(state);
  // useEffect(() => {
  //   console.log('I ll run everytime ');
  // });

  const { emailIsValid, passwordIsValid } = state;

  //Validate form and enable button
  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log('Validity run', state);
      dispatch({ type: 'FORM_SUBMIT' });
    }, 1000);

    return () => clearTimeout(timer);
  }, [emailIsValid, passwordIsValid]);

  // ChangeHandler
  const emailChangeHandler = (event) => {
    dispatch({ type: 'EMAIL_INPUT', payload: event.target.value });

    // setFormIsValid(state.emailIsValid && state.passwordIsValid);
    // dispatch({ type: 'FORM_SUBMIT' });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: 'PASSWORD_INPUT', payload: event.target.value });
    // setFormIsValid(state.isValid && event.target.value.trim().length > 6);
    // dispatch({ type: 'FORM_SUBMIT' });
  };

  // Validation
  const validateEmailHandler = () => {
    dispatch({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatch({ type: 'INPUT_BLUR' });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.enteredEmail, state.enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!state.formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
