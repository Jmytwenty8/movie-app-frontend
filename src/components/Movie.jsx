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
import { getTheaterById, getAllWishlistByUser } from "../helpers/apiHelpers";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Movie = () => {
  dayjs.extend(isBetween);
  const movieId = useParams().id;
  const [movieData, setMovieData] = useState({});
  const [theatersData, setTheatersData] = useState([]);
  const [date, setDate] = useState(dayjs());
  const [wishlist, setWishlist] = useState(false);
  const [wishlistId, setWishlistId] = useState("");

  const fetchMovieDetails = async () => {
    const url = baseUrl + `/api/movie/${movieId}`;
    const response = await axios.get(url);
    setMovieData(response.data.data);
  };

  const makeWishlist = async (id) => {
    if (wishlist) return;
    const url = baseUrl + `/api/wishlist/create`;
    const response = await axios.post(
      url,
      {
        movieId: id,
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      setWishlist(true);
      setWishlistId(response.data.data._id);
    }
  };

  const removeWishlist = async (id) => {
    if (!wishlist) return;
    getAllWishlistByUser()
      .then((data) => {
        data.map((wishlist) => {
          if (wishlist.movieId === id) {
            axios.post(
              baseUrl + "/api/wishlist/remove",
              { id: wishlist._id },
              { withCredentials: true }
            );
          }
        });
      })
      .then(() => {
        setWishlist(false);
      });
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  useEffect(() => {
    getAllWishlistByUser().then((data) => {
      data.map((movie) => {
        if (movie.movieId === movieId) {
          setWishlist(true);
        }
      });
    });
  }, []);

  useEffect(() => {
    setTheatersData([]);
    movieData?.shows?.map((show) => {
      let dateISO = dayjs(date).format();
      let startDateISO = dayjs(show.startDate).format();
      let endDateISO = dayjs(show.endDate).format();
      if (dayjs(dateISO).isBetween(startDateISO, endDateISO, null, "[]")) {
        getTheaterById(show.theaterId).then((theater) => {
          theater.showtime = show.showtime;
          setTheatersData((state) => [...state, theater]);
        });
      }
    });
  }, [movieData, date]);

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
          marginBottom={2}
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

        <Stack direction={"row"}>
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
          {!wishlist ? (
            <Button onClick={() => makeWishlist(movieData._id)}>
              <FavoriteBorderIcon color='error' />
            </Button>
          ) : (
            <Button onClick={() => removeWishlist(movieData._id)}>
              <FavoriteIcon color='error' />
            </Button>
          )}
        </Stack>
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
          <Rating
            value={movieData.imdb % 5}
            precision={0.5}
            sx={{
              pointerEvents: "none",
            }}
          />
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
        <DatePicker
          sx={{
            display: "flex",
            marginTop: 2,
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 2,
          }}
          label='Select Date'
          value={date}
          disablePast
          onChange={(val) => {
            const date = dayjs(val).format();
            setDate(date);
          }}
        />
        {theatersData.length > 0 ? (
          theatersData?.map((theater) => {
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
                    <Typography
                      variant='h5'
                      margin={1}
                      marginLeft={2}
                      marginBottom={0}
                    >
                      {theater.name}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      margin={1}
                      marginBottom={0}
                      marginLeft={2}
                      marginTop={0}
                    >
                      {theater.location}
                    </Typography>
                    <Typography
                      variant='body1'
                      margin={1}
                      marginBottom={0}
                      marginLeft={2}
                      marginTop={0}
                    >
                      <b>Rs. {theater.price}</b>
                    </Typography>
                    <Typography
                      variant='body2'
                      margin={1}
                      marginLeft={2}
                      marginTop={0}
                    >
                      <b>Timing: {theater.showtime.toUpperCase()}</b>
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
                    state={{
                      theaterId: theater._id,
                      showtime: theater.showtime,
                      movieId: movieData._id,
                      reservationDate: date,
                    }}
                    to={"/booking"}
                  >
                    Book
                  </Button>
                </Stack>
              </Card>
            );
          })
        ) : (
          <Card
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
            <Typography
              variant='h6'
              marginTop={5}
              marginBottom={0}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                letterSpacing: 1,
              }}
            >
              {" "}
              No Shows Found
            </Typography>
          </Card>
        )}
      </Stack>
    </Stack>
  );
};

export default Movie;
