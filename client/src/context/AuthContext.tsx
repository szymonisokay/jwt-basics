import React, { useContext, useState } from "react"
import { UserType } from "../types"

const AuthContext = React.createContext({})

type Type = {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Type> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loggedInUser, setLoggedInUser] = useState<UserType>()

  return (
    <AuthContext.Provider value={{ isAuthenticated, loggedInUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
