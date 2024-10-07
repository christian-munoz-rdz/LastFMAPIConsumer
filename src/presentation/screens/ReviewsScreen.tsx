import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { deleteReview, getReviews } from "../../services/rest/reviews/reviewsApi";
import { Review } from "../../domain/models/review";
import { Song } from "../../domain/models/song";
import { getTrackInfo } from '../../services/tracks/getTrackInfo';

const ReviewsScreen = () => {

  const [Reviews, setReviews] = useState<Review[]>([]);
  const {currentUser } = useContext(AuthContext);
  const [images, setImages] = useState<string[]>([]);

  //Cargar reviews del usuario
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const {reviews} = await getReviews(currentUser);
        console.log(reviews);
        setReviews(reviews);

        const tempImages: string[] = [];

        for (const review of reviews) {
          const trackInfo = await getTrackInfo(review.song.songName, review.song.artist);
          const imageUrl = trackInfo.album.image[3]["#text"];
          console.log(imageUrl);
          tempImages.push(imageUrl); // Agregar la URL de la imagen al array temporal
        }
        setImages(tempImages); // Actualizar el estado de las imágenes
        console.log(tempImages);
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchData();
  },[currentUser]);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, song: Song) => {
    event.preventDefault();
    deleteReview(currentUser, song)
    .then((response) => {
      alert(response.message);
      setReviews(Reviews.filter((review) => review.song.songName !== song.songName));
      setImages(images.filter((image) => image !== images[Reviews.findIndex((review) => review.song.songName === song.songName)]));
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <div>
      <Typography
        variant="h1"
        gutterBottom
        align="center"
        marginTop={10}
        marginBottom={6}
      >
        Reviews
      </Typography>
      <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3, marginBottom: 3 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3, xl: 4 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {Reviews.map((review, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4, xl:2 }}>
              <Card sx={{ width: "100%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={images[index]}
                  alt={review.song.songName}
                />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {review.song.songName} - {review.song.artist}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {review.comment}
                    </Typography>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <Button color="error" onClick={(event) => handleDelete(event, review.song)}>Eliminar</Button>
                  </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default ReviewsScreen;
