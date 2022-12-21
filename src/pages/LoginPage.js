import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"

function LoginPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm()
  const { token } = useSelector((state) => state.auth)
  const { loginError } = useSelector((state) => state.auth)
  
  const submitForm = (data) => {
    dispatch(authenticateUser(data))
    console.log(token)
  }

  useEffect(() => {
    if(token){
      navigate('/profile')
    }
}, [navigate, token, ])

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" id="username" {...register('email')} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" {...register('password')} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type='submit'>Sign In</button>
            { (loginError) && (<div className='login-error'>{loginError}</div>) }
          </form>
        </section>
      </main>
    </>
  );
}

export default LoginPage