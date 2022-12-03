import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProjectComponent from "./ProjectComponent";

import { useAuth } from "@contexts/AuthContext";

const latestData = [
  {
    title: "Congratulations on your first contribution!",
    date: "2 days ago",
  },
  {
    title: "Yay! Your profile is verified",
    date: "1 day ago",
  },
];

const Projects = () => {
  const { allProjects, fetchProjectData } = useAuth();

  useEffect(() => {
    fetchProjectData();
  }, []);
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-white">Explore</p>
        <Link
          to="/add-project"
          className="bg-primary px-4 py-2 rounded text-black font-medium"
        >
          Add Project
        </Link>
      </div>
      <div className="flex justify-between mt-8">
        <div className="grid md:grid-cols-2 gap-7 md:w-2/3">
          {allProjects.length > 0 &&
            allProjects.map((project) => (
              <ProjectComponent key={project.id} project={project} />
            ))}
        </div>
        <div className="hidden sticky top-24 md:block w-1/4 h-52 border border-white/20 rounded p-5">
          <p className="text-xl text-white">Latest Updates</p>
          <div className="mt-5 flex flex-col gap-y-7">
            {latestData.map((data) => (
              <div key={data.title} className="flex flex-col">
                <p className="text-white font-medium">{data.title}</p>
                <p className="text-white/60 text-sm">{data.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
