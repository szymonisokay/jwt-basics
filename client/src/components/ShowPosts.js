import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
// Components
import SinglePost from './SinglePost';
// axios
const axios = require('axios')

const PostsContainer = styled.div`   
`

const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1rem;
`

const Text = styled.h2`
    text-transform: uppercase; 
    margin-bottom: 1rem;
`

const Subtitle = styled.p`
    color: #0d8555;
    
`

const ShowPosts = ({ title }) => {
    const [posts, setPosts] = useState([]),
        [isLoading, setIsLoading] = useState(false)

    const fetchAllPosts = async () => {
        setIsLoading(true)
        await axios({
            method: 'get',
            url: 'http://localhost:3000/api/posts',
        }).then(res => {
            setIsLoading(false)
            const modifiedPosts = res.data.posts.map(post => {
                return {
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    likes: post.likes,
                    comments: post.comments,
                    createdBy: post.createdBy,
                    createdAt: post.createdAt,
                    updatedAt: post.updatedAt
                }
            })
            console.log(modifiedPosts)
            setPosts([...modifiedPosts])

        }).catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        fetchAllPosts()
    }, [])

    return (
        <PostsContainer>
            <Text>{title}</Text>
            {(posts.length === 0 && !isLoading) && <Subtitle>No posts to show...</Subtitle>}
            {isLoading && <Subtitle>Loading...</Subtitle>}
            {(posts.length > 0 && !isLoading) && <Posts>
                {posts.map(post => <SinglePost key={post.id} {...post} />)}
            </Posts>}
        </PostsContainer>
    )
}

export default ShowPosts
