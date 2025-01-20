export default function Login() {
  return (
    <section className="bg-bunker-800 flex flex-col h-screen items-center justify-center">
      <div className="bg-white flex flex-col h-auto justify-center p-3 rounded-lg shadow-lg w-[400px]">
        <h1 className="font-bold font-sans px-3 text-2xl text-wrap">
          Welcome to MovieBoxd!
        </h1>
        <h2 className="font-sans p-3 text-gray-700 text-sm text-wrap">Join a thousand movie lovers and share your thoughts on the latest releases.</h2>
        <div className="align-baseline flex flex-col justify-center px-3">
          <div className="flex flex-col my-2">
            <label className="font-sans text-sm">Email</label>
            <div className="border border-body flex flex-row gap-3 items-center p-2 rounded-lg">
              <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path stroke="#656565" d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
              <input
                placeholder="Email"
                type="email"
                className="border-none focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-col my-2">
            <label className="font-sans text-sm">Password</label>
            <div className="border border-body flex flex-row gap-3 items-center p-2 rounded-lg">
              <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path stroke="#656565" d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
              <input
                placeholder="Password"
                type="password"
                className="border-none focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-1 items-center">
              <input type="checkbox" className="align-top appearance-none bg-center bg-contain bg-no-repeat bg-white border border-gray-300 checked:bg-blue-600 checked:border-blue-600 cursor-pointer duration-200 float-left focus:outline-none h-4 mr-2 rounded-sm transition w-4" />
              <label className="font-sans">Remember me </label>
            </div>
            <span className="cursor-pointer font-bold font-sans hover:text-picton-blue-700 text-picton-blue-600">Forgot password?</span>
          </div>
          <button className="bg-west-side-500 font-bold font-sans hover:bg-west-side-600 my-6 p-2 rounded-lg text-white w-full">
            Login
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