import Loader from "@components/Loader";
import {
  fetchRepoContributors,
  fetchRepoDetails,
} from "@contexts/actions/github";
import { useAuth } from "@contexts/AuthContext";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import matic from "@assets/matic.svg";
import { AiFillStar } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { BiGitRepoForked } from "react-icons/bi";
import SplitModal from "./SplitModal";

const PayoutData = [
  {
    name: "@saurabh",
    address: "0xd59d86FE3cAED126940345b6aa162571137A11ae",
    amountPaid: 200,
  },
  {
    name: "@starc",
    address: "0xd59d86FE3cAED126940345b6aa162571137A11ae",
    amountPaid: 300,
  },
  {
    name: "@sa123",
    address: "0xd59d86FE3cAED126940345b6aa162571137A11ae",
    amountPaid: 100,
  },
];

const ProjectDetail = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);
  const [repoDetails, setRepoDetails] = React.useState(null);
  const [projectDetails, setProjectDetails] = React.useState(null);
  const [contributors, setContributors] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const repoUrl = location.state.repoUrl;
  const { allProjects } = useAuth();

  useEffect(() => {
    const repoDetails = allProjects.filter(
      (project) => project.repoUrl === repoUrl
    );
    setProjectDetails(repoDetails[0]);
  }, []);

  const loadData = async () => {
    const token = localStorage.getItem("token");
    if (repoUrl && token) {
      setIsLoading(true);
      const res = await fetchRepoDetails(token, repoUrl);
      setRepoDetails(res);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const fetchContributors = async () => {
    const token = localStorage.getItem("token");
    if (repoDetails?.contributors_url && token) {
      const res = await fetchRepoContributors(
        token,
        repoDetails?.contributors_url
      );
      setContributors(res);
    }
  };

  useEffect(() => {
    fetchContributors();
  }, [repoDetails]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-16">
        <Loader col="text-white" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 md:px-48">
      <div className="border border-white/20 rounded-lg w-full bg-white/5 p-10">
        <p className="text-white text-4xl font-semibold">{repoDetails?.name}</p>
        <p className="text-white/60 text-xl mt-4 pb-8">
          {repoDetails?.description}
        </p>

        <div className="flex items-center border-t border-white/10 pt-4 space-x-10">
          <div className="flex items-center gap-2 text-white font-medium">
            <p className="text-gray-400">Pool Prize :</p>
            <div className="flex items-center space-x-2">
              <p className="text-lg font-semibold">
                {Math.floor(Math.random() * 1000)}
              </p>
              <img src={matic} alt="matic" className="w-5" />
            </div>
          </div>
          <div className="flex items-center">
            <AiFillStar className="text-white/60 text-xl" />
            <p className="text-white font-semibold text-xl ml-2">
              {repoDetails?.stargazers_count}
            </p>
          </div>
          <div className="flex items-center">
            <BiGitRepoForked className="text-white/60 text-xl" />
            <p className="text-white font-semibold text-xl ml-2">
              {repoDetails?.forks_count}
            </p>
          </div>
          <div className="flex items-center">
            <HiUserGroup className="text-white/60 text-xl" />
            <p className="text-white text-xl font-semibold ml-2">
              {projectDetails?.contributors}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 px-6 py-2 rounded text-black bg-primary font-medium"
        >
          Split and Pay
        </button>
        <SplitModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      {contributors.length > 0 ? (
        <>
          <div className="flex justify-between items-center mt-8 mb-2">
            <p className="text-zinc-400   text-lg font-medium">
              Contributors List
            </p>
            {/* <button
              onClick={__linkAddress}
              className="bg-primary w-28 h-10 rounded text-black font-medium text-sm flex items-center justify-center"
            >
              Link Address{" "}
              {isLinking ? (
                <span className="ml-3">
                  <Loader col="text-black" />{" "}
                </span>
              ) : null}
            </button> */}
            <Link
              to="/link"
              className="bg-primary w-28 h-10 rounded text-black font-medium text-sm flex items-center justify-center"
            >
              Link Address{" "}
            </Link>
          </div>
          <div className="border border-white/20 max-h-44 px-6 py-4 rounded-lg w-full ">
            <div className="flex flex-wrap gap-4">
              {contributors.map((contributor) => (
                <a
                  href={contributor.html_url}
                  target="_blank"
                  className="flex items-center px-6 py-3 bg-white/5 rounded"
                >
                  <img
                    src={contributor.avatar_url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-white ml-4">{contributor.login}</p>
                </a>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-white py-6">No contributors yet</p>
      )}
      <p className="text-zinc-400 mt-8 mb-2 text-lg font-medium">
        Payout/reward History
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {PayoutData.map((data) => (
          <div className="px-6 py-3 rounded bg-white/5 flex justify-between">
            <p className="flex items-center space-x-2">
              <span className="text-white font-medium">{data.name}</span>{" "}
              <span className="text-white/60 w-32 truncate">
                {data.address}
              </span>
            </p>
            <p className="text-zinc-400">{data.amountPaid} Paid</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
