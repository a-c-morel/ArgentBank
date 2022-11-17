import React from 'react'
import FeatureItem from '../components/FeatureItem'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function HomePage() {
  return (
    <>
      <Navbar page="HomePage" />
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem feature="chat" />
          <FeatureItem feature="money" />
          <FeatureItem feature="security" />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage