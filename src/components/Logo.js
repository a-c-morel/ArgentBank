import React from 'react'
import { Link } from 'react-router-dom'
import argentBankLogo from "../assets/argentBankLogo.png"

function Logo() {
  return (
    <Link to='/' className="main-nav-logo">
        <img
        className="main-nav-logo-image"
        src={argentBankLogo}
        alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
    </Link>
  )
}

export default Logo

