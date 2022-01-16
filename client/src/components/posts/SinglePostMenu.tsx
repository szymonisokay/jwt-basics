import React from 'react'
// MUI
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useAuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

type PropsType = {
  open: boolean
  handleClose: any
  anchorEl: null | HTMLElement
  postId: string
  userId: string
}

const SinglePostMenu: React.FC<PropsType> = ({
  open,
  handleClose,
  anchorEl,
  postId,
  userId,
}) => {
  const { loggedInUser } = useAuthContext()

  return (
    <Menu
      id='post-menu'
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      elevation={1}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {userId === loggedInUser._id && (
        <MenuItem>
          <Link to={`/edit-post/${postId}`}>
            <EditIcon style={{ marginRight: '1rem' }} />
            Edit post
          </Link>
        </MenuItem>
      )}
      {userId === loggedInUser._id && (
        <MenuItem>
          <DeleteOutlineIcon style={{ marginRight: '1rem' }} />
          Delete post
        </MenuItem>
      )}

      <MenuItem sx={{ color: '#c00000' }}>
        <ErrorOutlineIcon style={{ marginRight: '1rem' }} />
        Report post
      </MenuItem>
    </Menu>
  )
}

export default SinglePostMenu
