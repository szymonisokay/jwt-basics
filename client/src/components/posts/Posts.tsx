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
      <Grid
        container
        spacing={2}
        columns={{ xs: 1, sm: 4, md: 12 }}
        style={{ margin: "0", width: "100%" }}
      >
        {posts.map((post, index) => (
          <Grid item xs={1} sm={2} md={4} key={index}>
            <SinglePost key={post._id} post={post} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Posts
