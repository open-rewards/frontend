import { useEffect, useState } from "react";
import Select from "react-select";
import { useAuth } from "@contexts/AuthContext";
import { fetchPublicRepos } from "@contexts/actions/github";
import { ethers } from "@saura3h/web3-connect";
import rewardContractABI from "@utils/ABI/rewardContractABI.json";
import Loader from "@components/Loader";

const Pr1 = () => {
  const { ethereum } = window;
  const { github, setStep } = useAuth();
  const [repos, setRepos] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [repourl, setRepoUrl] = useState("");

  const loadData = async (token) => {
    const res = await fetchPublicRepos(token);
    if (res?.length > 0) {
      //filter according to the user
      const filteredRepos = res.filter((repo) => {
        return (
          repo.owner.login === github?.userGithubDetails?.login &&
          repo.fork === false
        );
      });
      const repoOptions = filteredRepos.map((repo) => ({
        value: repo.url,
        label: repo.name,
      }));
      setRepos(repoOptions);
    }
  };

  useEffect(() => {
    if (github.isGithubConnected) {
      const token = localStorage.getItem("token");
      if (token) {
        loadData(token);
      }
    }
  }, [github.isGithubConnected]);

  const __deployPool = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contractFactory = new ethers.ContractFactory(
      rewardContractABI.abi,
      rewardContractABI.bytecode,
      provider.getSigner(0)
    );

    console.log("deploying contract....");
    console.log("repourl", repourl);
    setIsLoading(true);
    try {
      const contract = await contractFactory.deploy(
        repourl.value,
        github?.userGithubDetails?.login
      );
      await contract.deployed();
      setIsLoading(false);
      console.log(contract.address);
      localStorage.setItem("repoUrl", JSON.stringify(repourl));
      localStorage.setItem("step1ContractAddress", contract.address);
      setStep(2);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="mx-auto md:w-1/2 w-full border border-white/10 rounded-xl p-10 mt-10 flex flex-col text-white">
      <p className="text-3xl font-semibold">Add a project</p>
      <div className="my-4">
        <p className="text-lg">Select your Repository</p>
        <Select
          options={repos}
          className="text-gray-700 mt-2 font-medium focus:outline-none w-full focus:bg-transparent"
          value={repourl}
          onChange={(e) => setRepoUrl(e)}
        />
      </div>
      {/* <div className="mb-4 mt-4">
        <p className="text-lg">Pool Size (ETH)</p>
        <input
          value={formData.poolSize}
          onChange={(e) =>
            setFormData({ ...formData, poolSize: e.target.value })
          }
          className="w-full mt-2 border border-white/10 rounded-md p-2 text-gray-200 bg-transparent focus:outline-none hover:border-white transition duration-200"
        />
      </div> */}
      <button
        onClick={__deployPool}
        className="bg-primary px-6 h-12 rounded text-black font-medium flex items-center justify-center"
      >
        Create Pool <span className="ml-2">{isLoading && <Loader />}</span>
      </button>
    </div>
  );
};

export default Pr1;
