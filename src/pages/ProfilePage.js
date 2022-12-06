import React, { useEffect, useState } from 'react' //, { useEffect, useState }
import { useDispatch, useSelector } from 'react-redux'
import AccountContent from '../components/AccountContent'
import { getUserData } from '../features/auth/authSlice'

function ProfilePage() {

  const firstName = useSelector((state) => state.auth.firstName)
  const lastName = useSelector((state) => state.auth.lastName)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState({
    firstName: null,
    lastName: null
  })

  useEffect(() => {
    dispatch(getUserData()).then((response) => {
      console.log(response)
      console.log(firstName, lastName)
      setUserName({
        firstName: firstName,
        lastName: lastName
      })
    })
  }, [dispatch, firstName, lastName])

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{`${userName.firstName} ${userName.lastName}`}</h1>
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