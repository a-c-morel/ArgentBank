import React from 'react'
import {Link} from "react-router-dom"
import argentBankLogo from "../assets/argentBankLogo.png"
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../features/auth/authSlice' 

function Navbar() {

  const { firstName, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
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
                {`${firstName}`}
              </Link>
              <Link to="/" className="main-nav-item" onClick={() => dispatch(signOut())}>
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
