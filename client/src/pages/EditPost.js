import React, { useCallback, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Form from "../components/Form"
import Layout from "../components/Layout"
import styled from "styled-components"
import { useAuthContext } from "../context/authContext"
import axios from "axios"

const Text = styled.h2`
  text-transform: uppercase;
  margin-bottom: 1rem;
`

const Card = styled.div`
  max-width: 500px;
  margin: 0 auto;
  border-radius: 0.75rem;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`

const Subtitle = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;

  a:hover {
    text-decoration: underline;
  }
`

const EditPost = () => {
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  const { getToken } = useAuthContext()
  const token = getToken()

  const sourceRef = useRef()
  sourceRef.current = axios.CancelToken.source()

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/posts/${id}`,
        {
          cancelToken: sourceRef.current.token,
        }
      )
      setPost(response.data.post)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [id])

  const editPost = async (title, content) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/posts/${post._id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: sourceRef.current.token,
        }
      )
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
    return () => {
      sourceRef.current.cancel("cancel")
    }
  }, [fetchPost])

  return (
    <Layout>
      <Card>
        <Text>Edit Post</Text>
        {loading && <p>Loading</p>}
        {!loading && <Form method="edit" {...post} editPost={editPost} />}
      </Card>
      <Subtitle>
        <Link to="/">Go to dashboard</Link>
      </Subtitle>
    </Layout>
  )
}

export default EditPost
