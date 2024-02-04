'use client';

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {

  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    router.push("/")
  }

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  return (
    <section className='post_box_shadow'>
      <div class="flex items-center justify-center min-h-screen">
      <div
        class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl post_box_shadow rounded-2xl md:flex-row md:space-y-0"
      >
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold">Login</span>
          <span class="font-light text-gray-400 mb-4">
            Please enter your details below to Log in!
          </span>
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
            <button className="border border-2 text-black hover:text-gray-600 create-button font-bold py-2 px-4 rounded-full">
              Sign In
            </button>
          </div>
          <hr className="mt-3 mb-3"/>
          <div className="flex items-center px-4 py-2 mt-2 font-semibold text-center tracking-tighter text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg text-md md:mt-0 hover:text-white hover:bg-black focus:shadow-outline hover:cursor-pointer"
          onClick={handleGoogleSignIn}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" className="mr-3">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Login