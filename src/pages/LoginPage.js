import React, { useEffect } from 'react' //, useState
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"

function LoginPage() {

  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth)

  useEffect(() => {
      if((localStorage.getItem('token')) !== null){
        navigate('/profile')
      }
  }, [navigate, dispatch, token])

  const submitForm = (data) => {
    dispatch(loginUser(data)).then(() => {
      window.location.reload()
    })
  }

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(submitForm)}>
          {/*error && <Error>{error}</Error>*/}
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
          </form>
        </section>
      </main>
    </>
  );
}

export default LoginPage