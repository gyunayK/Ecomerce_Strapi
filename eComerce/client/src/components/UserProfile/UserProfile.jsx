import { useState } from "react";
import "./UserProfile.scss";
import Modal from "@/components/Modal/Modal";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { toast } from "react-toastify";

function UserProfile({ user, userJWT }) {
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changeAvatarOpen, setChangeAvatarOpen] = useState(false);
  const [file, setFile] = useState(null);

  const imgURL = import.meta.env.VITE_APP_UPLOAD_URL;
  const api = import.meta.env.VITE_APP_URL_API;

  console.log(user);

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

  const handleFileChange = ({ target: { files } }) => {
    if (files?.length) {
      const { type } = files[0];

      if (type === "image/jpeg" || type === "image/png") {
        setFile(files[0]);
      } else {
        toast.error("Accept only jpeg or png files are allowed");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image");
      return;
    }

    try {
      const files = new FormData();
      files.append("files", file);
      files.append("ref", "user");
      files.append("refId", user.id);
      files.append("field", "profile_IMG");

      const res = await axios.post(`${api}/upload`, files, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userJWT}`,
        },
      });

      console.log(res);
      if (res.data && res.data.length > 0) {
        toast.success("Image uploaded successfully");
      }

      setFile(null);
      console.log(res);
    } catch (error) {
      console.log({ error });
      toast.error("An error occurred while uploading the image.");
    }
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
            {user.profile_IMG?.url ? (
              <img
                src={imgURL + user.profile_IMG?.url}
                alt={user.profile_IMG?.name}
              />
            ) : (
              <PersonIcon color="primary" className="personIcon" />
            )}
          </div>
          <div>
            <button className="changeAvatar" onClick={handleOpenChangeAvatar}>
              <ChangeCircleIcon />
            </button>
            <Modal open={changeAvatarOpen} onClose={handleCloseChangeAvatar}>
              <div className="editProfile">
                <div className="editProfileForm">
                  <h1 className="editProfileTitle">Change Avatar</h1>
                  <form className="editProfileFormName" onSubmit={handleSubmit}>
                    <label>Avatar:</label>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit">UPLOAD</button>
                  </form>
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div className="profileInfo">
          <div className="profileName"> {user.username}</div>
          <div className="profileEmail">{user.email}</div>
          <div className="profilePhone"> N/A</div>
          <div className="createdAt">
            Created At: {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
