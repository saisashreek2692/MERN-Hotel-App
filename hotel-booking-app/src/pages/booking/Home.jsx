import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <div className="container-fluid text-center p-5">
        <h1>Home {JSON.stringify(user)}</h1>
      </div>
    </>
  );
};

export default Home;
