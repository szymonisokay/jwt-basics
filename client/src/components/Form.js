import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import Info from "./Info"
import axios from "axios"
import { useAuthContext } from "../context/authContext"

const FormContainer = styled.form`
  max-width: 500px;
`

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 1rem !important;
`

const Textarea = styled.textarea`
  min-height: 50px;
  height: auto !important;
  width: 100%;
  resize: vertical;
  padding: 1rem !important;
`

const Button = styled.button`
  color: white;
`

const Form = ({ method, postTitle, postContent }) => {
  const { getToken } = useAuthContext()
  const token = getToken()

  const [isInfo, setIsInfo] = useState(false),
    [infoType, setInfoType] = useState(""),
    [infoText, setInfoText] = useState([])

  const [title, setTitle] = useState(postTitle || ""),
    [content, setContent] = useState(postContent || "")

  const sourceRef = useRef()
  sourceRef.current = axios.CancelToken.source()

  const handleSubmit = async (e) => {
    setIsInfo(false)
    e.preventDefault()
    if (!title || !content)
      return showInfo("One of the fields is empty!", "failed")

    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts",
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

  if (isInfo) {
    setTimeout(() => setIsInfo(false), 3000)
  }

  const showInfo = (text, type) => {
    setIsInfo(true)
    setInfoType(type)
    setInfoText((oldInfo) => [...oldInfo, text])
  }

  useEffect(() => {
    return () => {
      sourceRef.current.cancel("cancel")
    }
  }, [])

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        className="form-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        className="form-input"
        rows="10"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {isInfo && <Info text={infoText} type={infoType} />}
      <Button>{method === "edit" ? "Edit post" : "Add post"}</Button>
    </FormContainer>
  )
}

export default Form
