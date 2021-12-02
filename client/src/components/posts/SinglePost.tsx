import React, { useState } from "react"
// MUI
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Typography from "@mui/material/Typography"

// Types
import { PostType } from "../../types"
import SinglePostMenu from "./SinglePostMenu"
import CommentsSection from "./CommentsSection"

type PropsType = {
  post: PostType
}

const SinglePost: React.FC<PropsType> = ({ post }) => {
  const [like, setLike] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [expanded, setExpanded] = useState<boolean>(false)
  const open = Boolean(anchorEl)

  const likePost = () => {
    setLike(!like)
  }

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const showComments = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar src={post.createdBy.image} />}
          title={post.title}
          subheader={post.createdBy.username}
          action={
            <IconButton
              aria-label='settings'
              onClick={openMenu}
              aria-controls='post-menu'
              aria-haspopup='true'
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>{post.content}</CardContent>
        <CardActions style={{ display: "flex" }}>
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
            variant='body2'
            style={{ padding: "0 0.5rem", flex: 2, textAlign: "right" }}
          >
            {post.likes.length === 1
              ? `${post.likes.length} like`
              : `${post.likes.length} likes`}
          </Typography>
        </CardActions>
        <CommentsSection comments={post.comments} expanded={expanded} />
      </Card>
      <SinglePostMenu open={open} handleClose={closeMenu} anchorEl={anchorEl} />
    </>
  )
}

export default SinglePost