import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import styled from 'styled-components';

// axios
const axios = require('axios')


const UserInfoContainer = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`

const UserImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 100%;
`

const UserName = styled.p`
    text-transform: uppercase;
    text-decoration: none;
`

const UserInfo = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const user = localStorage.getItem('user')

        if (!user) return

        const decodedData = jwt_decode(JSON.parse(user).token)

        axios({
            method: 'get',
            url: `http://localhost:3000/api/users/${decodedData.id}`,
            headers: {
                "Authorization": `Bearer ${JSON.parse(user).token}`
            }
        }).then(res => {
            const newUser = {
                id: res.data.user._id,
                username: res.data.user.username,
                email: res.data.user.email,
                image: res.data.user.image
            }
            setUser(newUser)
        }).catch(err => {
            setUser({})
        })

    }, [])

    return (
        <Link to={`/users/${user.id}`}>
            <UserInfoContainer>
                <UserImage src={user.image} />
                <UserName>{user.username}</UserName>
            </UserInfoContainer>
        </Link>
    )
}

export default UserInfo
