import { useState } from "react";
import "./UserProfile.scss";
import Modal from "@/components/Modal/Modal";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

function UserProfile() {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changeAvatarOpen, setChangeAvatarOpen] = useState(false);

  const handleCloseEditProfile = () => {
    setEditProfileOpen(false);
  };

  const handleOpenEditProfile = () => {
    setEditProfileOpen(true);
  };

  const handleCloseChangeAvatar = () => {
    setChangeAvatarOpen(false);
  };

  const handleOpenChangeAvatar = () => {
    setChangeAvatarOpen(true);
  };

  return (
    <div className="profileContainer">
      <div className="profile">
        <div className="edit">
          <button className="edditBTN" onClick={handleOpenEditProfile}>
            Edit
          </button>
          <Modal open={editProfileOpen} onClose={handleCloseEditProfile}>
            <div className="editProfile">
              <h1 className="editProfileTitle">Edit Profile</h1>
              <form className="editProfileForm">
                <div>
                  <label>Name:</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div>
                  <label>Email:</label>
                  <input type="email" placeholder="email" />
                </div>
                <div>
                  <label>Phone:</label>
                  <input type="text" placeholder="Phone" />
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <div className="profileImage">
          <div className="imageWrapper">
            <img
              src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
              alt="User avatar"
            />
          </div>
          <div>
            <button className="changeAvatar" onClick={handleOpenChangeAvatar}>
              <ChangeCircleIcon />
            </button>
            <Modal open={changeAvatarOpen} onClose={handleCloseChangeAvatar}>
              <div className="editProfile">
                <div className="editProfileForm">
                  <h1 className="editProfileTitle">Change Avatar</h1>
                  <form>
                    <div className="editProfileFormName">
                      <label>Avatar</label>
                      <input type="file" />
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="profileInfo">
          <div className="profileName">Name: John Doe</div>
          <div className="profileEmail">Email: teest@gmail.com</div>
          <div className="profilePhone">Phone: 123456789</div>
          <div className="createdAt">Created At: 2021-07-14T11:25:00.000Z</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
