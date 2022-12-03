import ConnectGithub from "@components/ConnectGithub";
import { useAuth } from "@contexts/AuthContext";
import React from "react";

import { ethers } from "@saura3h/web3-connect";
import rewardContractABI from "@utils/ABI/rewardContractABI.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LinkAddress = () => {
  const { github } = useAuth();
  const [isVerified, setIsVerified] = React.useState(false);
  const [isLinked, setIsLinked] = React.useState(false);
  const [verifiedData, setVerifiedData] = React.useState(null);
  if (!github.isGithubConnected) {
    return (
      <div>
        <ConnectGithub
          title="Connect Github"
          subtitle="Connect github to Link your address"
        />
      </div>
    );
  }

  const { ethereum } = window;
  const navigate = useNavigate();
  const __signMessage = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const message = github.userGithubDetails.login;
    const signature = await signer.signMessage(message);
    const url = "https://open-rewards-be.herokuapp.com/";
    const nonce = new Date().getTime();
    const token = localStorage.getItem("token");
    const contractAddress = localStorage.getItem("step1ContractAddress");
    const data = {
      address,
      signature,
      nonce,
      accessToken: token,
      message,
      contractAddress,
    };
    const res = await axios.post(url + "creds/verify", data);
    setVerifiedData(res.data);
    setIsVerified(true);
  };

  const __linkAddress = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contractAddress = localStorage.getItem("step1ContractAddress");
    console.log(contractAddress, rewardContractABI.abi, provider.getSigner());
    const contract = new ethers.Contract(
      contractAddress,
      rewardContractABI.abi,
      provider.getSigner()
    );

    try {
      console.log(
        "here",
        verifiedData.username,
        verifiedData.nonce,
        verifiedData.signature
      );
      const linkAddress = await contract.setAddress(
        verifiedData.username,
        verifiedData.nonce,
        verifiedData.signature
      );

      await linkAddress.wait();
      setIsLinked(true);
      navigate("/all-projects");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <p className="text-white/70 text-2xl font-medium">
        Link Your Wallet Address
      </p>
      <p className="text-lg text-white mt-6">1. Generate Ownership Proof</p>
      <button
        onClick={__signMessage}
        disabled={isVerified}
        className={`${
          isVerified ? "bg-gray-400 " : "bg-primary text-black"
        } px-6 py-2 rounded mt-3`}
      >
        Verify {isVerified && <span className="ml-2">✅</span>}
      </button>

      <p className="text-lg text-white mt-6">2. Link Your Address</p>
      <button
        onClick={__linkAddress}
        className="bg-primary text-black px-6 py-2 rounded mt-3"
      >
        Link Address {isLinked && <span className="ml-2">✅</span>}
      </button>
    </div>
  );
};

export default LinkAddress;
