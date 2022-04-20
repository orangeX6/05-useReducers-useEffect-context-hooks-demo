import React, { useEffect, useReducer, useContext, useRef } from 'react';

import classes from './Login.module.css';
import AuthContext from '../../context/auth-context';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

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

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const authCtx = useContext(AuthContext);
  const passwordInputRef = useRef();
  const emailInputRef = useRef();
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
    }, 500);

    return () => clearTimeout(timer);
  }, [emailIsValid, passwordIsValid]);

  // ChangeHandler
  const emailChangeHandler = (event) => {
    dispatch({ type: 'EMAIL_INPUT', payload: event.target.value });

    // dispatch({ type: 'FORM_SUBMIT' });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: 'PASSWORD_INPUT', payload: event.target.value });

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
    if (state.formIsValid) {
      authCtx.onLogin(state.enteredEmail, state.enteredPassword);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          ref={emailInputRef}
          isValid={emailIsValid}
          value={state.enteredEmail}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          ref={passwordInputRef}
          isValid={passwordIsValid}
          value={state.enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
