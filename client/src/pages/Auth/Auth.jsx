import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const loading= useSelector((state)=>state.authReducer.loading)

  const [isSignUp, setIsSignUp] = useState(false)
  
  console.log(loading)

  const [data, setData] = useState(initialState)
  
  const [confirmPass,setConfirmPass]=useState(true)

  const handleChange = (e) =>
  {
    setData({...data,[e.target.name]:e.target.value})
  }
  
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    }
    else {
      dispatch(logIn(data, navigate));
    }
  };
  
  const resetForm = () => {
    setConfirmPass(confirmPass);
    setData({initialState});
  }

  return (
    <div className="Auth">
      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>InstaAmi</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/*Right Side */}
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"} </h3>

          {isSignUp &&(
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
        <div>
            <input
            required
            type="text"
            className="infoInput"
            name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
          />
        </div>

        <div>
            <input
              required
            type="password"
            className="infoInput"
            name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            
            {isSignUp &&(
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                // value={data.confirmpass}
              />
            )}
        </div>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px"
            }}>
            * Confirm Password is not same
        </span>
        <div>
            <span
              style={{
                fontSize: '12px',
                cursor: "pointer"
                // textDecoration: "underline",
              }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm()
              }}>
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account? Sign Up"}
            </span>
        </div>
          <button className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading? "Loading..." : isSignUp ? "SignUp" : "Login"}
          </button>
      </form>
    </div>
  </div>
  );
};

export default Auth;