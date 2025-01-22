import { useState } from "react";
import { AtSign, Eye, EyeClosed, LoaderCircle, Lock } from "lucide-react";
import { useAuth } from "../AuthProvider";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleLogin } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    await handleLogin(email, password).then(() => {
      setLoading(false);
    }).catch((error) => {
      setError(error?.data?.message || 'Login failed');
      setLoading(false);
    });
  };

  return (
    <section className="bg-gradient-to-br flex flex-col from-bunker-900 h-screen items-center justify-center min-h-screen to-picton-blue-950">
      <div className="backdrop-blur-lg backdrop-filter bg-opacity-90 bg-white flex flex-col h-auto justify-center p-3 rounded-lg shadow-lg w-[400px]">
        <h1 className="bg-clip-text bg-gradient-to-l font-sans font-semibold from-malachite-400 p-3 text-3xl text-transparent to-east-bay-500 via-west-side-400">
          Welcome to MovieBoxd!
        </h1>
        <h2 className="font-sans p-3 text-gray-700 text-sm text-wrap">Join a thousand movie lovers and share your thoughts on the latest releases.</h2>
        <div className="align-baseline flex flex-col justify-center px-3">
          {error && <div className="bg-red-100 border border-red-400 my-2 p-2 rounded-lg text-red-700">{error}</div>}
          <div className="flex flex-col my-2">
            <label className="font-sans text-sm">Email</label>
            <div className="border border-body flex flex-row gap-3 items-center p-2 rounded-lg">
              <AtSign size={20} className="cursor-pointer" />
              <input
                placeholder="Email"
                type="email"
                className="border-none focus:outline-none w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col my-2">
            <label className="font-sans text-sm">Password</label>
            <div className="border border-body flex flex-row gap-3 items-center p-2 rounded-lg">
              <Lock size={20} className="cursor-pointer" />
              <input
                placeholder="Password"
                type={viewPassword ? 'text' : 'password'}
                className="border-none focus:outline-none w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              {viewPassword ?
                <EyeClosed
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setViewPassword(!viewPassword)}
                /> :
                <Eye
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setViewPassword(!viewPassword)} />}
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" className="align-top appearance-none bg-center bg-contain bg-no-repeat bg-white border border-gray-300 checked:bg-blue-600 checked:border-blue-600 cursor-pointer duration-200 float-left focus:outline-none h-4 mr-2 rounded-sm transition w-4" />
              <label className="font-sans">Remember me </label>
            </div>
            <span className="cursor-pointer font-bold font-sans hover:text-picton-blue-700 text-picton-blue-600">Forgot password?</span>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-east-bay-700 font-bold font-sans hover:bg-east-bay-600 my-6 p-2 rounded-lg text-white w-full">
            {loading ? <LoaderCircle size={20} className="align-middle animate-spin flex items-center" /> : 'Login'}
          </button>
          <div className="flex flex-row justify-between">
            <span className="font-sans text-gray-700 text-sm">Don't have an account?</span>
            <span className="cursor-pointer font-bold font-sans hover:text-picton-blue-700 text-picton-blue-600 text-sm">Sign up</span>
          </div>
        </div>
      </div>
    </section>
  );
};