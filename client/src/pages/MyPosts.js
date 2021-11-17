import React from 'react'
import Layout from '../components/Layout'
import ShowPosts from '../components/ShowPosts'

const MyPosts = () => {
    return (
        <Layout>
            <ShowPosts title='My posts' type='auth' />
        </Layout>
    )
}

export default MyPosts
