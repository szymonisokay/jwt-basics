import { useCallback, useEffect, useState } from "react"
// Axios
import axios from "axios"
// Types
import { PostType } from "../types"
// Components
import ContainerUtil from "../components/utils/ContainerUtil"
import Posts from "../components/posts/Posts"
// MUI
import CircularProgress from "@mui/material/CircularProgress"

const Dashboard = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    const response = await axios.get("http://localhost:5000/api/posts")

    setPosts(response.data.posts)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className='main-container'>
      <ContainerUtil>
        {loading && (
          <div
            style={{
              height: "100vh",
              width: "100%",
              display: "grid",
              placeContent: "center",
            }}
          >
            <CircularProgress color='secondary' />
          </div>
        )}
        {posts.length === 0 && !loading && <p>No posts</p>}
        {posts.length > 0 && !loading && (
          <Posts posts={posts} title='All posts' />
        )}
      </ContainerUtil>
    </div>
  )
}

export default Dashboard
