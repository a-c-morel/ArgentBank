import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserName, setPassword } from '../features/user/userSlice'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';

function LoginPage() {

  const selectUser = state => state.user

  const user = useSelector( selectUser )

  const dispatch = useDispatch()

  return (
    <>
      <Navbar page="LoginPage" />
      <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label for="username">Username</label>
            <input type="text" id="username" onChange={(e) => dispatch(setUserName(e.target.value))} />
          </div>
          <div className="input-wrapper">
            <label for="password">Password</label>
            <input type="password" id="password" onChange={(e) => dispatch(setPassword(e.target.value))} />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          {/**PLACEHOLDER DUE TO STATIC SITE**/}
          {/*<Link to="/profile" className="sign-in-button">Sign In</Link>*/}
          {/**SHOULD BE THE BUTTON BELOW**/}
          <button className="sign-in-button" type='submit'>Sign In</button>
          {/****/}
        </form>
      </section>
    </main>
      <Footer />
    </>
  );
}

export default LoginPage

// onSubmit={submitForm}