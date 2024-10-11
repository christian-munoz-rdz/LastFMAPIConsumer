import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Box, Container } from "@mui/system";
import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";

import { AuthContext } from "../context/auth-context";
import { useAlertMessage } from "../hooks/useAlertMessage";
import { getTrackInfo } from "../services/tracks/getTrackInfo";
import { addSongToFav } from "../services/rest/users/usersApi";
import { createReview } from "../services/rest/reviews/reviewsApi";
import { Track } from "../domain/entities/trackInfo";
import { Song } from "../domain/models/song";

const TrackPage = () => {

  const { currentUser } = useContext(AuthContext);

  const { artist, track } = useParams<{ artist: string; track: string }>();
  const [pageTrack, setPageTrack] = useState<Track | null>(null);
  const [formData, setFormData] = useState({
    comment: "",
    rating: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { AlertMessage, changeAlertMessage, openAlert } = useAlertMessage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const song = {
      songName: pageTrack?.name,
      artist: pageTrack?.artist.name,
    };
    createReview(currentUser, song, formData.comment, formData.rating)
      .then((response) => {
        changeAlertMessage("Notificación",response.message);
        openAlert();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleAddToFavorites = () => {
    const song: Song = {
      songName: pageTrack.name,
      artist: pageTrack.artist.name,
    };
    addSongToFav(currentUser, song)
      .then((response) => {
        changeAlertMessage("Notificación",response.message);
        openAlert();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trackInfo = await getTrackInfo(track, artist);
        setPageTrack(trackInfo);
      } catch (error) {
        console.error(error);
        setError("Error al cargar la información");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      { loading? <CircularProgress size="30px" /> : <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          backgroundColor: "#121212",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Card sx={{ maxWidth: "100%", height: "100%", padding: 1 }}>
            <CardContent>
              {pageTrack?.album ? (
                <img
                  src={pageTrack.album.image[3]["#text"]}
                  alt={pageTrack.album.title}
                />
              ) : 
              (
                <img
                  src= "https://images.squarespace-cdn.com/content/v1/5d2e2c5ef24531000113c2a4/1564770260590-G0RAKA339WW6KD91L6M5/album-placeholder.png?format=500w"
                  alt= "placeholderImage"
                />
              )
              }
              <Typography gutterBottom variant="h2" component="div">
                {pageTrack?.name}
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {pageTrack?.artist.name}
              </Typography>
              <Typography variant="h4" color="text.secondary">
                Album: {pageTrack?.album? pageTrack?.album.title :""}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {Number(pageTrack?.playcount).toLocaleString()} reproducciones
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Tags: {pageTrack?.toptags.tag.map((tag) => tag.name).join(", ")}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {pageTrack?.wiki.summary}
              </Typography>
              <Button
                variant="contained"
                size="medium"
                onClick={handleAddToFavorites}
              >
                Añadir a favoritos
              </Button>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Deja una reseña
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">Comentario:</Typography>
              <textarea
                name="comment"
                required
                rows={4}
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                value={formData.comment}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">Calificación:</Typography>
              <select
                name="rating"
                required
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="">Selecciona una calificación</option>
                <option value="1">1 - Muy malo</option>
                <option value="2">2 - Malo</option>
                <option value="3">3 - Regular</option>
                <option value="4">4 - Bueno</option>
                <option value="5">5 - Excelente</option>
              </select>
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </form>
        </Box>
      </Container> }
      
      <AlertMessage />

    </>
  );
};

export default TrackPage;
