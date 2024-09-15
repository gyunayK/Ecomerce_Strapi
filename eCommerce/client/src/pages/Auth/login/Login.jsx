import { useState, useEffect } from 'react'
import '../Auth.Style.scss'
import GoogleIcon from '@mui/icons-material/Google'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'

import { toast } from 'react-toastify'
import axios from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [requestError, setRequestError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [savedUser, setSavedUser] = useState({})

  const navigate = useNavigate()
  console.log(JSON.parse(localStorage.getItem('UserLoginInfo')))

  const schema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(6, { message: 'Password is too short.' })
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  })

  const API_URL = `${import.meta.env.VITE_APP_URL_API}/auth/local/`
  const HEADERS = {
    'Content-Type': 'application/json'
  }

  const handleDemoLogin = () => {
    handleLogin({
      email: 'demo@hoge.ca',
      password: '123123123'
    })
  }

  const handleLogin = async (data = { email, password }) => {
    const { email: emailFromData, ...restData } = data
    const requestData = { identifier: emailFromData, ...restData }
    try {
      const response = await axios.post(API_URL, requestData, {
        headers: HEADERS
      })

      if (response.status !== 200) {
        toast.error(`Error: ${response.status}`)
      }

      localStorage.setItem('UserData', JSON.stringify(response.data.user))
      localStorage.setItem('UserJWT', JSON.stringify(response.data.jwt))
      if (rememberMe) {
        localStorage.setItem(
          'UserLoginInfo',
          JSON.stringify({
            email: email,
            password: data.password
          })
        )
      }
      navigate('/')
    } catch (error) {
      setRequestError(error.response?.data?.error?.message)
      return
    }
  }

  useEffect(() => {
    if (savedUser.email) {
      setEmail(savedUser.email)
      setValue('email', savedUser.email)
    }
    if (savedUser.password) {
      setPassword(savedUser.password)
      setValue('password', savedUser.password)
    }
  }, [savedUser, setValue])

  useEffect(() => {
    const savedUserInfo = JSON.parse(localStorage.getItem('UserLoginInfo'))

    if (savedUserInfo) {
      setEmail(savedUserInfo.email)
      setPassword(savedUserInfo.password)
      setSavedUser(savedUserInfo)
      setRememberMe(true)
    }

    if (rememberMe === false) {
      localStorage.removeItem('UserLoginInfo')
      setEmail('')
      setPassword('')
    }
  }, [rememberMe])

  return (
    <div className="authContainer">
      <div className="innerContainer">
        <div className="left">
          <div className="content">
            <h1>WELCOME TO KADIROV</h1>
            <p>
              We&apos;re thrilled to have you here. Get ready to discover an extraordinary collection of the
              latest trends and timeless classics.
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
            {requestError && <p className="errorMessage">{requestError.replace('identifier', 'email')}</p>}
            <form onSubmit={handleSubmit(handleLogin)}>
              <input
                {...register('email')}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="errorMessage">{errors.email.message}</p>}
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="errorMessage">{errors.password.message}</p>}
              <div className="rememberMe">
                <label htmlFor="rememberMe" className="rememberMeLabel">
                  Remember Me
                </label>
                <input
                  className="rememberMeInput"
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </div>
              <button type="submit">LOGIN</button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleDemoLogin()
                }}
              >
                DEMO LOGIN
              </button>
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
  )
}
