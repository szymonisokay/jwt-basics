import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
// axios
const axios = require('axios')

const PostContainer = styled.div`
    
`

const Text = styled.h2`
    text-transform: uppercase; 
`

const Subtitle = styled.p`
    color: #0d8555;
    margin-top: 0.5rem;
`

const ShowPosts = () => {
    const [posts, setPosts] = useState([]),
        [isLoading, setIsLoading] = useState(false)

    const fetchAllPosts = async () => {
        setIsLoading(true)
        await axios({
            method: 'get',
            url: 'http://localhost:3000/api/posts',
        }).then(res => {
            setIsLoading(false)
            console.log(res.data)
        }).catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        fetchAllPosts()
    }, [])

    return (
        <PostContainer>
            <Text>All Posts</Text>
            {(posts.length === 0 && !isLoading) && <Subtitle>No posts to show...</Subtitle>}
            {isLoading && <Subtitle>Loading...</Subtitle>}
        </PostContainer>
    )
}

export default ShowPosts
