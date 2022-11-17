import React from 'react'
import AccountContent from '../components/AccountContent';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';

function ProfilePage() {
  return (
    <>
      <Navbar page="ProfilePage" />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />Tony Jarvis!</h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <AccountContent accountType="checking" />
        <AccountContent accountType="savings" />
        <AccountContent accountType="creditCard" />
      </main>
      <Footer />
    </>
  );
}

export default ProfilePage
