import { fetchRepoDetails } from "@contexts/actions/github";
import { useAuth } from "@contexts/AuthContext";
import React, { FC, useEffect } from "react";
import matic from "@assets/matic.svg";
import { AiFillStar } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const ProjectComponent = ({ project }) => {
  const navigate = useNavigate();
  // const { pr1Data } = useAuth();
  // console.log(pr1Data);

  const __navigateToProjectDetail = (name) => {
    const slug = name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/project-detail/${slug}`, {
      state: {
        repoUrl: project.repoUrl,
      },
    });
  };

  return (
    <div className="border border-white/20 rounded px-5 py-5 flex flex-col">
      <button
        onClick={() => __navigateToProjectDetail(project.repoName)}
        className="text-2xl font-semibold text-white pt-3 text-left"
      >
        {project.repoName}
      </button>
      <p className="pb-5 text-white pt-3 italic">
        By <span className="text-primary">{project.username}</span>
      </p>
      <div className="flex items-center border-t border-white/10 pt-4 space-x-10">
        <div className="flex items-center gap-2 text-white font-medium">
          <p className="text-gray-400">Pool Prize :</p>
          <div className="flex items-center space-x-2">
            <p className="text-lg font-semibold">100</p>
            <img src={matic} alt="matic" className="w-5" />
          </div>
        </div>
        <div className="flex items-center">
          <AiFillStar className="text-white/60 text-xl" />
          <p className="text-white font-semibold text-xl ml-2">
            {project.stars}
          </p>
        </div>
        <div className="flex items-center">
          <HiUserGroup className="text-white/60 text-xl" />
          <p className="text-white text-xl font-semibold ml-2">
            {project.contributors}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectComponent;
