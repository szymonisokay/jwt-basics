import React from "react"
import { CommentType } from "../../types"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import CardHeader from "@mui/material/CardHeader"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import IconButton from "@mui/material/IconButton"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { flexbox } from "@mui/system"

type PropsType = {
  comments: CommentType[]
  expanded: boolean
}

const CommentsSection: React.FC<PropsType> = ({ comments, expanded }) => {
  console.log(comments)
  return (
    <Collapse in={expanded} timeout='auto' unmountOnExit>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CardHeader
            key={comment._id}
            avatar={
              <Avatar
                src={comment.createdBy.image}
                style={{ width: "30px", height: "30px" }}
              />
            }
            title={comment.content}
            subheader={
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton>
                  <FavoriteIcon style={{ height: "15px", width: "15px" }} />
                </IconButton>
                {comment.likes.length === 1
                  ? `${comment.likes.length} like`
                  : `${comment.likes.length} likes`}
                <div
                  style={{
                    display: "flex",
                    flex: 2,
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </div>
            }
          />
        ))
      ) : (
        <p>No comments</p>
      )}
    </Collapse>
  )
}

export default CommentsSection
