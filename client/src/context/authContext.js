import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const signIn = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password
            })

            localStorage.setItem("user", JSON.stringify({
                username: response.data.user.username,
                token: response.data.user.token
            }))

            setIsAuthenticated(true)
            setTimeout(() => navigate(`${location.state?.pathname || '/'}`, { replace: true }), 1000)
            return { msg: response.data.msg, type: 'success' }
        } catch (error) {
            return { msg: error.response.data.msg, type: 'failed' }
        }
    }


    useEffect(() => {
        localStorage.getItem('user') && setIsAuthenticated(true)
    }, [setIsAuthenticated])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}
