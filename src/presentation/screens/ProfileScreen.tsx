import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { AuthContext } from "../../context/auth-context";
import { getUserData, editDescription } from "../../services/rest/users/usersApi";
import { Track } from "../../domain/entities/trackList";
import { User } from "../../domain/models/user";
import { getTrackInfo } from "../../services/tracks/getTrackInfo";

const ProfileScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);
  const [FavList, setFavList] = useState<Track[]>([]);

  useEffect(() => {
    //Cargar los datos del usuario
    const fetchData = async () => {
      try {
        const {user } = await getUserData(currentUser);
        console.log(user);
        setUser(user);
        setFavList(user.favSongs);
        FavList.forEach(async (track) => {
          const trackInfo = await getTrackInfo(track.name, track.artist.name);
          track.image = trackInfo.album.image;
        });
        console.log(FavList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEditDescription = () => {
    const newDescription = prompt("Ingrese la nueva descripcion");
    if (newDescription) {
      editDescription(currentUser, newDescription)
        .then((response) => {
          console.log(response);
          setUser({ ...user, desription: newDescription });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
        position: "sticky",
      }}
    >
      <Avatar  sx={{ width: 200, height: 200, mb: 2 }} />
      <Typography variant="h1">{user?.email}</Typography>
      <Typography
        variant="h3"
        color="white"
        sx={{ mt: 2, textAlign: "center" }}
      >
        {user?.desription}
      </Typography>
      {/* Boton para editar la descripcion*/ }
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleEditDescription}>
        Editar Descripcion
      </Button>
      <Box sx={{ mt: 4, width: "100%" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Canciones Favoritas
        </Typography>
        <Grid container spacing={2}>
          {FavList.map((song, index) => (

        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
          <Typography variant="h6">{song.songName}</Typography>
          <Typography color="text.secondary">{song.artist}</Typography>
            </CardContent>
          </Card>
        </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
