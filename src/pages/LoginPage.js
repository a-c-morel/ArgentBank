import React, { useState } from 'react' //, useEffect
import { useDispatch } from 'react-redux' //, useSelector
import { loginUser } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"
//import Navbar from '../components/Navbar'

function LoginPage() {

  //const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState(
    {
      email: "",
      password: "",
    }
  )
  /*const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(auth.token)
  }, [auth.token, navigate, token])*/

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    dispatch(loginUser(user)).then(() => {
      navigate('/profile')
    }) 
  }

  return (
    <>
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
    </>
  );
}

export default LoginPage