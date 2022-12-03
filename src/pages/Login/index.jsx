import Loader from "@components/Loader";
import { GetCode } from "@contexts/actions/github";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { useAuth } from "@contexts/AuthContext";

const Login = () => {
  const { auth } = useAuth();
  return (
    <div className="container mx-auto flex flex-col items-center md:w-1/3 w-full mt-10 p-10 rounded-lg bg-white/5">
      <p className="text-2xl text-white font-semibold">Welcome Back</p>
      <button
        onClick={GetCode}
        className="flex items-center justify-center bg-primary text-black w-60 h-16 mt-10 rounded-lg text-lg font-medium"
      >
        {auth.isLoading ? (
          <Loader />
        ) : (
          <>
            <AiFillGithub className="mr-3" size={30} />
            Signin with Github
          </>
        )}{" "}
      </button>
    </div>
  );
};

export default Login;
