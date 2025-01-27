import { useEffect, useState } from "react";
import { editProfile, getProfile } from "../api";
import { UserInterface } from "../types";
import MenuBar from "../components/MenuBar";
import { AtSign, Hash, UserIcon } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const accessToken = localStorage.getItem("access-token") as string;

  useEffect(() => {
    async function userProfile() {
      const profile = await getProfile({ accessToken });
      setUser(profile);
    }
    userProfile();
  }, []);

  const handleEditProfile = async () => {
    try {
      if (user) {
        await editProfile({ accessToken, username: user.username, email: user.email, password: user.password, name: user.name, avatar: user.avatar, bio: user.bio });
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <section className="bg-gradient-to-br from-bunker-900 h-full items-center justify-center min-h-screen p-3 to-picton-blue-950">
      <MenuBar />
      <div className="backdrop-blur-lg backdrop-filter bg-opacity-20 bg-white flex flex-col gap-12 p-3 rounded-lg shadow-lg w-full">
        <div className="align-middle flex flex-col p-3">
          <div className="flex items-center justify-center">
            {user && user.avatar ?
              <img src={user.avatar} alt="avatar" className="h-20 rounded-full w-20" />
              : <UserIcon size={64} color="#b1bdc8" className="border-4 border-bunker-300 h-20 rounded-full w-20" />}
          </div>
          <div className="flex flex-col gap-2 justify-start py-3">
            <div className="flex flex-col">
              <label className="font-sans text-bunker-300">Username</label>
              <div className="align-middle flex flex-row gap-1 items-center">
                <Hash size={16} color="#b1bdc8" />
                <input type="text" className="border border-body p-1 rounded-lg w-[360px]" value={user?.username} />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-sans text-bunker-300">Email</label>
              <div className="align-middle flex flex-row gap-1 items-center">
                <AtSign size={16} color="#b1bdc8" />
                <input type="text" className="border border-body p-1 rounded-lg w-[360px]" value={user?.email} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <button onClick={handleEditProfile} className="bg-east-bay-500 flex p-2 rounded-lg text-white">Save</button>
        </div>
      </div>
    </section>
  );
};