import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountContent from '../components/AccountContent'
//import { authenticateUser } from '../features/auth/authSlice'
import { useForm } from 'react-hook-form'
import { updateUserName } from '../features/user/userSlice'

function ProfilePage() {

  const { firstName } = useSelector((state) => state.auth)
  const { lastName } = useSelector((state) => state.auth)
  
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [editInputsDisplayed, setEditInputsDisplayed] = useState(false)

  const showEditInputs = () => {
    setEditInputsDisplayed(true)
  }


  /*Idée = utiliser la fonction du service "getUserData(token)", comme ça ça résout le message d'erreur qui dit que ça demande un email ? */

  /*const getUserName = () => {
    dispatch(authenticateUser()).then((response) => {
      console.log(response)
    })
  }*/

  const submitForm = (data) => {
    console.log(data)
    dispatch(updateUserName(data)).then((response) => {
      console.log(response)
      setEditInputsDisplayed(false)
      //getUserName()
    })
  }

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{`${firstName} ${lastName}`}</h1>
          { editInputsDisplayed ?
            (
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="">
                  <input type="text" id="firstname" placeholder={firstName} {...register('firstname')} />
                </div>
                <div className="">
                  <input type="text" id="lastname" placeholder={lastName} {...register('lastname')} />
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