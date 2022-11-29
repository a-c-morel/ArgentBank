import React from 'react' //, { useEffect, useState }
//import { useSelector } from 'react-redux'
import AccountContent from '../components/AccountContent'
//import Navbar from '../components/Navbar'

function ProfilePage() {

  /*const auth = useSelector(state => state.auth)
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(auth.token)
  }, [auth.token])*/

  return (
    <>
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
    </>
  )
}

export default ProfilePage
