import React from "react"
import { CommentType } from "../../types"
import Collapse from "@mui/material/Collapse"
import InputBase from "@mui/material/InputBase"
import Paper from "@mui/material/Paper"
import SingleComment from "./SingleComment"
import Button from "@mui/material/Button"

type PropsType = {
  comments: CommentType[]
  expanded: boolean
}

const CommentsSection: React.FC<PropsType> = ({ comments, expanded }) => {
  return (
    <Collapse in={expanded} timeout='auto' unmountOnExit>
      <Paper
        component='form'
        sx={{
          margin: "0.5rem 1rem",
          padding: "0.5rem 0.5rem 0.5rem 1rem",
          display: "flex",
        }}
        elevation={1}
      >
        <InputBase placeholder='Add comment' sx={{ flex: 2 }} />
        <Button aria-label='menu'>Add</Button>
      </Paper>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <SingleComment key={comment._id} comment={comment} />
        ))
      ) : (
        <p className='no-comments'>No comments</p>
      )}
    </Collapse>
  )
}

export default CommentsSection
