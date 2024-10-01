import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  radioClasses,
  Rating,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

let Reviews = [
  {
    id: 1,
    name: "John Doe",
    comment:
      "This is a beautiful song since I heard it I can't stop listening to it",
    rating: 5,
  },
  {
    id: 2,
    name: "Jane Doe",
    comment: "I don't like this song, it's not my style",
    rating: 1,
  },
  {
    id: 3,
    name: "John Doe",
    comment:
      "This is a beautiful song since I heard it I can't stop listening to it",
    rating: 5,
  },
  {
    id: 4,
    name: "Jane Doe",
    comment: "I don't like this song, it's not my style",
    rating: 1,
  },
  {
    id: 5,
    name: "John Doe",
    comment:
      "This is a beautiful song since I heard it I can't stop listening to it",
    rating: 5,
  },
  {
    id: 6,
    name: "John Doe",
    comment:
      "This is a beautiful song since I heard it I can't stop listening to it",
    rating: 5,
  },
  {
    id: 7,
    name: "Jane Doe",
    comment: "I don't like this song, it's not my style",
    rating: 1,
  },
  {
    id: 8,
    name: "John Doe",
    comment:
      "This is a beautiful song since I heard it I can't stop listening to it",
    rating: 5,
  },
  {
    id: 9,
    name: "Jane Doe",
    comment: "I don't like this song, it's not my style",
    rating: 1,
  },
  {
    id: 10,
    name: "John Doe",
    comment:
      "This is a beautiful song since I heard it I can't stop listening to it",
    rating: 5,
  },
];

const ReviewsScreen = () => {
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
      <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 16 }}
        >
          {Reviews.map((review, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Card sx={{ width: "100%" }} onClick={() => {}}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {review.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {review.comment}
                    </Typography>
                    <Rating name="read-only" value={review.rating} readOnly />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default ReviewsScreen;
