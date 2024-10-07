import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const playlists = [
  {
    id: 1,
    name: "Playlist 1",
    description:
      "This is a beautiful playlist since I heard it I can't stop listening to it",
    rating: 5,
    tracks: [
      {
        id: 1,
        name: "Track 1",
        duration: "3:00",
      },
      {
        id: 2,
        name: "Track 2",
        duration: "3:00",
      },
      {
        id: 3,
        name: "Track 3",
        duration: "3:00",
      },
    ],
  },
  {
    id: 2,
    name: "Playlist 2",
    description: "I don't like this playlist, it's not my style",
    rating: 1,
    tracks: [
      {
        id: 1,
        name: "Track 1",
        duration: "3:00",
      },
      {
        id: 2,
        name: "Track 2",
        duration: "3:00",
      },
      {
        id: 3,
        name: "Track 3",
        duration: "3:00",
      },
    ],
  },
  {
    id: 3,
    name: "Playlist 3",
    description:
      "This is a beautiful playlist since I heard it I can't stop listening to it",
    rating: 5,
    tracks: [
      {
        id: 1,
        name: "Track 1",
        duration: "3:00",
      },
      {
        id: 2,
        name: "Track 2",
        duration: "3:00",
      },
      {
        id: 3,
        name: "Track 3",
        duration: "3:00",
      },
    ],
  },
  {
    id: 4,
    name: "Playlist 4",
    description: "I don't like this playlist, it's not my style",
    rating: 1,
    tracks: [
      {
        id: 1,
        name: "Track 1",
        duration: "3:00",
      },
      {
        id: 2,
        name: "Track 2",
        duration: "3:00",
      },
      {
        id: 3,
        name: "Track 3",
        duration: "3:00",
      },
    ],
  },
  {
    id: 5,
    name: "Playlist 5",
    description:
      "This is a beautiful playlist since I heard it I can't stop listening to it",
    rating: 5,
    tracks: [
      {
        id: 1,
        name: "Track 1",
        duration: "3:00",
      },
      {
        id: 2,
        name: "Track 2",
        duration: "3:00",
      },
      {
        id: 3,
        name: "Track 3",
        duration: "3:00",
      },
    ],
  },
  {
    id: 6,
    name: "Playlist 5",
    description:
      "This is a beautiful playlist since I heard it I can't stop listening to it",
    rating: 5,
    tracks: [
      {
        id: 1,
        name: "Track 1",
        duration: "3:00",
      },
      {
        id: 2,
        name: "Track 2",
        duration: "3:00",
      },
      {
        id: 3,
        name: "Track 3",
        duration: "3:00",
      },
    ],
  },
]; //* Dummy Playlists

const ListsScreen = () => {

  return (
    <>
      
      <div style={{ maxWidth:"100%", alignItems:"center"}}>
        <Typography variant="h4" >
          Playlists
        </Typography>
      </div>

      <Box sx={{ flexGrow: 1, marginLeft: 3, marginRight: 3 }}>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 10, md: 16 }}
        >
          {playlists.map((playlist) => (
            <div key={playlist.id} style={{ marginBottom: "10px" }}>

              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6">{playlist.name}</Typography>
                    <Typography variant="body1">
                      {playlist.description}
                    </Typography>
                    <Typography variant="body2">
                      Rating: {playlist.rating}
                    </Typography>
                    <Typography variant="h6">Tracks</Typography>
                    {playlist.tracks.map((track) => (
                      <Card key={track.id} style={{ marginTop: "10px" }}>
                        <CardContent>
                          <Typography variant="body1">{track.name}</Typography>
                          <Typography variant="body2">
                            {track.duration}
                          </Typography>
                        </CardContent>
                      </Card>))}
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ListsScreen;
