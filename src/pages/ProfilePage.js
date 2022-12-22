import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountContent from '../components/AccountContent'
import { useForm } from 'react-hook-form'
import { updateUserName } from '../features/auth/authSlice'
import { getUserNewName } from '../features/auth/authSlice'

function ProfilePage() {

  const { firstName } = useSelector((state) => state.auth)
  const { lastName } = useSelector((state) => state.auth)
  const { token } = useSelector((state) => state.auth)
  
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [editInputsDisplayed, setEditInputsDisplayed] = useState(false)
  const [userName, setUserName] = useState(
    {
      firstName: firstName,
      lastName: lastName
    }
  )

  const showEditInputs = () => {
    setEditInputsDisplayed(true)
  }

  const submitForm = (data) => {
    dispatch(updateUserName(data)).then(() => {
      setEditInputsDisplayed(false)
      dispatch(getUserNewName(token))
    })
  }

  useEffect(() => {
    document.title = 'ArgentBank - Profile'
    setUserName(() => {
      if (token) {
        return {firstName: firstName, lastName: lastName}
      } else {
        return {firstName: null, lastName: null}
      }
    })
  }, [firstName, lastName, token])
  

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          { editInputsDisplayed ?
            (
              <>
              <h1>Welcome back</h1>
              <form onSubmit={handleSubmit(submitForm)} className="update-name__form">
                <div className="update-name__col-left">
                  <input type="text" id="firstname" className="update-name__input" placeholder={userName.firstName} {...register('firstname')} />
                  <button className="edit-name-button" type='submit'>Save</button>
                </div>
                <div className='update-name__col-right'>
                  <input type="text" id="lastname" className="update-name__input" placeholder={userName.lastName} {...register('lastname')} />
                  <button className="edit-name-button" onClick={ () => setEditInputsDisplayed(false) } >Cancel</button>
                </div>
              </form>
              </>
            ) :
            (
              <>
              <h1>Welcome back<br />{`${userName.firstName} ${userName.lastName}`}</h1>
              <button className="edit-button" onClick={showEditInputs}>Edit Name</button>
              </>
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