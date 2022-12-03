import { useAuth } from "@contexts/AuthContext";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const { auth, __connectWallet } = useAuth();
  return (
    <div className="border-b border-white/5">
      <div className="container mx-auto flex justify-between py-4">
        <Link to="/" className="text-white font-extrabold text-4xl">
          Sishui
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/all-projects" className="text-white">
            Explore
          </Link>
          <Link to="/your-projects" className="text-white">
            Your Projects
          </Link>
        </div>
        {/* {auth.isAuthenticated ? (
          <ProfileMenu />
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-primary rounded-lg text-black font-medium"
          >
            Login
          </Link>
        )} */}
        {auth.isAuthenticated ? (
          <ProfileMenu />
        ) : (
          <button
            onClick={() => __connectWallet()}
            className="px-4 py-2 bg-primary rounded text-black font-medium"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
