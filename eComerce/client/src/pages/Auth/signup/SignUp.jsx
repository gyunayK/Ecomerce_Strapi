import React from "react";
import "../Auth.Style.scss";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function SignUp() {
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
            <h1>SIGNUP</h1>
            <form>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="password" placeholder="Confirm Password" required />
              <button type="submit">SIGNUP</button>
            </form>
            <a href="#">Forgot Password?</a>
            <a href="/login">Already have an account? LOGIN</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
