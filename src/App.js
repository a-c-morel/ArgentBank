import React from 'react'
import Footer from './components/Footer';
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <div className="App">
      <HomePage />
      <SignInPage />
      <UserPage />
      <Footer />
    </div>
  );
}

export default App;
