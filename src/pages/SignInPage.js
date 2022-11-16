import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import SignInModal from '../components/SignInModal';

function SignInPage() {
  return (
    <>
      <Navbar page="SignInPage" />
      <SignInModal />
      <Footer />
    </>
  );
}

export default SignInPage
