import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
export function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('UserJWT')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [navigate, token])

  return token ? children : null
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export function GuestRoute({ children }) {
  const navigate = useNavigate()
  const token = localStorage.getItem('UserJWT')

  useEffect(() => {
    if (token) {
      navigate('/profile')
    }
  }, [navigate, token])

  return !token ? children : null
}

GuestRoute.propTypes = {
  children: PropTypes.node
}
