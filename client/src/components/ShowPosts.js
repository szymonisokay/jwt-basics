import React, { useState, useEffect, useCallback, useRef } from "react"
import styled from "styled-components"
// Components
import SinglePost from "./SinglePost"
import axios from "axios"
import { useAppRequestsContext } from "../context/appRequestsContext"
import { useAuthContext } from "../context/authContext"

const PostsContainer = styled.div``

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
`

const Text = styled.h2`
  text-transform: uppercase;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  color: #0d8555;
`

const ShowPosts = ({ title, type }) => {
  const [posts, setPosts] = useState([]),
    [isLoading, setIsLoading] = useState(false)

  const sourceRef = useRef()
  sourceRef.current = axios.CancelToken.source()

  const { getToken, loggedInUser } = useAuthContext()
  const token = getToken()

  const { getAllPosts, getUsersPosts } = useAppRequestsContext()

  const fetchAllPosts = useCallback(async () => {
    try {
      let response
      setIsLoading(true)
      if (type === "auth") {
        response = await axios.get(
          `http://localhost:3000/api/posts?user=${loggedInUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cancelToken: sourceRef.current.token,
          }
        )
      } else {
        response = await axios.get(`http://localhost:3000/api/posts`, {
          cancelToken: sourceRef.current.token,
        })
      }

      setPosts(response.data.posts)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [getAllPosts, getUsersPosts, type])

  useEffect(() => {
    fetchAllPosts()

    return () => {
      sourceRef.current.cancel("Cancel")
    }
  }, [fetchAllPosts])

  return (
    <PostsContainer>
      <Text>{title}</Text>
      {posts.length === 0 && !isLoading && (
        <Subtitle>No posts to show...</Subtitle>
      )}
      {isLoading && <Subtitle>Loading...</Subtitle>}
      {posts.length > 0 && !isLoading && (
        <Posts>
          {posts.map((post) => (
            <SinglePost key={post._id} post={post} />
          ))}
        </Posts>
      )}
    </PostsContainer>
  )
}

export default ShowPosts
