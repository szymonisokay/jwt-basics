import React, { useContext, useState } from "react"
import { UserType } from "../types"

const AuthContext = React.createContext({})

type Type = {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Type> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loggedInUser, setLoggedInUser] = useState<UserType>()

  const signIn = (email: String, password: String) => {
    console.log(email, password)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loggedInUser, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
