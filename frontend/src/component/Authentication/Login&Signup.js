import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordIcon, setShowPasswordIcon] = useState(true);
  const navigate = useNavigate();
  const submitHandlerSignup = async () => {
    setLoading(true);
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
      setLoading(false);
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
    <div className="flex xl:m-0 mt-5 xl:h-screen h-full items-center">
      <section className="w-full bg-white rounded-lg md:mt-0 sm:max-w-screen-md m-10">
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
            <div className="my-7">
              <div className="relative">
                <input
                  type="text"
                  id="default-search"
                  className="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg my-3 focus:outline-none"
                  placeholder="Enter Your Name...."
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
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
                      className="block w-full p-2 text-sm font-normal text-gray-900 border border-gray-300 rounded-lg focus:outline-none mt-3"
                      onChange={(e) => postDetails(e.target.files[0])}
                    />
                    <div className="absolute end-2.5 bottom-2.5 text-sm font-normal text-slate-700">
                      Choose Profile Picture
                    </div>
                  </div>
                </>
              )}
            </div>
            {state === "login" ? (
              <span
                className="bg-green-600 text-white p-2 px-4 rounded-md cursor-pointer"
                onClick={submitHandlerlogin}
              >
                Login
              </span>
            ) : loading ? (
              <button
                disabled
                type="button"
                className="bg-green-600 text-white p-2 px-4 rounded-md cursor-pointer"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              <span
                className="bg-green-600 text-white p-2 px-4 rounded-md cursor-pointer"
                isLoading={loading.toString()}
                aria-disabled
                onClick={submitHandlerSignup}
              >
                SignUp
              </span>
            )}
          </form>
          {/* --bottom-- */}
          <div className="mt-5">
            {state === "login" ? (
              <p className="text-slate-700 text-sm">
                Don't have an account?{" "}
                <span
                  className="font-bold cursor-pointer text-green-600"
                  onClick={() => setState("signup")}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p className="text-slate-700 text-sm">
                Already have an account?{" "}
                <span
                  className="font-bold cursor-pointer text-green-600"
                  onClick={() => setState("login")}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Login;
