import { useState } from 'react'
import '../Auth.Style.scss'
import axios from 'axios'
import GoogleIcon from '@mui/icons-material/Google'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

function SignUp() {
  const [requestError, setRequestError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()

  const schema = z
    .object({
      username: z.string().min(2, { message: 'Please enter a valid name.' }),
      email: z.string().email({ message: 'Please enter a valid email.' }),
      password: z.string().min(6, { message: 'Password is too short.' }),
      confirmPassword: z.string().min(6, { message: 'Password is too short.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords don\'t match',
      path: ['confirmPassword'],
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const API_URL = `${import.meta.env.VITE_APP_URL_API}/auth/local/register`
  const HEADERS = {
    'Content-Type': 'application/json',
  }

  const postUser = async (data) => {
    try {
      const response = await axios.post(API_URL, data, {
        headers: HEADERS,
      })

      if (response.status !== 200) {
        toast.error(`Error: ${response.status}`)
      }

      console.log(response.data)
    } catch (error) {
      setRequestError(error.response?.data?.error?.message)
      return
    }

    try {
      if (rememberMe) {
        localStorage.setItem(
          'UserLoginInfo',
          JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
          })
        )
      }

      navigate('/login')
    } catch (error) {
      console.error('Failed to navigate or save data', error)
    }
  }

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
            {requestError && <p className="errorMessage">{requestError}</p>}
            <form onSubmit={handleSubmit(postUser)}>
              <input
                {...register('username')}
                type="text"
                placeholder="Username"
              />
              {errors.username && (
                <p className="errorMessage">{errors.username.message}</p>
              )}

              <input {...register('email')} type="email" placeholder="Email" />
              {errors.email && (
                <p className="errorMessage">{errors.email.message}</p>
              )}

              <input
                {...register('password')}
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <p className="errorMessage">{errors.password.message}</p>
              )}

              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="errorMessage">{errors.confirmPassword.message}</p>
              )}
              <div className="rememberMe">
                <label htmlFor="rememberMe" className="rememberMeLabel">
                  Remember Me
                </label>
                <input
                  className="rememberMeInput"
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </div>
              <button type="submit">SIGNUP</button>
            </form>

            <p className="formLinks">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
