import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountContent from '../components/AccountContent'
import { getUserData } from '../features/auth/authSlice'
//import { updateUserName } from '../features/user/userSlice'
import { useForm } from 'react-hook-form'
import { updateUserName } from '../features/user/userSlice'

function ProfilePage() {

  const firstName = useSelector((state) => state.auth.firstName)
  const lastName = useSelector((state) => state.auth.lastName)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: ""
  })
  //const [newFirstName, setNewFirstName] = useState("")
  //const [newLastName, setNewLastName] = useState("")
  const [editInputsDisplayed, setEditInputsDisplayed] = useState(false)

  const showEditInputs = () => {
    setEditInputsDisplayed(true)
  }

  /*const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserName(newFirstName, newLastName))
  }*/

  const submitForm = (data) => {
    console.log(data)
    dispatch(updateUserName(data)).then((response) => {
      console.log(response)
    })
  }

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
          { editInputsDisplayed ?
            (
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="">
                  <input type="text" id="firstname" placeholder={userName.firstName} {...register('firstname')} />
                </div>
                <div className="">
                  <input type="text" id="lastname" placeholder={userName.lastName} {...register('lastname')} />
                </div>
                <button className="edit-name-button" type='submit'>Save</button>
                <button className="edit-name-button" onClick={ () => setEditInputsDisplayed(false) } >Cancel</button>
              </form>
            ) :
            (
              <button className="edit-button" onClick={showEditInputs}>Edit Name</button>
            )
          }
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