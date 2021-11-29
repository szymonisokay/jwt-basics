import React, { useContext, useRef } from "react"
import axios from "axios"
import { useAuthContext } from "./authContext"

const AppRequestsContext = React.createContext()

export const AppRequestsProvider = ({ children }) => {
  const source = axios.CancelToken.source()

  const mainUrl = "http://localhost:3000/api/"
  const { getToken, loggedInUser } = useAuthContext()
  const token = getToken()

  // Get requests

  // http://localhost:3000/api/posts
  const getAllPosts = async (url) => {
    const response = await axios.get(`${mainUrl}${url}`)
    return response
  }

  // http://localhost:3000/api/posts?user=:id
  const getUsersPosts = async (url) => {
    const response = await axios.get(
      `${mainUrl}${url}?user=${loggedInUser.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  }
  // http://localhost:3000/api/users
  const getUser = async (url) => {
    const response = await axios.get(`${mainUrl}${url}`)
    return response
  }

  // http://localhost:3000/api/posts/:id
  const getSinglePost = async (url) => {
    const response = await axios.get(`${mainUrl}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    })

    console.log(source)
    return { response, source }
  }

  // Post requests

  // http://localhost:3000/api/posts/
  const createPost = async (url, title, content) => {
    const response = await axios.post(
      `${mainUrl}${url}`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response
  }

  // Put requests

  // http://localhost:3000/api/posts/:id
  const editPost = async (url, title, content, cancelToken) => {
    const response = await axios.put(
      `${mainUrl}${url}`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cancelToken: cancelToken,
      }
    )

    console.log(response)
    return response
  }

  return (
    <AppRequestsContext.Provider
      value={{
        getAllPosts,
        getUsersPosts,
        getUser,
        createPost,
        editPost,
        getSinglePost,
      }}
    >
      {children}
    </AppRequestsContext.Provider>
  )
}

export const useAppRequestsContext = () => {
  return useContext(AppRequestsContext)
}
