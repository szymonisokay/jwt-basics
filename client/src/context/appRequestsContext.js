import React, { useContext } from "react";
import axios from 'axios'
import { useAuthContext } from './authContext'

const AppRequestsContext = React.createContext()

export const AppRequestsProvider = ({ children }) => {
    const mainUrl = 'http://localhost:3000/api/'
    const { getToken } = useAuthContext()
    const token = getToken()

    // Get requests

    const getAllPosts = async (url) => {
        const response = await axios.get(`${mainUrl}${url}`)
        return response
    }

    const getUsersPosts = async (url) => {
        const response = await axios.get(`${mainUrl}${url}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return response
    }

    const getUser = async (url) => {
        const response = await axios.get(`${mainUrl}${url}`)

        return response
    }

    // Post requests

    const createPost = async (url, title, content) => {
        const response = await axios.post(`${mainUrl}${url}`, {
            title,
            content
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return response
    }

    const editPost = async (url, title, content) => {
        const response = await axios.put(`${mainUrl}${url}`, {
            title,
            content
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    return (
        <AppRequestsContext.Provider value={{ getAllPosts, getUsersPosts, getUser, createPost, editPost }} >
            {children}
        </AppRequestsContext.Provider>
    )
}

export const useAppRequestsContext = () => {
    return useContext(AppRequestsContext)
}