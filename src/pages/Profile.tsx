import { useEffect, useState } from 'react';
import { editProfile, getProfile, getUsersLists } from '../api';
import { UserInterface } from '../types';
import MenuBar from '../components/MenuBar';
import { Hash, Lock, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Profile() {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [lists, getLists] = useState([]);
  const accessToken = localStorage.getItem('access-token') as string;

  const navigate = useNavigate();

  useEffect(() => {
    async function userProfile() {
      const profile = await getProfile({ accessToken });
      setUser(profile);
    }

    async function userLists() {
      const lists = await getUsersLists({ accessToken });
      getLists(lists);
    }

    userProfile();
    userLists();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [name]: value,
        };
      }
      return prevUser;
    });
  };

  const handleEditProfile = async () => {
    try {
      if (user) {
        await editProfile({
          accessToken,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
          bio: user.bio,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="bg-gradient-to-br from-bunker-900 h-full items-center justify-center min-h-screen p-3 to-picton-blue-950">
      <MenuBar />
      <div className="backdrop-blur-lg backdrop-filter bg-opacity-20 bg-white flex flex-col gap-12 p-3 rounded-lg shadow-lg w-full">
        <div className="align-middle flex flex-col p-3">
          <div className="flex items-center justify-center">
            {user && user.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="h-20 rounded-full w-20"
              />
            ) : (
              <UserIcon
                size={64}
                color="#b1bdc8"
                className="border-4 border-bunker-300 h-20 rounded-full w-20"
              />
            )}
          </div>
          <div className="flex flex-col gap-2 justify-start md:justify-center py-3 sm:justify-center">
            <div className="flex flex-col">
              <label className="font-sans text-bunker-300">Email</label>
              <div className="align-middle flex flex-row gap-1 items-center">
                <input
                  type="text"
                  className="border border-body p-1 rounded-xl w-[360px]"
                  onChange={handleChange}
                  name="email"
                  value={user?.email}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-sans text-bunker-300">Bio</label>
              <textarea
                name="bio"
                rows={5}
                onChange={handleChange}
                className="border border-body p-1 rounded-xl w-[360px]"
                value={user?.bio}
              />
            </div>
            <div className="bg-bunker-300 bg-opacity-35 flex flex-col p-3 rounded-xl">
              <label className="font-bold font-sans mb-4 text-bunker-200">
                Change password
              </label>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <label className="font-sans text-bunker-300">
                    Current password
                  </label>
                  <div className="align-middle flex flex-row gap-1 items-center">
                    <Lock size={16} color="#b1bdc8" />
                    <input
                      type="password"
                      name="old_password"
                      onChange={handleChange}
                      className="border border-body p-1 rounded-xl w-[360px]"
                      value=""
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-sans text-bunker-300">
                    New password
                  </label>
                  <div className="align-middle flex flex-row gap-1 items-center">
                    <Lock size={16} color="#b1bdc8" />
                    <input
                      type="password"
                      name="password"
                      className="border border-body p-1 rounded-xl w-[360px]"
                      value=""
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-bold font-sans py-3 text-2xl text-bunker-200">
                Your Lists
              </label>
              <div className="flex flex-col gap-2">
                {lists.map((list: any) => (
                  <div
                    key={list.id}
                    className="bg-bunker-300 bg-opacity-35 flex flex-col gap-2 items-start p-3 rounded-xl"
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <Hash size={16} color="#b1bdc8" />
                      <span className="text-bunker-200">{list.name}</span>
                    </div>
                    <div className="flex flex-row gap-2 px-3">
                      {list.items.slice(0, 5).map((item: any) => (
                        <div
                          key={item.id}
                          className="flex flex-row gap-2 items-center p-3 rounded-xl"
                          onClick={() => navigate(`/movie/${item.movie.id}`)}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.movie.poster_path}`}
                            alt={item.movie.title}
                            className="cursor-pointer rounded-lg w-[150px]"
                          />
                        </div>
                      ))}
                      {list.items.length > 5 && (
                        <button
                          onClick={() => navigate(`/list/${list.id}`)}
                          className="text-bunker-200"
                        >
                          See more
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <button
            onClick={handleEditProfile}
            className="bg-east-bay-500 flex hover:bg-east-bay-700 p-2 rounded-lg text-white"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
}
