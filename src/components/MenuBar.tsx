import { ArrowLeft, LogOut, Search, UserRoundPen } from "lucide-react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useAuth } from "../AuthProvider";

export default function MenuBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/home';
  const { logout } = useAuth();

  const handleBackClick = () => {
    navigate('/home');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="backdrop-blur-lg backdrop-filter bg-opacity-10 flex items-center mb-4 movie-poster p-4 relative rounded-2xl shadow-lg z-10">
      {!isHome &&
        <button onClick={handleBackClick} className="flex items-center text-bunker-300">
          <ArrowLeft size={20} />
          <span className="ml-2">Back</span>
        </button>
      }
      <div className="align-middle flex flex-row justify-between w-full">
        <h1 className="bg-clip-text bg-gradient-to-l font-sans font-semibold from-malachite-400 p-3 text-3xl text-transparent to-east-bay-500 via-west-side-400">movieboxd</h1>
        <div className="flex flex-row gap-5 items-center">
          <div className="align-middle flex flex-row gap-2 items-center mr-8">
            <input
              className="bg-transparent border-2 border-bunker-300 p-1 rounded-lg text-bunker-300 w-full"
              placeholder="Search" />
            <button className="flex items-center text-bunker-300">
              <Search size={20} color="#b1bdc8 " />
            </button>
          </div>
          <button
            onClick={goToProfile}
            className="flex items-center text-bunker-300">
            <UserRoundPen size={20} />
          </button>
          <button
            onClick={logout}
            className="flex items-center text-bunker-300">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}