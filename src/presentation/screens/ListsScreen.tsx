import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { Playlist } from "../../domain/models/playlist";
import { getPlaylists } from "../../services/rest/playlists/playlistsApi";

const ListsScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // Cargar las playlists del usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { playlists } = await getPlaylists(currentUser);
        console.log(playlists);
        setPlaylists(playlists);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentUser]);

  function handleCreatePlaylist() {
    throw new Error("Function not implemented.");
  }

  function handleDeleteSong():
    | import("react").MouseEventHandler<HTMLButtonElement>
    | undefined {
    throw new Error("Function not implemented.");
  }

  function handleOpenPlaylist(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div style={{ maxWidth: "100%", alignItems: "center" }}>
        <Typography variant="h4">Playlists</Typography>
      </div>

      <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 10, md: 16 }}
        >
          {playlists.map((playlist, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{playlist.playlistName}</Typography>
                  <Typography variant="body1">
                    {playlist.playlistDescription}
                  </Typography>
                  <Typography variant="h6">Canciones: </Typography>
                  {playlist.songs.map((song, index) => (
                    <Card
                      key={index}
                      sx={{ marginTop: "10px", flexDirection: "row" }}
                    >
                      <CardContent>
                        <MusicNoteIcon sx={{}} />
                        <Typography variant="body1">{song.songName}</Typography>
                        <Typography variant="body2">{song.artist}</Typography>
                        <Button color="error" onClick={handleDeleteSong}>
                          Eliminar Cancion
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    sx={{ mt: 2 }}
                    onClick={handleOpenPlaylist}
                    color="info"
                  >
                    Abrir
                  </Button>
                  <Button
                    sx={{ mt: 2 }}
                    onClick={() => {}}
                    color="error"
                  >
                    Eliminar Playlist
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleCreatePlaylist}
        >
          Agregar Playlist
        </Button>
      </Box>
    </>
  );
};

export default ListsScreen;
