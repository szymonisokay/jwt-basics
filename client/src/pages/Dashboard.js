import React from 'react'
// Components
import Header from '../components/Header'
import ShowPosts from '../components/ShowPosts'
import Layout from '../components/Layout'


const Dashboard = () => {
    return (
        <>
            <Header />
            <Layout>
                <ShowPosts />
            </Layout>

        </>
    )
}

export default Dashboard
