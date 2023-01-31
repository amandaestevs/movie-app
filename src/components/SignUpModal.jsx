import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import FormInput from "./FormInput";
import useAuth from "../hooks/useAuth";

function SignUpModal({ setIsSignUpForm }) {
  const { registerUser } = useAuth()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  const handleChange = (e) => {
    setUserData({
      ...userData, 
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = userData.name.toString();
    const email = userData.email.toString().toLowerCase();
    const password = userData.password.toString();
    const confirmPassword = userData.confirmPassword.toString();
    
    if (password !== confirmPassword) return
    const res = await registerUser({name, email, password})
    if (res === "201") {
      setIsSignUpForm(false)
    }
  };

  const inputs = [
    {
      name: "name", 
      label: "name",
      id: "sign-up-name",
      type: "text",
      minLength: "2",
      maxLength: "20",
      invalidMessage: "Name must contain at least 2 characters and no more than 20."
    }, 
    {
      name: "email", 
      label: "email", 
      id: "sign-up-email",
      type: "email",
      invalidMessage: "Please provide a valid email."
    }, 
    {
      name: "password", 
      label: "Password", 
      id: "sign-up-password",
      type: "password", 
      pattern: "(?=.*[A-Za-z])(?=.*[0-9])[a-zA-Z0-9@$!%*?&]{8,}$",
      invalidMessage: "Password must contain at least one digit, one letter and at least 8 characters."
    }, 
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      id: "confirm-password",
      pattern: userData.password,
      invalidMessage: "Passwords must match."
    }
  ]
  return (
    <div className="sign-up-modal">
      <div className="sign-up-heading">
        <h2>Sign Up</h2>
        <AiOutlineClose
          onClick={() => setIsSignUpForm(false)}
          className="close-icon"
        />
      </div>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        {inputs.map((input, i)=> {
          return(
            <FormInput key={i} handleChange={handleChange} {...input}/>
          )
        })}
        <button type="submit" className="sign-up-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpModal;
