import { useAuth } from "@contexts/AuthContext";
import React, { useEffect, useState } from "react";

import { ethers } from "@saura3h/web3-connect";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import { SafeFactory } from "@safe-global/safe-core-sdk";
import Loader from "@components/Loader";

const Pr2 = () => {
  const { setStep, auth } = useAuth();
  const { ethereum } = window;
  const [isLoading, setIsLoading] = useState(false);

  const __deploySafe = async () => {
    if (!auth.isAuthenticated) return;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const safeOwner = provider.getSigner(0);
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: safeOwner,
    });
    setIsLoading(true);
    console.log("Deploying Safe...");
    console.log("owner", safeOwner);
    try {
      const safeFactory = await SafeFactory.create({ ethAdapter });
      const owners = [auth.user.address];
      const threshold = 1;
      const safeAccountConfig = {
        owners,
        threshold,
      };
      const safeSdk = await safeFactory.deploySafe({ safeAccountConfig });
      const newSafeAddress = safeSdk.getAddress();
      setIsLoading(false);
      localStorage.setItem("safeAddress", newSafeAddress);
      console.log(newSafeAddress);
      setStep(3);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="mx-auto md:w-1/2 w-full border border-white/10 rounded-xl p-10 mt-10 flex flex-col text-white">
      <p className="border border-[#00ffab] px-6 py-4 rounded w-44">
        {" "}
        Pool Created <span className="ml-2">✅</span>
      </p>

      {/* <div className="my-5">
        <p className="text-white/60 text-lg"> Add Project Moderators</p>
        <input
          type="text"
          className="w-full border border-white/20 rounded-md p-2 h-14 mt-2 bg-transparent focus:outline-none"
          placeholder="@username"
          disabled
        />
      </div> */}
      <button
        onClick={() => __deploySafe()}
        disabled={isLoading}
        className="bg-primary mt-6 w-40 h-12 rounded text-black font-medium flex items-center justify-center"
      >
        Create Safe <span className="ml-2">{isLoading && <Loader />}</span>
      </button>
    </div>
  );
};

export default Pr2;
