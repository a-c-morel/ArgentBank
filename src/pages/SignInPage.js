import React from 'react'
import argentBankLogo from "../assets/argentBankLogo.png"

function SignInPage() {
  return (
    <>
      <nav className="main-nav">
      <div className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </div>
      <div>
        <div className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </div>
      </div>
    </nav>
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label for="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label for="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          {/**PLACEHOLDER DUE TO STATIC SITE**/}
          <div className="sign-in-button">Sign In</div>
          {/**SHOULD BE THE BUTTON BELOW**/}
          {/**<button className="sign-in-button">Sign In</button>**/}
          {/****/}
        </form>
      </section>
    </main>
    </>
  );
}

export default SignInPage
