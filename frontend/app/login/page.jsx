const Login = () => {
  return (
    <section className="post_box_shadow">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl post_box_shadow rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Login</span>
            <span className="font-light text-gray-400 mb-4">
              Please enter your details below to Log in!
            </span>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass"
                id="pass"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="flex justify-end mt-4">
              {/* Your Sign In button */}
              <button className="border border-2 text-black hover:text-gray-600 create-button font-bold py-2 px-4 rounded-full">
                Sign In
              </button>
            </div>

            {/* Google Sign In Button */}
            <button
              className="border border-2 text-black hover:text-gray-600 create-button font-bold py-2 px-4 rounded-full mt-4"
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
