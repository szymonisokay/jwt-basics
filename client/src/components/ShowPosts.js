import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
// Components
import SinglePost from "./SinglePost"

import { useAppRequestsContext } from "../context/appRequestsContext"

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

  const { getAllPosts, getUsersPosts } = useAppRequestsContext()

  const fetchAllPosts = useCallback(async () => {
    try {
      let response
      setIsLoading(true)
      if (type === "auth") response = await getUsersPosts("posts")
      else {
        response = await getAllPosts("posts")
      }

      setPosts(response.data.posts)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [getAllPosts, getUsersPosts, type])

  useEffect(() => {
    fetchAllPosts()
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
