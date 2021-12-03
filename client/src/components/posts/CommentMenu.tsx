import React from "react"
// MUI
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import EditIcon from "@mui/icons-material/Edit"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"

type PropsType = {
  open: boolean
  handleClose: any
  anchorEl: null | HTMLElement
}

const CommentMenu: React.FC<PropsType> = ({ open, handleClose, anchorEl }) => {
  return (
    <Menu
      id='comment-menu'
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      elevation={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <MenuItem>
        <EditIcon style={{ marginRight: "1rem" }} />
        Edit comment
      </MenuItem>
      <MenuItem>
        <DeleteOutlineIcon style={{ marginRight: "1rem" }} />
        Delete comment
      </MenuItem>
    </Menu>
  )
}

export default CommentMenu
