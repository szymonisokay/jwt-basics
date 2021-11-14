import React from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/Form'
import Layout from '../components/Layout'
import styled from 'styled-components';

const Text = styled.h2`
    text-transform: uppercase; 
    margin-bottom: 1rem;
`

const Card = styled.div`
    max-width: 500px;
    margin: 0 auto;
    border-radius: 0.75rem;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
    padding: 2rem;
`

const Subtitle = styled.p`
    font-size: 0.9rem;
    text-align: center;
    margin-top: 1rem;

    a:hover {
        text-decoration: underline;
    }
`

const AddPost = () => {
    return (
        <Layout>
            <Card>
                <Text>Add Post</Text>
                <Form />
            </Card>
            <Subtitle>
                <Link to="/" >Go to dashboard</Link>
            </Subtitle>
        </Layout>
    )
}

export default AddPost
