import { useParams } from "react-router-dom";
import { baseUrl } from "../main";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  Typography,
  Stack,
  Rating,
  Button,
} from "@mui/material";
import MovieFilterTwoToneIcon from "@mui/icons-material/MovieFilterTwoTone";
import SupervisorAccountTwoToneIcon from "@mui/icons-material/SupervisorAccountTwoTone";
import TheatersTwoToneIcon from "@mui/icons-material/TheatersTwoTone";
import { Link } from "react-router-dom";

const Movie = () => {
  const id = useParams().id;
  const [movieData, setMovieData] = useState({});
  const [theatersData, setTheatersData] = useState([]);

  const fetchMovieDetails = async () => {
    const url = baseUrl + `/api/movie/${id}`;
    const response = await axios.get(url);
    setMovieData(response.data.data);
  };

  const getTheaterById = async (id) => {
    const response = await axios.post(
      baseUrl + "/api/theater/inquiry",
      {
        id: id,
      },
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  };
  useEffect(() => {
    fetchMovieDetails();
  }, []);

  useEffect(() => {
    movieData?.shows?.map((show) => {
      getTheaterById(show.theaterId).then((theater) => {
        theater.showtime = show.showtime;
        setTheatersData((state) => [...state, theater]);
      });
    });
  }, [movieData]);
  return (
    <Stack direction={"row"}>
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
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
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

      <Typography margin={10} marginRight={1}>
        <TheatersTwoToneIcon fontSize='large' />
      </Typography>
      <Stack direction={"column"} margin={10} marginLeft={2}>
        {theatersData?.map((theater) => {
          return (
            <Card
              key={theater._id + theater.showtime}
              sx={{
                borderRadius: 5,
                width: `calc(800px - (2 * 16px))`,
                height: `calc(150px - (2 * 16px))`,
                [`@media (max-width: 768px)`]: {
                  width: "80%",
                  height: "30vh",
                },
                margin: 2,
                marginTop: 0,
                ":hover": {
                  boxShadow: "10px 10px 20px #ccc",
                },
              }}
            >
              <Stack direction={"row"}>
                <Stack direction={"column"}>
                  <Typography variant='h5' margin={1} marginBottom={0}>
                    {theater.name}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    margin={1}
                    marginBottom={0}
                    marginTop={0}
                  >
                    {theater.location}
                  </Typography>
                  <Typography
                    variant='body1'
                    margin={1}
                    marginBottom={0}
                    marginTop={0}
                  >
                    <b>Rs. {theater.price}</b>
                  </Typography>
                  <Typography variant='body2' margin={1} marginTop={0}>
                    {theater.showtime.toUpperCase()}
                  </Typography>
                </Stack>
                <Button
                  sx={{
                    margin: "auto",
                    marginRight: 2,
                    bgcolor: "#2b2d42",
                    ":hover": {
                      bgcolor: "#121217",
                    },
                    color: "white",
                  }}
                  size='small'
                  component={Link}
                >
                  Book
                </Button>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Movie;
