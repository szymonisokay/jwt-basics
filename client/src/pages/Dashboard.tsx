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
    <ContainerUtil>
      {loading && <CircularProgress color="secondary" />}
      {posts.length === 0 && !loading && <p>No posts</p>}
      {posts.length > 0 && !loading && (
        <Posts posts={posts} title="All posts" />
      )}
    </ContainerUtil>
  )
}

export default Dashboard
