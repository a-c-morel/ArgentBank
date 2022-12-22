import React from 'react'
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../features/auth/authSlice'
import argentBankLogo from "../assets/argentBankLogo.png"
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'

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
              <FaUserCircle size={18} />
              Sign In
              </Link>
            </div>
          ) : (
            <div className="signout-container">
              <Link to="/profile" className="main-nav-item">
                <FaUserCircle size={18} />
                {`${firstName}`}
              </Link>
              <Link to="/" className="main-nav-item" onClick={() => dispatch(signOut())}>
                <FaSignOutAlt />
                Sign Out
              </Link>
            </div>
          )
        }
      </nav>
  )
}

export default Navbar
