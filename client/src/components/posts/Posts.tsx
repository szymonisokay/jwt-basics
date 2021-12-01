import React from "react"
// Types
import { PostType } from "../../types"
import SinglePost from "./SinglePost"

type PropTypes = {
  posts: PostType[]
  title: string
}

const Posts: React.FC<PropTypes> = ({ posts, title }) => {
  return (
    <div>
      <h2 className='posts-title'>{title}</h2>
      <div className='grid'>
        {posts.map((post) => (
          <SinglePost key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Posts
