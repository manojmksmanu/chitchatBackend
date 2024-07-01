import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const [showPasswordicon, hidePasswordicon] = useState("show");
  return (
    <div className="flex xl:m-0 mt-5  md xl:h-screen h-full items-center">
      <section class="w-full bg-white rounded-lg  md:mt-0 sm:max-w-screen-md  m-10">
        <div>
          {/* --top-- */}
          <div>
            <h2 className="text-5xl text-start text-green-600">BlahBlah,</h2>
            <h2 className="text-5xl text-green-600">Welcome Back</h2>
            <p className="text-sm text-slate-700">
              Hey, welcome back to your special place
            </p>
          </div>
          {/* --middle--  */}
          <form>
            <div class=" my-7">
              <div class="relative">
                <input
                  type="text"
                  id="default-search"
                  class="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg my-3 focus:outline-none"
                  placeholder="Enter Your Name...."
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div class="relative">
                <input
                  type={showPasswordicon === "show" ? "password" : "text"}
                  id="default-search"
                  class="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg  focus:outline-none"
                  placeholder="Enter Your Password...."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  class="absolute end-2.5 bottom-2.5 text-slate-700"
                  onClick={
                    showPasswordicon === "show"
                      ? () => hidePasswordicon("notshow")
                      : () => hidePasswordicon("show")
                  }
                >
                  {showPasswordicon === "show" ? (
                    <FaRegEye className="color-slate-700" />
                  ) : (
                    <FaRegEyeSlash className="color-slate-700" />
                  )}
                </button>
              </div>
              {state === "signup" && (
                <div class="relative">
                  <input
                    type={showPasswordicon === "show" ? "password" : "text"}
                    id="default-search"
                    class="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg  focus:outline-none mt-3"
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    class="absolute end-2.5 bottom-2.5 text-slate-700"
                    onClick={
                      showPasswordicon === "show"
                        ? () => hidePasswordicon("notshow")
                        : () => hidePasswordicon("show")
                    }
                  >
                    {showPasswordicon === "show" ? (
                      <FaRegEye className="color-slate-700" />
                    ) : (
                      <FaRegEyeSlash className="color-slate-700" />
                    )}
                  </button>
                </div>
              )}
              {state === "signup" && (
                <div class="relative">
                  <input
                    type="file"
                    id="default-search"
                    class="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg  focus:outline-none mt-3"
                    required
                    value={pic}
                    onChange={(e) => setPic(e.target.value)}
                  />
                  <div
                    type="submit"
                    class="absolute end-2.5 bottom-2.5 text-sm font-normal text-slate-700"
                  >
                    Choose Profile Picture
                  </div>
                </div>
              )}
            </div>
            {state === "login" ? (
              <span className="bg-green-600 text-white p-2 px-4 rounded-md cursor-pointer">
                Login
              </span>
            ) : (
              <span className="bg-green-600 text-white p-2 px-4 rounded-md cursor-pointer">
                SignUp
              </span>
            )}
          </form>
          {/* {--bottom--} */}
          <div className="mt-5">
            {state === "login" ? (
              <p className="text-slate-700 text-sm">
                Don't have an account?{" "}
                <span
                  className="font-bold cursor-pointer text-green-600"
                  onClick={() => {
                    setState("signup");
                  }}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p className="text-slate-700 text-sm">
                Don't have an account?{" "}
                <span
                  className="font-bold cursor-pointer text-green-600"
                  onClick={() => {
                    setState("login");
                  }}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
