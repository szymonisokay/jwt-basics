import React, { useState } from 'react'
import PostForm from '../components/posts/PostForm'
import ContainerUtil from '../components/utils/ContainerUtil'
import { useAuthContext } from '../context/AuthContext'
import axios from 'axios'

const AddPost = () => {
  const [info, setInfo] = useState({ isInfo: false, infoMsg: '', infoType: '' })

  const { getToken } = useAuthContext()
  const token = getToken()

  const addPostToDB = async (title: string, content: string) => {
    if (!title || !content)
      return setInfo({
        isInfo: true,
        infoMsg: 'Fields must not be empty!',
        infoType: 'failed',
      })

    try {
      const response = await axios.post(
        'http://localhost:5000/api/posts',
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

      setInfo({ isInfo: true, infoMsg: response.data.msg, infoType: 'success' })
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
        <PostForm addPost={addPostToDB} type='add' info={info} />
      </ContainerUtil>
    </div>
  )
}

export default AddPost
