import React from 'react'
import AccountContent from '../components/AccountContent';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import UserHeader from '../components/UserHeader';

function UserPage() {
  return (
    <>
      <Navbar page="UserPage" />
      <main className="main bg-dark">
        <UserHeader name="Tony Jarvis"/>
        <h2 className="sr-only">Accounts</h2>
        <AccountContent accountType="checking" />
        <AccountContent accountType="savings" />
        <AccountContent accountType="creditCard" />
      </main>
      <Footer />
    </>
  );
}

export default UserPage
