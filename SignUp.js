import React, { useState } from "react";
import FrontPage from './FrontPage';
import "./style.css";

function SignUp() {
  const initialState = {
    userInfo: {
      name: "",
      email: "",
      password: "",
    },
    isReg: false,
    errormsg:'',
  };

  const submitform = async (data) => {
    //Submit action
    if(state.userInfo.name.length == 0 || state.userInfo.email.length == 0 || state.userInfo.password.length == 0){
        setState({
            ...state,
            errormsg:'Please Enter all fields ',
        })
        return;
    }else{
        setState({
            ...state,
            isReg:true,
        })

    }
    
  };
  const [state, setState] = useState(initialState);
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  if (state.isReg) {
    return <FrontPage />;
  } else {
    return (
      <div className="_loginRegister">
        <h1>Sign Up</h1>
        <form onSubmit={submitform} noValidate>
          <div className="form-control">
            <label>Full Name</label>
            <input
              name="name"
              required
              type="text"
              value={state.userInfo.name}
              onChange={onChangeValue}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              name="email"
              required
              type="email"
              value={state.userInfo.email}
              onChange={onChangeValue}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              name="password"
              required
              type="password"
              value={state.userInfo.password}
              onChange={onChangeValue}
              placeholder="Enter your password"
            />
          </div>
          {state.errormsg}
          <div className="form-control">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
