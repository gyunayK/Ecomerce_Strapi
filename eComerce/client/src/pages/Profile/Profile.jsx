import { useState } from "react";
import "./Profile.scss";
import Order from "@/components/Order/Order";
import WishList from "@/components/WishList/WishList";
import UserProfile from "@/components/UserProfile/UserProfile";

export default function Profile() {
  const [currentView, setCurrentView] = useState("Profile");
  const handleChangeComponent = (view) => {
    setCurrentView(view);
  };
  const renderComponent = () => {
    switch (currentView) {
      case "Profile":
        return <UserProfile />;
      case "Wishlist":
        return <WishList />;
      case "Orders":
        return <Order />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="odersContainer">
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
                handleChangeComponent("Wishlist");
              }}
            >
              Wishlist
            </li>
            <li
              onClick={() => {
                handleChangeComponent("Orders");
              }}
            >
              Oders
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
