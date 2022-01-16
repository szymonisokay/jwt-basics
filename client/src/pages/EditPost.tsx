import React, { useState } from 'react'
import PostForm from '../components/posts/PostForm'
import ContainerUtil from '../components/utils/ContainerUtil'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'

const EditPost = () => {
  const [info, setInfo] = useState({ isInfo: false, infoMsg: '', infoType: '' })

  const { getToken } = useAuthContext()
  const token = getToken()

  const editCurrentPost = async (
    title: string,
    content: string,
    id: string
  ) => {
    if (!title || !content)
      return setInfo({
        isInfo: true,
        infoMsg: 'Fields must not be empty',
        infoType: 'failed',
      })

    try {
      const resposne = await axios.put(
        `http://localhost:5000/api/posts/${id}`,
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

      setInfo({ isInfo: true, infoMsg: resposne.data.msg, infoType: 'success' })
    } catch (error) {
      setInfo({
        isInfo: true,
        infoMsg: 'Something went wrong!',
        infoType: 'failed',
      })
    }
  }

  return (
    <div>
      <ContainerUtil>
        <PostForm editPost={editCurrentPost} info={info} type='edit' />
      </ContainerUtil>
    </div>
  )
}

export default EditPost
