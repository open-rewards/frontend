import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  GetCode,
  getAccessToken,
  getGithubUser,
} from "@contexts/actions/github";

import { dummyData } from "../pages/Projects/data";
import axios from "axios";

import { useMetamask } from "@saura3h/web3-connect";
const connect = new useMetamask();

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [allProjects, setAllProjects] = useState([]);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  const [github, setGithub] = useState({
    isGithubConnected: false,
    userGithubDetails: null,
  });

  const [pr1Data, setPr1Data] = useState({
    repoUrl: "",
    poolSize: "",
  });

  const [step, setStep] = useState(1);
  const [safeAddress, setSafeAddress] = useState("");
  const [splitAddress, setSplitAddress] = useState("");

  const fetchProjectData = async (address) => {
    const url = "https://open-rewards-be.herokuapp.com/";
    if (address) {
      const res = await axios.get(url + "pool/get?userAddress=" + address);
      setAllProjects(res.data);
      return;
    }
    const res = await axios.get(url + "pool/get");
    setAllProjects(res.data);
  };

  const login = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await getGithubUser(token);
      setGithub({
        userGithubDetails: res,
        isGithubConnected: true,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      user: null,
      isAuthenticated: false,
      isGithubConnected: false,
      userGithubDetails: null,
    });
  };

  //wallet Connection  - Metamask

  const __connectWallet = async () => {
    const wallet = await connect._connectMM();
    if (wallet.success == true) {
      localStorage.setItem("connector", "mm");
      setAuth({
        user: wallet,
        isAuthenticated: true,
      });
    } else {
      setAuth({
        user: null,
        isAuthenticated: false,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        __connectWallet,
        github,
        setGithub,
        setPr1Data,
        setStep,
        step,
        pr1Data,
        setSafeAddress,
        setSplitAddress,
        setAllProjects,
        allProjects,
        fetchProjectData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
