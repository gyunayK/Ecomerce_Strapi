import './UserProfile.scss'
import { useState, useEffect } from 'react'
import Modal from '@/components/Modal/Modal'
import PropTypes from 'prop-types'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import PersonIcon from '@mui/icons-material/Person'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '@/components/Loading/Loading'

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  userJWT: PropTypes.string.isRequired,
  handleUserUpdate: PropTypes.func.isRequired,
}

export default function UserProfile({ user, userJWT, handleUserUpdate }) {
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [changeAvatarOpen, setChangeAvatarOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  const api = import.meta.env.VITE_APP_URL_API

  const handleCloseEditProfile = () => {
    setEditProfileOpen(false)
  }

  const handleOpenEditProfile = () => {
    setEditProfileOpen(true)
  }

  const handleCloseChangeAvatar = () => {
    setChangeAvatarOpen(false)
  }

  const handleOpenChangeAvatar = () => {
    setChangeAvatarOpen(true)
  }

  const handleFileChange = ({ target: { files } }) => {
    if (files?.length) {
      const { type } = files[0]

      if (type === 'image/jpeg' || type === 'image/png') {
        setFile(files[0])
      } else {
        toast.error('Only \'jpeg\' or \'png\' files are allowed')
      }
    }
  }

  const handleSubmitImage = async (e) => {
    e.preventDefault()
    if (!file) {
      toast.error('Please select an image')
      return
    }

    try {
      const files = new FormData()
      files.append('ref', 'plugin::users-permissions.user')
      files.append('refId', user.id)
      files.append('field', 'profile_IMG')
      files.append('files', file)

      const res = await axios.post(`${api}/upload`, files, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userJWT}`,
        },
      })

      if (res.data && res.data.length > 0) {
        toast.success('Image uploaded successfully')
      }

      handleUserUpdate()
      handleCloseChangeAvatar()
      setFile(null)
    } catch (error) {
      toast.error('An error occurred while uploading the image.')
    }
  }

  const handleUpdateInfo = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(
        `${api}/users/${user.id}`,
        { username: name, email, phoneNumber: phone },
        {
          headers: {
            Authorization: `Bearer ${userJWT}`,
          },
        }
      )

      if (res.data) {
        toast.success('User updated successfully')
        handleUserUpdate()
        handleCloseEditProfile()
      }
    } catch (error) {
      toast.error('An error occurred while updating the user.')
    }
  }

  useEffect(() => {
    if (user.email) setEmail(user.email)
    if (user.phoneNumber) setPhone(user.phoneNumber)
    if (user.username) setName(user.username)
  }, [user])

  if(!user.createdAt) return <Loading/>

  return (
    <div className="profileContainer">
      <div className="profile">
        <div className="edit">
          <button className="edditBTN" onClick={handleOpenEditProfile}>
            Edit
          </button>
          <Modal open={editProfileOpen} onClose={handleCloseEditProfile}>
            <div className="editProfile">
              <h1>Edit Profile</h1>
              <form className="editProfileForm" onSubmit={handleUpdateInfo}>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button type="submit">UPDATE</button>
              </form>
            </div>
          </Modal>
        </div>
        <div className="profileImage">
          <div className="imageWrapper">
            {user.profile_IMG?.url ? (
              <img src={user.profile_IMG?.url} alt={user.profile_IMG?.name} />
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
                  <form
                    className="editProfileFormName"
                    onSubmit={handleSubmitImage}
                  >
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
          <div className="profilePhone">Mobile: {user.phoneNumber}</div>
          <div className="createdAt">
            Created At: {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}
