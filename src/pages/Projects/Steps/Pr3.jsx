import React, { useState } from "react";
import { SplitsClient } from "@0xsplits/splits-sdk";
import { ethers } from "@saura3h/web3-connect";
import { useAuth } from "@contexts/AuthContext";
import Loader from "@components/Loader";
import rewardContractABI from "@utils/ABI/rewardContractABI.json";
import { useNavigate } from "react-router-dom";
import {
  fetchRepoContributors,
  fetchRepoDetails,
} from "@contexts/actions/github";
import axios from "axios";
const Pr3 = () => {
  const { ethereum } = window;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { auth, github } = useAuth();
  // const __deploySplits = async () => {
  //   if (!auth.isAuthenticated) return;
  //   const provider = new ethers.providers.Web3Provider(ethereum);

  //   setIsLoading(true);
  //   const client = new SplitsClient({
  //     chainId: 80001,
  //     provider,
  //     signer: provider.getSigner(0),
  //   });

  //   const liquidSplitClient = client.liquidSplits;

  //   const args = {
  //     recipients: [
  //       {
  //         address: "0x69656366fCE2BE956DBDe76Ef22B4c6A2d1856a7",
  //         percentAllocation: 50.0,
  //       },
  //       {
  //         address: "0x3318d69069846380cee4a1c390b65dcf2c7a592e",
  //         percentAllocation: 50.0,
  //       },
  //     ],
  //     distributorFeePercent: 1.0,
  //     owner: auth.user.address,
  //     createClone: true,
  //   };
  //   try {
  //     console.log("Deploying Splits...");
  //     const response = await liquidSplitClient.createLiquidSplit(args);
  //     console.log(response);
  //     localStorage.setItem("splitAddress", response.liquidSplitId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setIsLoading(false);
  // };

  const __updateSafeAddress = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contractAddress = localStorage.getItem("step1ContractAddress");
    const contract = new ethers.Contract(
      contractAddress,
      rewardContractABI.abi,
      provider.getSigner(0)
    );
    setIsLoading(true);
    const safeAddress = localStorage.getItem("safeAddress");
    try {
      // const tx = await contract.setSafe(safeAddress);
      // await tx.wait();

      const repoUrl = JSON.parse(localStorage.getItem("repoUrl"));
      console.log("repoUrl", repoUrl.label);
      const slug = repoUrl.label.replace(/\s+/g, "-").toLowerCase();

      const token = localStorage.getItem("token");
      const res = await fetchRepoDetails(token, repoUrl.value);
      const res1 = await fetchRepoContributors(token, res?.contributors_url);

      const postData = {
        repoUrl: repoUrl.value,
        username: github.userGithubDetails.login,
        userAddress: auth.user.address,
        safeContractAddress: safeAddress,
        contractAddress: contractAddress,
        repoName: repoUrl.label,
        contributors: res1.length,
        stars: res.stargazers_count,
      };

      const url = "https://open-rewards-be.herokuapp.com/";
      const response = await axios.post(url + "pool/create", postData);

      setIsLoading(false);
      navigate(`/project-detail/${slug}`, {
        state: {
          repoUrl: repoUrl.value,
        },
      });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto md:w-1/2 w-full border border-white/10 rounded-xl p-10 mt-10 flex flex-col text-white">
      <p className="text-xl font-semibold mb-4">Add a project</p>
      <p className="border border-[#00ffab] px-6 py-4 rounded w-44">
        {" "}
        Pool Created <span className="ml-2">✅</span>
      </p>
      <p className="border border-[#00ffab] px-6 py-4 rounded w-44 mt-4">
        {" "}
        Safe Created <span className="ml-2">✅</span>
      </p>
      <div className="my-6">
        <p className="text-lg text-white">How do you want this to split?</p>
        <select className="mt-2 focus:outline-none bg-transparent w-full border border-white/20 py-3 rounded px-2">
          <option>Select</option>
          <option>Equally among all contributors</option>
          <option>Equally among top X % contributors</option>
        </select>
      </div>
      <div className="my-2">
        <p className="text-lg text-white">Fund roll out period</p>
        <select className="mt-2 focus:outline-none bg-transparent w-full border border-white/20 py-3 rounded px-2">
          <option>Select</option>
          <option>1 week after the month</option>
          <option>15 days after the month</option>
        </select>
      </div>
      <button
        onClick={__updateSafeAddress}
        disabled={isLoading}
        className="bg-primary px-4 mt-4 h-12 rounded text-black font-medium flex items-center justify-center"
      >
        Set up & Activate Pool{" "}
        <span className="ml-3">{isLoading && <Loader />}</span>
      </button>
    </div>
  );
};

export default Pr3;
