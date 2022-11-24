import React, { useState } from 'react'
import { useDispatch } from 'react-redux' //, useSelector
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { loginUser } from '../features/auth/authSlice' //, setEmail, setPassword

function LoginPage() {

  const dispatch = useDispatch()
  /*const auth = useSelector((state) => state.auth)

  const email = auth.email
  console.log("email:", email)

  const password = auth.password
  console.log("password:", password)

  const token = auth.token
  console.log("token:", token)*/

  const [user, setUser] = useState(
    {
      email: "",
      password: "",
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    dispatch(loginUser(user));
  }

  //const [email, setEmail] = useState("")
  //const [password, setPassword] = useState("")

  /*const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(email, password))
    console.log("myToken: ", token)
  }*/

  return (
    <>
      <Navbar page="LoginPage" />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type='submit'>Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default LoginPage