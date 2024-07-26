import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(true);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const navigate = useNavigate();
  const submitHandlerSignup = async () => {
    setSignUpLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.warn("Please fill all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setSignUpLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast.success("Registration Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setState("login");
    } catch (error) {
      toast.error(`Error: ${error.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
    }
  };
  const submitHandlerlogin = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.warn("Please fill all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        config
      );
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
      setLoading(false);
    } catch (error) {
      toast.error(`Error: ${error.response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
    }
  };

  const postDetails = async (pics) => {
    setLoading(true);
    if (!pics) {
      toast.error("Please select an image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mernchatapp");
      data.append("cloud_name", "dxzu6oq4p");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dxzu6oq4p/image/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const result = await res.json();
        if (result.secure_url) {
          setPic(result.secure_url);
          toast.success("Image uploaded successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          throw new Error(result.error.message);
        }
      } catch (error) {
        toast.error(`Failed to upload image: ${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.warn("Please select a JPEG or PNG image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex  overflow-y-auto h-screen justify-center items-center  sm:m-0 m-2 drop-shadow-xl ">
      <motion.section
        className="w-full bg-white rounded-lg  sm:max-w-72"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="rounded-md p-4 flex flex-col items-center">
          {/* --top-- */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl  text-slate-900">ChitChat,</h2>
            <h2 className="text-xl text-slate-900">Welcome Back</h2>
            <p className="text-sm text-slate-700">
              Hey, welcome back to your special place
            </p>
          </div>
          {/* --middle--  */}
          <form className="w-full">
            {/* --all inputs--  */}
            <div className=" mb-4  update_group_scroll ">
              <div className="overflow-auto max-h-36 h-full pr-2">
                <div className="w-full">
                  <div className="relative">
                    {state === "signup" && (
                      <input
                        type="text"
                        id="default-search"
                        className="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg my-2 focus:outline-none"
                        placeholder="Enter Your Name...."
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                      />
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="default-search"
                      className="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg my-3 focus:outline-none"
                      placeholder="Enter Your Email...."
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPasswordIcon ? "password" : "text"}
                      id="default-search"
                      className="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
                      placeholder="Enter Your Password...."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute end-2.5 bottom-2.5 text-slate-700"
                      onClick={() => setShowPasswordIcon(!showPasswordIcon)}
                    >
                      {showPasswordIcon ? (
                        <FaRegEye className="color-slate-700" />
                      ) : (
                        <FaRegEyeSlash className="color-slate-700" />
                      )}
                    </button>
                  </div>
                  {state === "signup" && (
                    <>
                      <div className="relative">
                        <input
                          type={showPasswordIcon ? "password" : "text"}
                          id="default-search"
                          className="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg focus:outline-none mt-3"
                          placeholder="Confirm Your Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          className="absolute end-2.5 bottom-2.5 text-slate-700"
                          onClick={() => setShowPasswordIcon(!showPasswordIcon)}
                        >
                          {showPasswordIcon ? (
                            <FaRegEye className="color-slate-700" />
                          ) : (
                            <FaRegEyeSlash className="color-slate-700" />
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type="file"
                          id="default-search"
                          className="block w-full  text-sm font-normal text-gray-900 border border-gray-300 rounded-lg focus:outline-none mt-3"
                          onChange={(e) => postDetails(e.target.files[0])}
                        />
                        <div className="absolute end-2.5 bottom-2.5 text-sm font-normal text-slate-700">
                          Choose Profile Picture
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* --all inputs end-- */}
            {/* --login and signup button--  */}
            <div className="mt-2">
              {state === "login" ? (
                <button
                  className={`bg-slate-900 text-white p-2 px-4 rounded-md cursor-pointer ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={submitHandlerlogin}
                >
                  {loading ? "Loading" : "Login"}
                </button>
              ) : (
                <button
                  className={`bg-slate-900 text-white p-2 px-4 rounded-md cursor-pointer ${
                    signUpLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  isLoading={loading.toString()}
                  aria-disabled
                  onClick={submitHandlerSignup}
                >
                  {signUpLoading ? "Loading" : "SignUp"}
                </button>
              )}
            </div>
            {/* ---login and signup button end--  */}
          </form>
          {/* --bottom-- */}
          <div className="mt-5">
            {state === "login" ? (
              <p className="text-slate-700 text-sm">
                Don't have an account?{" "}
                <span
                  className="font-bold cursor-pointer text-slate-900 drop-shadow bg-slate-100 p-1 rounded-md"
                  onClick={() => setState("signup")}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p className="text-slate-700 text-sm">
                Already have an account?{" "}
                <span
                  className="font-bold cursor-pointer text-slate-900 bg-slate-100 drop-shadow p-1 rounded-md"
                  onClick={() => setState("login")}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </motion.section>
      <ToastContainer />
    </div>
  );
};

export default Login;
