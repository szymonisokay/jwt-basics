import React, { useState } from "react"
// Types
import { CommentType } from "../../types"
// Router
import { Link } from "react-router-dom"
// MUI
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import IconButton from "@mui/material/IconButton"
import MoreVertIcon from "@mui/icons-material/MoreVert"

type PropsType = {
  comment: CommentType
}

const SingleComment: React.FC<PropsType> = ({ comment }) => {
  const [like, setLike] = useState<boolean>(false)

  const LikeComment = () => {
    setLike(!like)
  }

  return (
    <div className='comment-item'>
      <Link to='/'>
        <Avatar
          style={{ height: "30px", width: "30px" }}
          src={comment.createdBy.image}
          alt={comment.createdBy.username}
        />
      </Link>
      <div className='comment-item__content'>
        <Typography variant='body1'>
          <Link to='/'>
            <span style={{ fontWeight: "bold" }}>
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
            {new Date(comment.createdAt).toDateString()}
          </span>

          <span className='comment-item__content-meta__fav'>
            <IconButton className='small-icon' onClick={LikeComment}>
              {like ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
            </IconButton>
          </span>
          <span className='comment-item__content-meta__likes'>
            {comment.likes.length === 1
              ? `${comment.likes.length} like`
              : `${comment.likes.length} likes`}
          </span>
        </Typography>
      </div>
      <IconButton>
        <MoreVertIcon style={{ height: "20px", width: "20px" }} />
      </IconButton>
    </div>
  )
}

export default SingleComment
