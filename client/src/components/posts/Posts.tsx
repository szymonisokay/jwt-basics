import React from "react"
// Types
import { PostType } from "../../types"
import SinglePost from "./SinglePost"
// MUI
import Grid from "@mui/material/Grid"

type PropTypes = {
  posts: PostType[]
  title: string
}

const Posts: React.FC<PropTypes> = ({ posts, title }) => {
  return (
    <div>
      <h2 className="posts-title">{title}</h2>
      <Grid container spacing={2} style={{ margin: "0", width: "100%" }}>
        {posts.map((post) => (
          <Grid item lg="auto">
            <SinglePost key={post._id} post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Posts
