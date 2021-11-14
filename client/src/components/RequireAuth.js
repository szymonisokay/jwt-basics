import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'

const RequireAuth = ({ children }) => {
    const { isAuthenticated } = useAuthContext()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to='/auth/sign-in' replace state={location} />
    }

    return children
}

export default RequireAuth
