import { AppBar, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { UserData } from "../../types"
import "./styles.css"
import { UserAvatar } from "../UserAvatar"

type HeaderProps = {
  activeUser: UserData | null
  onAvatarClick: () => void
  openPostEditor: () => void
}

export const Header: React.FC<HeaderProps> = ({
  activeUser,
  onAvatarClick,
  openPostEditor,
}) => {
  return (
    <AppBar position="static">
      <Toolbar disableGutters className="app-toolbar">
        <Tooltip title="Switch User">
          <IconButton onClick={onAvatarClick}>
            <UserAvatar user={activeUser || { id: 0, name: "" }} />
          </IconButton>
        </Tooltip>
        <div>
          <Typography className="app-title main" variant="h6">
            BriefCam Social
          </Typography>
          <Typography className="app-title" variant="subtitle1" lineHeight={1}>
            {activeUser?.name || ""}
          </Typography>
        </div>
        <Tooltip title="Add Post">
          <IconButton onClick={openPostEditor}>
            <AddOutlined htmlColor="white" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  )
}
