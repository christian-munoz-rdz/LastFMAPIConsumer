import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

const ProfileScreen = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Desarrollador Full Stack con pasión por crear aplicaciones web y móviles eficientes.",
    avatarUrl: "https://via.placeholder.com/150", // Puedes reemplazar esta URL con una imagen real.
    favoriteAlbums: [
      {
        title: "Album 1",
        artist: "Artist 1",
      },
      {
        title: "Album 2",
        artist: "Artist 2",
      },
      {
        title: "Album 3",
        artist: "Artist 3",
      },
    ]
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
      <Avatar src={user.avatarUrl} sx={{ width: 200, height: 200, mb: 2 }} />
      <Typography variant="h1">{user.name}</Typography>
      <Typography variant="h2" color="text.secondary">
        {user.email}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mt: 2, textAlign: "center" }}
      >
        {user.bio}
      </Typography>
      <Box sx={{ mt: 4, width: "100%" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Álbumes Favoritos
        </Typography>
        <Grid container spacing={2}>
          {user.favoriteAlbums.map((album, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
          <Typography variant="h6">{album.title}</Typography>
          <Typography color="text.secondary">{album.artist}</Typography>
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
