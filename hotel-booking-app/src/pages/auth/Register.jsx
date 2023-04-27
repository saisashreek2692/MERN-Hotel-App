import React, { useState } from "react";
import { RegisterForm } from "../index";
import axios from "axios";
import { toast } from "react-toastify";
import { register } from "../actions/auth";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name,
        email,
        password,
      });
      console.log("REGISTER USER: ", res);
      toast.success("Register Success. Please Login");
      history.push("/login");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) toast.error(error.response.data);
    }
  };

  console.log(process.env.REACT_APP_API);

  return (
    <>
      <div className="container-fluid bg-secondary text-center p-5">
        <h1>Register</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
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

export default Register;
