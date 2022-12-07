import React, { useEffect, useState } from 'react' 
import {Link} from "react-router-dom"
import argentBankLogo from "../assets/argentBankLogo.png"
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../features/auth/authSlice'

function Navbar() {

  const { firstName, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    if(token !== null) {
      dispatch(getUserData()).then((response) => {
        console.log(response)
        console.log("Navbar:", firstName)
        setUserName(firstName)
      })
    }
  }, [token, dispatch, firstName])
  
  return  (
    <nav className="main-nav">
        <Link to='/' className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        {
          (token === null) ? (
            <div>
              <Link to="/login" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              Sign In
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/user" className="main-nav-item">
                <i className="fa fa-user-circle"></i>
                {`${userName}`}
              </Link>
              <Link to="/" className="main-nav-item">
                <i className="fa fa-sign-out"></i>
                Sign Out
              </Link>
            </div>
          )
        }
      </nav>
  )
}

export default Navbar
