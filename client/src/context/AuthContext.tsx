import React, { useCallback, useContext, useEffect, useState } from "react"
import { UserType } from "../types"
import axios from "axios"

type Type = {
  children: React.ReactNode
}

type UserObject = {
  email: string
  id: string
  image: string
  token: string
  username: string
}

type ContextType = {
  isAuthenticated: boolean
  loggedInUser: UserType
  signIn: (email: string, password: string) => { msg: string; type: string }
  signUp: () => void
  signOut: () => void
}

const AuthContext = React.createContext({})

export const AuthProvider: React.FC<Type> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loggedInUser, setLoggedInUser] = useState<UserType | {}>({})

  const signIn = async (email: string, password: string) => {
    if (!email || !password)
      return { msg: "Fields must not be empty!", type: "failed" }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      )

      authenticateUser(response.data.user)
      return { msg: response.data.msg, type: "success" }
    } catch (error) {
      return { msg: "Something went wrong!", type: "failed" }
    }
  }

  const signUp = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {}

  const authenticateUser = useCallback((user: UserObject): void => {
    setLoggedInUser({
      _id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
    })
    setIsAuthenticated(true)
    createSession(user)
  }, [])

  const createSession = (user: UserObject): void => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
        token: user.token,
      })
    )
  }

  const signOut = () => {
    localStorage.removeItem("user")
    setLoggedInUser({})
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) return

    authenticateUser(JSON.parse(user))
  }, [authenticateUser])

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loggedInUser, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext) as ContextType
