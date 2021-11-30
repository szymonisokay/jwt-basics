import React, { useState } from "react"
// MUI
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import FavoriteIcon from "@mui/icons-material/Favorite"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Typography from "@mui/material/Typography"
// Types
import { PostType } from "../../types"
import SinglePostMenu from "./SinglePostMenu"
import { isNullishCoalesce } from "typescript"

type PropsType = {
  post: PostType
}

const SinglePost: React.FC<PropsType> = ({ post }) => {
  const [like, setLike] = useState<any>("inherit")
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const likePost = () => {
    if (like === "error") return setLike("inherit")

    setLike("error")
  }

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
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
              aria-label="settings"
              onClick={openMenu}
              aria-controls="post-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>{post.content}</CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <IconButton aria-label="Like" onClick={likePost}>
            <FavoriteIcon color={like} />
          </IconButton>
          <Typography variant="body2" style={{ padding: "0 0.5rem" }}>
            {post.likes.length === 1
              ? `${post.likes.length} like`
              : `${post.likes.length} likes`}
          </Typography>
        </CardActions>
      </Card>
      <SinglePostMenu open={open} handleClose={closeMenu} anchorEl={anchorEl} />
    </>
  )
}

export default SinglePost
