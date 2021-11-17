import React from 'react'
// Components
import ShowPosts from '../components/ShowPosts'
import Layout from '../components/Layout'


const Dashboard = () => {
    return (
        <>
            <Layout>
                <ShowPosts title='All posts' type='no-auth' />
            </Layout>

        </>
    )
}

export default Dashboard
