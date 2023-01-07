import React, { useState } from "react";
import SignUpModal from "../components/SignUpModal";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Login() {
  const [isSignUpForm, setIsSignUpForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  const { loginUser } = useAuth()
  const navigate = useNavigate();

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setIsSignUpForm(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    const loginStatus = await loginUser({email, password})
    if(loginStatus === 'logged in') {
       setInvalid(false)
       navigate('/home')
    }

    if(loginStatus === 'fail') {
      setInvalid(true)
    }
  }

  return (
    <div className={`login-page ${isSignUpForm && "darken-background"}`}>
      <div className={`invalid-credentials ${invalid && 'show'}`}>
         <h3>Error</h3>
         <p>Invalid Credentials</p>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-container">
          <input type="email" id="login-email" placeholder=" " onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor="login-email">
            <span className="text">Email</span>
          </label>
        </div>

        <div className="input-container">
          <input type="password" id="login-password" placeholder=" " onChange={(e) => setPassword(e.target.value)}/>
          <label htmlFor="login-password">
            <span className="text">Password</span>
          </label>
        </div>

        <button type="submit" className="sign-in-btn">
          Sign In
        </button>
        <button className="forgot-password-text">Forgot your password?</button>

        <hr />
        <div className="sign-up-container">
          <h4>Don't have an account?</h4>
          <button onClick={handleSignUpClick} className="sign-up-btn">
            Sign Up
          </button>
        </div>
      </form>

      {isSignUpForm && <SignUpModal setIsSignUpForm={setIsSignUpForm} />}
    </div>
  );
}

export default Login;
