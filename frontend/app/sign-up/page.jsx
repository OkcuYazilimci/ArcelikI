const Signup = () => {
  return (
    <section className='post_box_shadow'>
      <div class="flex items-center justify-center min-h-screen">
      <div
        class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl post_box_shadow rounded-2xl md:flex-row md:space-y-0"
      >
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold">Sign Up</span>
          <span class="font-light text-gray-400 mb-4">
            Please enter your details below to Sign Up!
          </span>
          <div class="py-4">
            <span class="mb-2 text-md">First Name</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="firstname"
              id="firstname"
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Last Name</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="lastname"
              id="lastname"
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Email</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-end mt-4">
            {/* Your Sign Up button */}
            <button className="border border-2 border-gray-500 hover:bg-blue-700 purple_gradient font-bold py-2 px-4 rounded-full">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Signup