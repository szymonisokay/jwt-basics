import React, { useEffect, useState } from 'react'
// MUI
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Typography from '@mui/material/Typography'

// Types
import { PostType } from '../../types'
import SinglePostMenu from './SinglePostMenu'
import CommentsSection from './CommentsSection'
import ShowUsersModal from './ShowUsersModal'
import { useAuthContext } from '../../context/AuthContext'

import axios from 'axios'
import moment from 'moment'
moment().format()

type PropsType = {
  singlePost: PostType
}

const SinglePost: React.FC<PropsType> = ({ singlePost }) => {
  const [like, setLike] = useState<boolean>(false)
  const [post, setPost] = useState<PostType>(singlePost)
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [expanded, setExpanded] = useState<boolean>(false)
  const isMenuOpened = Boolean(anchorEl)

  const { loggedInUser, getToken } = useAuthContext()
  const token = getToken()

  const likePost = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${post._id}`,
        {
          liked: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      setPost(response.data.post)
      setLike(!like)
    } catch (error) {
      console.log(error)
    }
  }

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const openModal = () => {
    setIsModalOpened(true)
  }

  const closeModal = () => {
    setIsModalOpened(false)
  }

  const showComments = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    setPost(singlePost)

    if (post.likes.some((like) => like._id === loggedInUser._id)) setLike(true)
  }, [singlePost])

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar src={post.createdBy.image} />}
          title={post.title}
          subheader={
            post.createdBy._id === loggedInUser._id
              ? 'You'
              : post.createdBy.username
          }
          action={
            <IconButton
              aria-label='settings'
              onClick={openMenu}
              aria-controls='post-menu'
              aria-haspopup='true'
              aria-expanded={isMenuOpened ? 'true' : undefined}
            >
              <MoreVertIcon />
            </IconButton>
          }
          classes={{ action: 'margin-auto' }}
        />
        <CardContent>{post.content}</CardContent>
        <Typography
          variant='subtitle2'
          style={{ padding: '0 1rem', color: 'grayText', fontSize: '12px' }}
        >
          {moment(post.createdAt).fromNow()}
        </Typography>
        <CardActions style={{ display: 'flex' }}>
          <IconButton aria-label='Like' onClick={likePost}>
            {like ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton
            aria-label='Comment'
            onClick={showComments}
            style={{ margin: 0 }}
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography
            onClick={openModal}
            variant='body2'
            style={{
              padding: '0 0.5rem',
              flex: 2,
              textAlign: 'right',
              cursor: 'pointer',
            }}
          >
            {post.likes.length === 1
              ? `${post.likes.length} like`
              : `${post.likes.length} likes`}
          </Typography>
        </CardActions>
        <CommentsSection comments={post.comments} expanded={expanded} />
      </Card>
      <SinglePostMenu
        open={isMenuOpened}
        handleClose={closeMenu}
        anchorEl={anchorEl}
        postId={post._id}
        userId={post.createdBy._id}
      />
      <ShowUsersModal
        users={post.likes}
        open={isModalOpened}
        handleClose={closeModal}
      />
    </>
  )
}

export default SinglePost
