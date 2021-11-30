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

const SinglePostMenu: React.FC<PropsType> = ({
  open,
  handleClose,
  anchorEl,
}) => {
  return (
    <Menu
      id="post-menu"
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      elevation={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem>
        <EditIcon style={{ marginRight: "1rem" }} />
        Edit post
      </MenuItem>
      <MenuItem>
        <DeleteOutlineIcon style={{ marginRight: "1rem" }} />
        Delete post
      </MenuItem>
    </Menu>
  )
}

export default SinglePostMenu
