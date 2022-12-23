import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

/* This allows to protect the /profile route (which contains sensitive informations about the user) :
the user can access the route only when authentified.
 */
const ProtectedRoute = ({children}) => {
    const auth = useSelector((state) => state.auth)
    let location = useLocation()

    if(!auth.token) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

}

export default ProtectedRoute