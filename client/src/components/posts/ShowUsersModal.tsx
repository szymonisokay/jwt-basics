import React from "react"
// Types
import { UserType } from "../../types"
// MUI
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CardHeader from "@mui/material/CardHeader"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

type PropsType = {
  users: UserType[]
  open: boolean
  handleClose: any
}

const ShowUsersModal: React.FC<PropsType> = ({ users, open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className='users-modal'>
        <div className='modal-header'>
          <Typography variant='subtitle1' color='black'>
            Likes
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        {users.length > 0 ? (
          users.map((user) => (
            <CardHeader
              key={user._id}
              style={{ padding: "0.5rem 0" }}
              avatar={<Avatar src={user.image} alt={user.username} />}
              title={
                <Typography variant='body1' color='black'>
                  {user.username}
                </Typography>
              }
              subheader={user.email}
              action={<Button variant='text'>Visit</Button>}
              classes={{ action: "margin-auto" }}
            />
          ))
        ) : (
          <Typography
            color='GrayText'
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            No likes yet!
          </Typography>
        )}
      </Box>
    </Modal>
  )
}

export default ShowUsersModal
