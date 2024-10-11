import { useEffect, useState, useContext } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import CustomList from "./CustomList";
import { Track } from "../../domain/entities/trackList";
import { Playlist } from "../../domain/models/playlist";
import { AuthContext } from "../../context/auth-context";
import {
  getPlaylists,
  addSongToPlaylist,
} from "../../services/rest/playlists/playlistsApi";

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  track: Track | null;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ open, handleClose, track }: CustomModalProps) => {

  const { currentUser } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [checkedPlaylists, setCheckedPlaylists] = useState<string[]>([]);

  useEffect(() => {

    const fetchPlaylists = async () => {
      try {
        const data = await getPlaylists(currentUser);
        setPlaylists(data.playlists);
      } catch (error) {
        console.error(error);
      }
    };

    if (open) {
      fetchPlaylists();
    }
    
  }, [currentUser, open]);

  const handleToggle = (playlistName: string) => {
    const currentIndex = checkedPlaylists.indexOf(playlistName);
    const newChecked = [...checkedPlaylists];

    if (currentIndex === -1) {
      newChecked.push(playlistName);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedPlaylists(newChecked);
  };

  const handleAddToPlaylists = async () => {
    if (track) {
      try {
        await Promise.all(
          checkedPlaylists.map(async (playlistName) => {
            await addSongToPlaylist(currentUser, playlistName, {
              songName: track.name,
              artist: track.artist.name,
            });
          })
        );
        setCheckedPlaylists([]);
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleModalClose = () => {
    setCheckedPlaylists([]);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-description" sx={{ mt: 2, color: "black" }}>
          Añadir "{track?.name}" a mis playlists
        </Typography>
        <CustomList
          playlists={playlists}
          checked={checkedPlaylists}
          handleToggle={handleToggle}
        />
        <Button onClick={handleAddToPlaylists}>Añadir a mis playlists</Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
