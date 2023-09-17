import { useState } from "react";
import "./UserProfile.scss";
import Modal from "@/components/Modal/Modal";

function UserProfile() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="profileContainer">
      <div className="profile">
        <div className="edit">
          <button onClick={handleOpen}>Edit</button>
          <Modal open={open} onClose={handleClose}>
            <div className="editProfile">
              <div className="editProfileTitle">Edit Profile</div>
              <div className="editProfileForm">
                <form>
                  <div className="editProfileFormName">
                    <label>Name</label>
                    <input type="text" placeholder="John Doe" />
                  </div>
                  <div className="editProfileFormEmail">
                    <label>Email</label>
                    <input type="email" placeholder="email" />
                  </div>
                  <div className="editProfileFormPhone">
                    <label>Phone</label>
                    <input type="text" placeholder="Phone" />
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>
        <div className="profileImage">
          <img src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" />
        </div>
        <div className="profileInfo">
          <div className="profileName">Name: John Doe</div>
          <div className="profileEmail">
            Email:<a>teest@gmail.com</a>
          </div>
          <div className="profilePhone">Phone: 123456789</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
