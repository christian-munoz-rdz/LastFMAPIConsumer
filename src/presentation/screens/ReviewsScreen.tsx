import {
  Box,
  Card,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import Reviews from "./Reviews";

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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default ReviewsScreen;
