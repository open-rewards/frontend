import { useAuth } from "@contexts/AuthContext";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  const { login, __connectWallet } = useAuth();

  const load = async () => {
    const connectorType = localStorage.getItem("connector");
    if (connectorType == "mm") {
      __connectWallet();
      login();
    }
  };

  useEffect(() => {
    load();
  }, []);
  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
