import { useParams } from "react-router-dom";
import { baseUrl } from "../main";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardMedia, Typography, Stack, Rating } from "@mui/material";
import MovieFilterTwoToneIcon from "@mui/icons-material/MovieFilterTwoTone";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";

const Movie = () => {
  const id = useParams().id;
  const [movieData, setMovieData] = useState({});

  const fetchMovieDetails = async () => {
    const url = baseUrl + `/api/movie/${id}`;
    const response = await axios.get(url);
    setMovieData(response.data.data);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);
  return (
    <Card
      sx={{
        borderRadius: 8,
        width: `calc(800px - (2 * 16px))`,
        height: `calc(800px - (2 * 16px))`,
        [`@media (max-width: 768px)`]: {
          width: "100%",
          height: "100vh",
        },
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
      }}
    >
      <CardMedia
        sx={{ height: "50%", width: "100%" }}
        image={movieData?.imageUrl}
        title={movieData?.name}
      />

      <Typography
        gutterBottom
        variant='h6'
        component='div'
        margin={2}
        marginLeft={4}
      >
        <MovieFilterTwoToneIcon fontSize='large' />
      </Typography>

      <Typography
        gutterBottom
        variant='h3'
        component='div'
        margin={4}
        marginTop={2}
        marginBottom={2}
      >
        {movieData?.name?.toUpperCase()}
      </Typography>
      <Typography
        gutterBottom
        variant='body1'
        component='div'
        margin={2}
        marginLeft={4}
      >
        {movieData?.description}
      </Typography>
      <Stack direction={"row"}>
        <Typography
          gutterBottom
          variant='body1'
          component='div'
          marginLeft={4}
          marginRight={2}
        >
          <SupervisorAccountTwoToneIcon />
        </Typography>
        <Typography gutterBottom variant='body1' component='div'>
          <b>{movieData?.actors?.join(", ")}</b>
        </Typography>
      </Stack>
      <Stack marginLeft={4}>
        <Rating value={movieData.imdb % 5} precision={0.5} />
        <Typography>
          <b>
            Runtime: {String(movieData.runtime / 60)[0]} hours{" "}
            {(String(movieData.runtime / 60)[2] / 10) * 60} minutes
          </b>
        </Typography>
      </Stack>
    </Card>
  );
};

export default Movie;
