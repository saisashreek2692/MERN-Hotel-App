import React, { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../actions/auth";
import { LoginForm } from "../index";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("LOGIN RESPONSE", { email, password });
    try {
      let res = await login({ email, password });
      if (res.data) {
        console.log("SAVE USER DATA IN REDUX AND LOCAL STORAGE AND REDIRECT");
        //console.log(res.data);
        // save user and token in local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        // save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid text-center p-5">
        <h1>Login Page</h1>
      </div>
      <div className="conatiner">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
