import { useState, useEffect } from "react";
import "./Profile.scss";
import Order from "@/components/Order/Order";
import WishList from "@/components/WishList/WishList";
import UserProfile from "@/components/UserProfile/UserProfile";
import axios from "axios";

export default function Profile() {
  const [currentView, setCurrentView] = useState("Profile");

  const [user, setUser] = useState({});
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const api = import.meta.env.VITE_APP_URL_API;
  const userJWT = JSON.parse(localStorage.getItem("UserJWT"));

  const handleChangeComponent = (view) => {
    setCurrentView(view);
  };

  const handleUserUpdate = () => {
    setIsUserUpdated(!isUserUpdated);
  };

  const renderComponent = () => {
    switch (currentView) {
      case "Profile":
        return (
          <UserProfile
            user={user}
            userJWT={userJWT}
            handleUserUpdate={handleUserUpdate}
          />
        );

      case "Orders":
        return (
          <Order
            user={user}
            userJWT={userJWT}
            handleUserUpdate={handleUserUpdate}
          />
        );
      default:
        return <UserProfile />;
    }
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await axios.get(`${api}/users/me?populate=*`, {
          headers: {
            Authorization: `Bearer ${userJWT}`,
          },
        });

        setUser(res.data);
        setIsUserUpdated(false);
      } catch (err) {
        console.log(err);
      }
    };

    getProfileData();
  }, [userJWT, api, isUserUpdated]);

  return (
    <div className="profileWrapper">
      <div className="userNavContainer">
        <nav className="userNavLeft">
          <ul>
            <li
              onClick={() => {
                handleChangeComponent("Profile");
              }}
            >
              Profile
            </li>
            <li
              onClick={() => {
                handleChangeComponent("Orders");
              }}
            >
              Orders
            </li>
          </ul>
        </nav>
      </div>
      <div className="renderedCompContainer">
        <div className="renderedComp">{renderComponent()}</div>
      </div>
    </div>
  );
}
