import React from 'react'
import styled from 'styled-components';

const Card = styled.div`
    box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
    border-radius: 0.5rem;
`
const CardHeader = styled.div`
    padding: 1rem 1rem 0;
`

const CardTitle = styled.h4`
    text-transform: uppercase;
    margin-bottom: 0.8rem;
`

const CardContent = styled.div`
    padding: 0 1rem 1rem;
`

const CardFooter = styled.div`
    padding: 1rem;
    border-top: 1px solid #ccc;
`


const SinglePost = ({ id, title, content, likes }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardFooter>
                Likes: {likes.usersId.length}
            </CardFooter>
        </Card>
    )
}

export default SinglePost
