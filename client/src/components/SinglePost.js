import React, { useEffect, useCallback, useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'
import { useAppRequestsContext } from '../context/appRequestsContext';
import { useAuthContext } from '../context/authContext';

const Card = styled.div`
    box-shadow: 0px 0px 15px rgba(0,0,0,0.05);
    border-radius: 0.2rem;
    padding: 1rem;
`
const CardHeader = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    margin-bottom: 0.8rem;
`

const EditIcon = styled.div`
    font-size: 1rem;
    color: blue;
    cursor: pointer;
`

const CardTitle = styled.h4`
    text-transform: uppercase;
    
`

const CardContent = styled.div`
    min-height: 70px;
`

const CardMeta = styled.div`
    padding: 1rem 0;
`

const CardFooter = styled.div`
    padding: 1rem 0 0;
    border-top: 1px solid #ccc;
    color: #aaa;
    font-weight: normal;
`


const SinglePost = ({ id, title, content, likes, createdBy, createdAt }) => {
    const { getUser } = useAppRequestsContext()
    const { getUserID } = useAuthContext()

    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const fetchUser = useCallback(async () => {
        const response = await getUser(`users/${createdBy}`)
        setUser({ ...response.data.user })

    }, [getUser, createdBy])

    const editPost = () => {
        navigate(`/edit-post/${id}`)
    }


    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                {createdBy === getUserID() && <EditIcon onClick={editPost}>
                    Edit
                </EditIcon>}
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            <CardMeta>
                <p>
                    {createdBy === getUserID() ? <Link to={`/users/${getUserID()}`}><img className="preview-image" alt={user.username} src={user.image} />You</Link> : <Link to={`/users/${createdBy}`}><img className="preview-image" alt={user.username} src={user.image} />{user.username}</Link>}
                </p>
                <p>{new Date(createdAt).toDateString()}</p>
            </CardMeta>
            <CardFooter>
                Likes: {likes.usersId.length}
            </CardFooter>
        </Card>

    )
}

export default SinglePost
