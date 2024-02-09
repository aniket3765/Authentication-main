import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    if(isLogin){
     
    }
    else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=      AIzaSyCcI4ik-JGmcJirDfUK3pnibVIgihAH7c4',{
        method:"POST",
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type': 'application/json',
        }
      }).then(res => {
        if(res.ok){
          alert('Account created')
        }
        else{
          res.json().then((data) => {
            alert(data.error.message)
          })
        }
      })
    }
     
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password'id='password' ref={passwordInputRef} required/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create new account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
