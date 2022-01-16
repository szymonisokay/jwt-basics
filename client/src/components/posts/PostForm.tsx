import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Info from '../utils/Info'
import axios from 'axios'

type PropsType = {
  addPost?: (title: string, content: string) => void
  editPost?: (title: string, content: string, id: string) => void
  type: string
  info: { isInfo: boolean; infoMsg: string; infoType: string }
}

const PostForm: React.FC<PropsType> = ({ addPost, editPost, type, info }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const { id } = useParams()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setTitle('')
    setContent('')
    if (type === 'add' && addPost) addPost(title, content)
    if (type === 'edit' && editPost && id) editPost(title, content, id)
  }

  const fetchPostData = useCallback(async () => {
    const response = await axios.get(`http://localhost:5000/api/posts/${id}`)

    setTitle(response.data.post.title)
    setContent(response.data.post.content)
  }, [id])

  useEffect(() => {
    if (type === 'edit') fetchPostData()
  }, [id, type, fetchPostData])

  return (
    <div className='center-grid'>
      <div className='card'>
        <Box component='form' onSubmit={handleSubmit}>
          <div className='card-header'>
            <Typography
              variant='body1'
              color='GrayText'
              sx={{ marginTop: '1rem' }}
            >
              {type === 'add' ? 'Create post' : 'Edit post'}
            </Typography>
          </div>
          <div className='card-content'>
            <TextField
              id='title'
              label='Title'
              variant='standard'
              color='secondary'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: '1rem' }}
            />
            <TextField
              multiline
              id='content'
              label='Content'
              variant='standard'
              color='secondary'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
            />
          </div>
          <div className='card-actions'>
            <Button
              type='submit'
              variant='contained'
              sx={{
                width: '100%',
                background: '#141721',
                ':hover': { background: '#292f44' },
              }}
            >
              {type === 'add' ? 'Add post' : 'Edit post'}
            </Button>
          </div>
          {info.isInfo && <Info msg={info.infoMsg} type={info.infoType} />}
        </Box>
      </div>

      <Typography
        variant='body2'
        sx={{ textAlign: 'center', marginTop: '1rem' }}
      >
        <Link to='/'>Go to dashboard</Link>
      </Typography>
    </div>
  )
}

export default PostForm
