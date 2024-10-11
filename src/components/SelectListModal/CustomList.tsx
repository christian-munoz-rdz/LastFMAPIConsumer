
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import { Playlist } from "../../domain/models/playlist";

interface CustomListProps {
  playlists: Playlist[];
  checked: string[];
  handleToggle: (playlistName: string) => void;
}

const CustomList = ({ playlists, checked, handleToggle }: CustomListProps) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "inherit" }}>
      {playlists.map((playlist) => {
        const labelId = `checkbox-list-label-${playlist.playlistName}`;

        return (
          <ListItem key={playlist.playlistName} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => handleToggle(playlist.playlistName)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(playlist.playlistName)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={playlist.playlistName}
                sx={{ color: "black" }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CustomList;

