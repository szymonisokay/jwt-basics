import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { useAuthContext } from "../context/authContext"

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
  const { loggedInUser } = useAuthContext()

  return (
    <Link to={`/users/${loggedInUser.id}`}>
      <UserInfoContainer>
        <UserImage src={loggedInUser.image} />
        <UserName>{loggedInUser.username}</UserName>
      </UserInfoContainer>
    </Link>
  )
}

export default UserInfo
