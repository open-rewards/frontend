import ConnectGithub from "@components/ConnectGithub";
import { GetCode } from "@contexts/actions/github";
import { useAuth } from "@contexts/AuthContext";
import { useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import ProjectComponent from "./ProjectComponent";

const YourProjects = () => {
  const { github, fetchProjectData, allProjects, auth } = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchProjectData(auth.user.address);
    }
  }, []);

  if (!github.isGithubConnected) {
    return (
      <ConnectGithub
        title="Your Projects"
        subtitle="Connect your Github account to view your projects"
      />
    );
  }

  return (
    <div>
      <p className="text-xl text-white my-7">Your Projects</p>
      {allProjects.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-7">
          {allProjects.map((project) => (
            <ProjectComponent key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-white text-center text-lg mt-12">No Project Found</p>
      )}
    </div>
  );
};

export default YourProjects;
