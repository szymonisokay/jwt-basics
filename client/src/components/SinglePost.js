import React from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/authContext"

const Card = styled.div`
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  border-radius: 0.2rem;
  padding: 1rem;
`
const CardHeader = styled.div`
  display: flex;
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

const SinglePost = ({ post }) => {
  const {
    _id: postID,
    title,
    content,
    createdBy: { _id: userID, username, image },
    likes,
    createdAt,
  } = post

  const { loggedInUser } = useAuthContext()

  const navigate = useNavigate()

  const editPost = () => {
    navigate(`/edit-post/${postID}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {userID === loggedInUser.id && (
          <EditIcon onClick={editPost}>Edit</EditIcon>
        )}
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardMeta>
        <p>
          {userID === loggedInUser.id ? (
            <Link to={`/users/${loggedInUser.id}`}>
              <img className="preview-image" alt={username} src={image} />
              You
            </Link>
          ) : (
            <Link to={`/users/${userID}`}>
              <img className="preview-image" alt={username} src={image} />
              {username}
            </Link>
          )}
        </p>
        <p>{new Date(createdAt).toDateString()}</p>
      </CardMeta>
      <CardFooter>
        Likes: {likes.length}{" "}
        {likes.map((like) => (
          <div key={like._id}>
            <img className="preview-image" src={like.image} />
            {like.username}
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}

export default SinglePost
