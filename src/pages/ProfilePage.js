import React, { useEffect, useState } from 'react' //, { useEffect, useState }
import { useDispatch, useSelector } from 'react-redux'
import AccountContent from '../components/AccountContent'
import { getUserData } from '../features/auth/authSlice'

function ProfilePage() {

  const { userData } = useSelector((state) => state.auth)
  const [user, setUser] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserData()).then((response) => {
      setUser(response)
    })
  }, [userData, dispatch])

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{(user) ? `${user.firstName} ${user.lastName}` : "You're not logged in"}</h1>
          <button className="edit-button" >Edit Name</button>
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