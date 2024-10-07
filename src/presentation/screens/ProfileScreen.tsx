import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AuthContext } from "../../context/auth-context";
import {
  getUserData,
  editDescription,
} from "../../services/rest/users/usersApi";
import { Track } from "../../domain/entities/trackList";
import { User } from "../../domain/models/user";
import { getTrackInfo } from "../../services/tracks/getTrackInfo";

const ProfileScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState<User | null>(null);
  const [FavList, setFavList] = useState<Track[]>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    //Cargar los datos del usuario
    const fetchData = async () => {
      try {
        const { user } = await getUserData(currentUser);
        console.log(user);
        setUser(user);
        setFavList(user.favSongs);
        
        const tempImages: string[] = [];

        for (const song of FavList) {
          const trackInfo = await getTrackInfo(song.songName, song.artist);
          const imageUrl = trackInfo.album.image[3]["#text"];
          console.log(imageUrl);
          tempImages.push(imageUrl); // Agregar la URL de la imagen al array temporal
        }

        setImages(tempImages); // Actualizar el estado de las imágenes
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
      <Avatar sx={{ width: 200, height: 200, mb: 2 }} />
      <Typography variant="h1">{user?.email}</Typography>
      <Typography
        variant="h3"
        color="white"
        sx={{ mt: 2, textAlign: "center" }}
      >
        {user?.desription}
      </Typography>
      {/* Boton para editar la descripcion*/}
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleEditDescription}
      >
        Editar Descripcion
      </Button>
      <Box sx={{ mt: 4, width: "100%" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Canciones Favoritas
        </Typography>
        <Grid 
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {FavList.map((song, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Card sx={{ width: "100%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={images[index]}
                  alt={song.songName}
                />
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
