import React from "react"
// MUI
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import MoreVertIcon from "@mui/icons-material/MoreVert"
// Types
import { PostType } from "../../types"

type PropsType = {
  post: PostType
}

const SinglePost: React.FC<PropsType> = ({ post }) => {
  console.log(post)
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={post.createdBy.image} />}
        title={post.title}
        subheader={post.createdAt}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
    </Card>
  )
}

export default SinglePost
