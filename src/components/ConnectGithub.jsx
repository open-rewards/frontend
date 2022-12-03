import {
  getAccessToken,
  GetCode,
  getGithubUser,
} from "@contexts/actions/github";
import { useAuth } from "@contexts/AuthContext";
import React, { FC, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";

const ConnectGithub = ({ title, subtitle }) => {
  const { setGithub } = useAuth();
  const code = new URLSearchParams(window.location.search).get("code");
  useEffect(() => {
    if (code) {
      getAccessToken(code).then((res) => {
        if (res !== undefined) {
          getGithubUser(res).then((result) => {
            setGithub({
              userGithubDetails: result,
              isGithubConnected: true,
            });
          });
          //remove code from url
          window.history.replaceState({}, document.title, "/");
        }
      });
    }
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      <h1 className="text-4xl font-bold text-white">{title}</h1>
      <p className="text-white">{subtitle}</p>
      <button
        onClick={GetCode}
        className="flex items-center justify-center bg-primary text-black w-56 h-14 mt-10 rounded font-medium"
      >
        <AiFillGithub className="mr-3" size={26} />
        Connect Github
      </button>
    </div>
  );
};

export default ConnectGithub;
