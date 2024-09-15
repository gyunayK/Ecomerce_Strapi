import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import Link from '@mui/material/Link'
import PropTypes from 'prop-types'

UserMenu.propTypes = {
  idSuffix: PropTypes.string
}

export default function UserMenu({ idSuffix }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  const handleLogOut = () => {
    window.location.replace('/')
    localStorage.removeItem('UserData')
    localStorage.removeItem('UserJWT')
    setUser(null)
    handleClose()
  }

  useEffect(() => {
    setUser(
      localStorage.getItem('UserData') && localStorage.getItem('UserJWT')
    )
  }, [])

  return (
    <div>
      <Button
        id={`basic-button-${idSuffix}`}
        aria-controls={menuOpen ? `userMenuButton-${idSuffix}` : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        aria-label="user menu"
      >
        <PersonOutlineOutlinedIcon />
      </Button>
      <Menu
        id={`userMenuButton-${idSuffix}`}
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `basic-button-${idSuffix}`,
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/profile" underline="none" color={'inherit'}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          {user ? (
            <Button
              id="logOutButton"
              onClick={handleLogOut}
              color="inherit"
              sx={{
                padding: '10px 30px 5px 0',
                margin: '-5px 0 -10px 0',
                height: '100%',
                fontSize: 'inherit',
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                textTransform: 'inherit',
                letterSpacing: 'inherit',
                lineHeight: 'inherit',
                textAlign: 'inherit',
              }}
            >
              Log out
            </Button>
          ) : (
            <Link
              href="/login"
              underline="none"
              color={'inherit'}
              width={'100%'}
              height={'100%'}
            >
              Log in
            </Link>
          )}
        </MenuItem>
      </Menu>
    </div>
  )
}
