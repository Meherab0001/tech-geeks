import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import {  createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../Firebase/firebase.init";
import toast from "react-hot-toast";
const provider = new GoogleAuthProvider();

const Signup = () => {
  const navigate = useNavigate();
  const [email,setEmail]=useState({value:'',error:''})
  const [password,setPassword]=useState({value:'',error:''})
  const [confirmPassword,setConfirmPassword]=useState({value:'',error:''})
  console.log(email)
 
  

  const googleAuth=()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user)
      navigate("/")
        }).catch((error) => {
   
      const errorMessage = error.message;
      console.log(errorMessage)
  

    });
  }


  const handleEmail=(emailInput)=>{
    if(/^\S+@\S+\.\S+$/.test(emailInput)){

      setEmail({value:emailInput,error:''})
    }
    else{
      setEmail({value:'',error:'Invalid email'})
    }
  }

  const handlePassword=(passwordInput)=>{
    if(passwordInput.length <7){

      setPassword({value:'',error:'Password too short'})
    }else{
      setPassword({value:passwordInput,error:''})
    }
  }
  const handleConfirmPassword=(confirmPasswordInput)=>{
    if(confirmPasswordInput === password.value){
      setConfirmPassword({value:confirmPasswordInput,error:''})
    }else{
    setConfirmPassword({value:'',error:"password mismatch"})
  
    }
  }

const handleSignUp=(event)=>{
  event.preventDefault()

if(email.value === ''){
  setEmail({value:'',error:'email is required'})
}
if(password.value === ''){
  setPassword({value:'',error:'password is required'})
}

  
  const auth = getAuth();
  if(email.value && password.value && confirmPassword.value ===password.value){
createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   navigate('/')
   toast.success('Create success')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
toast.error(errorMessage)

    
    // ..
  });
}
}


  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input onBlur={(event) =>handleEmail(event.target.value)} type='email' name='email' id='email' />
            </div>
            {
              email?.error && <p className="error">{email.error}</p>
            }
          </div>
         
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input onBlur={(event)=>handlePassword(event.target.value)} type='password' name='password' id='password' />
            </div>
            {
              password?.error && <p className="error">{password.error}</p>
            }
          </div>
          <div className='input-field'>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <div className='input-wrapper'>
              <input
                onBlur={(event)=>handleConfirmPassword(event.target.value)}
                type='password'
                name='confirmPassword'
                id='confirm-password'
             
              />
            </div>
            {
              confirmPassword?.error && <p className="error">{confirmPassword.error}</p>
            }
          </div>
          <button type='submit' className='auth-form-submit'>
            Sign Up
          </button>
        </form>
        <p className='redirect'>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className='horizontal-divider'>
          <div className='line-left' />
          <p>or</p>
          <div className='line-right' />
        </div>
        <div className='input-wrapper'>
          <button className='google-auth' onClick={googleAuth}>
            <img src={GoogleLogo} alt='' />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
