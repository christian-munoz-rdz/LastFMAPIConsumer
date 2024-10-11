import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

import { AuthContext } from "../context/auth-context";
import { Playlist } from "../domain/models/playlist";
import { Song } from "../domain/models/song";
import {
  getPlaylists,
  createPlaylist,
  deletePlaylist,
  removeSongFromPlaylist,
} from "../services/rest/playlists/playlistsApi";

const ListsScreen = () => {
  
  const { currentUser } = useContext(AuthContext);

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const [newPlaylistSongs, setNewPlaylistSongs] = useState<Song[]>([]);

  //* Cargar las playlists del usuario
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { playlists } = await getPlaylists(currentUser);
        setPlaylists(playlists);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentUser]);

  //! Función para abrir el diálogo de creación de playlist
  const handleCreatePlaylist = () => {
    setIsCreateDialogOpen(true);
  };

  //! Función para enviar los datos de la nueva playlist
  const handleCreatePlaylistSubmit = async () => {
    try {
      await createPlaylist(
        currentUser,
        newPlaylistName,
        newPlaylistDescription,
        newPlaylistSongs
      );
      // Recargar playlists
      const { playlists } = await getPlaylists(currentUser);
      setPlaylists(playlists);
      // Resetear formulario y cerrar diálogo
      setNewPlaylistName("");
      setNewPlaylistDescription("");
      setNewPlaylistSongs([]);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  //* Función para eliminar una canción de una playlist
  const handleDeleteSong = async (playlist: Playlist, song: Song) => {
    try {
      await removeSongFromPlaylist(currentUser, playlist.playlistName, song);
      // Actualizar el estado local
      const updatedPlaylists = playlists.map((p) => {
        if (p.playlistName === playlist.playlistName) {
          return {
            ...p,
            songs: p.songs.filter(
              (s) =>
                s.songName !== song.songName || s.artist !== song.artist
            ),
          };
        }
        return p;
      });
      setPlaylists(updatedPlaylists);
    } catch (error) {
      console.error(error);
    }
  };

  //* Función para eliminar una playlist
  const handleDeletePlaylist = async (playlist: Playlist) => {
    try {
      await deletePlaylist(currentUser, playlist.playlistName);
      // Actualizar el estado local
      setPlaylists(playlists.filter((p) => p.playlistName !== playlist.playlistName));
    } catch (error) {
      console.error(error);
    }
  };

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
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
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
                        <MusicNoteIcon />
                        <Typography variant="body1">{song.songName}</Typography>
                        <Typography variant="body2">{song.artist}</Typography>
                        <Button
                          color="warning"
                          onClick={() => handleDeleteSong(playlist, song)}
                        >
                          Eliminar Cancion
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    sx={{ mt: 2 }}
                    onClick={() => handleDeletePlaylist(playlist)}
                    color="error"
                  >
                    Eliminar Playlist
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleCreatePlaylist}
        >
          Crear Playlist
        </Button>
      </Box>

      {/* Diálogo para crear una nueva playlist */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      >
        <DialogTitle>Crear Nueva Playlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Playlist"
            type="text"
            fullWidth
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            fullWidth
            value={newPlaylistDescription}
            onChange={(e) => setNewPlaylistDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCreatePlaylistSubmit} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListsScreen;
