import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        localStorage.getItem('user') && setIsAuthenticated(true)
    }, [setIsAuthenticated])

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}
