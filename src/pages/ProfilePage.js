import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountContent from '../components/AccountContent'
import { useForm } from 'react-hook-form'
import { updateUserName } from '../features/user/userSlice'
import { getUserNewName } from '../features/auth/authSlice'

function ProfilePage() {

  const { firstName } = useSelector((state) => state.auth)
  const { lastName } = useSelector((state) => state.auth)
  const { token } = useSelector((state) => state.auth)
  
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [editInputsDisplayed, setEditInputsDisplayed] = useState(false)
  const [userName, setUserName] = useState({firstName: firstName, lastName: lastName})

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
    setUserName({
      firstName: firstName,
      lastName: lastName
    })
  }, [firstName, lastName])
  

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