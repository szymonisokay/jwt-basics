import React, { useState } from 'react'
// Types
import { CommentType } from '../../types'
// Router
import { Link } from 'react-router-dom'
// MUI
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CommentMenu from './CommentMenu'
import ShowUsersModal from './ShowUsersModal'

import moment from 'moment'
moment().format()

type PropsType = {
  comment: CommentType
}

const SingleComment: React.FC<PropsType> = ({ comment }) => {
  const [like, setLike] = useState<boolean>(false)
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpened = Boolean(anchorEl)

  const LikeComment = () => {
    setLike(!like)
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

  return (
    <div className='comment-item'>
      <Link to='/'>
        <Avatar
          style={{ height: '30px', width: '30px' }}
          src={comment.createdBy.image}
          alt={comment.createdBy.username}
        />
      </Link>
      <div className='comment-item__content'>
        <Typography variant='body1'>
          <Link to='/'>
            <span style={{ fontWeight: 'bold' }}>
              {comment.createdBy.username}
            </span>
          </Link>
          &nbsp;
          {comment.content}
        </Typography>
        <Typography
          variant='body2'
          color='GrayText'
          className='comment-item__content-meta'
        >
          <span className='comment-item__content-meta__date'>
            {moment(comment.createdAt).fromNow()}
          </span>

          <span className='comment-item__content-meta__fav'>
            <IconButton className='small-icon' onClick={LikeComment}>
              {like ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
            </IconButton>
          </span>
          <span
            onClick={openModal}
            className='comment-item__content-meta__likes'
          >
            {comment.likes.length === 1
              ? `${comment.likes.length} like`
              : `${comment.likes.length} likes`}
          </span>
        </Typography>
      </div>
      <IconButton
        aria-label='settings'
        onClick={openMenu}
        aria-controls='post-menu'
        aria-haspopup='true'
        aria-expanded={isMenuOpened ? 'true' : undefined}
      >
        <MoreVertIcon style={{ height: '20px', width: '20px' }} />
      </IconButton>
      <CommentMenu
        open={isMenuOpened}
        handleClose={closeMenu}
        anchorEl={anchorEl}
      />
      <ShowUsersModal
        users={comment.likes}
        open={isModalOpened}
        handleClose={closeModal}
      />
    </div>
  )
}

export default SingleComment
