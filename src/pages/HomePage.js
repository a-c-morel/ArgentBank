import React from 'react' //, { useEffect, useState }
//import { useSelector } from 'react-redux';
import FeatureItem from '../components/FeatureItem'
//import Navbar from '../components/Navbar';

function HomePage() {

  /*const auth = useSelector(state => state.auth)
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(auth.token)
  }, [auth.token])*/

  return (
    <>
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
    </>
  );
}

export default HomePage