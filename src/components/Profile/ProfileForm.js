import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/AuthContext';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = event => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCcI4ik-JGmcJirDfUK3pnibVIgihAH7c4',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        passord:enteredNewPassword,
        returnSecureToken:false
      }),
      headers:{
        'Content-Type' : 'application/json'
      }
    }).then(res=> {
      if(res.ok){
        res.json().then(data=>{console.log(data)})
      }
      else{
        res.json().then(data=> console.log(data))
      }
    })
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
