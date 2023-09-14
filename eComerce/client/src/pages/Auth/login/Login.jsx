import { useState, useEffect } from "react";
import "../Auth.Style.scss";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Login() {
  const [requestError, setRequestError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  console.log(user);

  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(6, { message: "Password is too short." }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const API_URL = `${import.meta.env.VITE_APP_URL_API}/auth/local/`;
  const HEADERS = {
    "Content-Type": "application/json",
  };

  const handleLogin = async (data) => {
    const { email, ...restData } = data;
    const requestData = { identifier: email, ...restData };
    try {
      const response = await axios.post(API_URL, requestData, {
        headers: HEADERS,
      });

      if (response.status !== 200) {
        toast.error(`Error: ${response.status}`);
      }

      localStorage.setItem("UserData", JSON.stringify(response.data.user));
      localStorage.setItem("UserJWT", JSON.stringify(response.data.jwt));
    } catch (error) {
      toast.error(`Error: ${error}`);
      console.log(error.response?.data?.error?.message);
      setRequestError(error.response?.data?.error?.message);
      return; // Stop execution if error
    }

    try {
      // if (rememberMe) {
      //   localStorage.setItem("User", JSON.stringify(data));
      // } else {
      //   localStorage.removeItem("User");
      // }

      navigate("/");
    } catch (error) {
      console.error("Failed to navigate or save data", error);
    }
  };

  useEffect(() => {
    localStorage.getItem("User") &&
      setUser(JSON.parse(localStorage.getItem("User")));
  }, []);

  return (
    <div className="authContainer">
      <div className="innerContainer">
        <div className="left">
          <div className="content">
            <h1>WELCOME TO KADIROV</h1>
            <p>
              We&apos;re thrilled to have you here. Get ready to discover an
              extraordinary collection of the latest trends and timeless
              classics.
            </p>

            <div className="social">
              <GoogleIcon className="socialIcon" alt="Google Icon" />
              <InstagramIcon className="socialIcon" alt="Instagram Icon" />
              <TwitterIcon className="socialIcon" alt="Twiiter Icon" />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="formContainer">
            <h1>LOGIN</h1>
            {requestError && (
              <p className="errorMessage">
                {requestError.replace("identifier", "email")}
              </p>
            )}
            <form onSubmit={handleSubmit(handleLogin)}>
              <input {...register("email")} type="email" placeholder="Email" />
              {errors.email && (
                <p className="errorMessage">{errors.email.message}</p>
              )}

              <input
                {...register("password")}
                type="password"
                placeholder="Password"
              />

              {errors.password && (
                <p className="errorMessage">{errors.password.message}</p>
              )}
              <div className="rememberMe">
                <label htmlFor="rememberMe" className="rememberMeLabel">
                  Remember Me
                </label>
                <input
                  className="rememberMeInput"
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                />
              </div>
              <button type="submit">LOGIN</button>
            </form>
            <a className="formLinks" href="#">
              Forgot Password?
            </a>
            <p className="formLinks">
              Don&apos;t have an account? <a href="/signup">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
