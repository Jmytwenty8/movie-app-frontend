import { Card, Typography, Button, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchMovieDetails,
  getTheaterById,
  getAllShows,
} from "../helpers/apiHelpers";
import { baseUrl } from "../main";
import axios from "axios";
import dayjs from "dayjs";

const ListShows = () => {
  const [showData, setShowData] = useState([]);

  const handleCancellation = async (id) => {
    try {
      const response = await axios.post(
        baseUrl + "/api/show/delete",
        {
          _id: id,
        },
        { withCredentials: true }
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/success", { state: { data: response.data } });
      }
    } catch (err) {
      navigate("/error", {
        state: { error: err?.response?.data?.message },
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const allShows = await getAllShows();
      const resolvedData = await Promise.all(
        allShows.map(async (show) => {
          const data = {};
          data._id = show._id;
          data.showtime = show.showtime;
          const movieDetails = await fetchMovieDetails(show.movieId);
          data.movie = movieDetails.name;
          const theaterDetails = await getTheaterById(show.theaterId);
          data.theater = theaterDetails.name;
          data.startDate = dayjs(show.startDate).format("DD-MM-YYYY");
          data.endDate = dayjs(show.endDate).format("DD-MM-YYYY");
          return data;
        })
      );
      setShowData(resolvedData);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Box
        direction={"column"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Stack>
          <Typography
            variant='h3'
            align='center'
            marginBottom={0}
            marginTop={10}
            marginLeft={50}
            marginRight={50}
          >
            SHOWS
          </Typography>
          <Button
            variant='contained'
            onClick={() => {
              navigate("/addShows");
            }}
            sx={{
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
              color: "white",
              marginLeft: 40,
              marginRight: 40,
            }}
            size='large'
          >
            Add Shows
          </Button>
        </Stack>
      </Box>
      {showData.length > 0 ? (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {showData.length > 0 &&
            showData.map((show) => {
              return (
                <Stack direction={"row"} key={show._id}>
                  <Card
                    key={show._id}
                    sx={{
                      borderRadius: 8,
                      width: `calc(1000px - (2 * 8px))`,
                      height: `calc(300px - (2 * 8px))`,
                      [`@media (max-width: 768px)`]: {
                        width: "100%",
                        height: "100vh",
                      },
                      marginTop: 5,
                      ":hover": {
                        boxShadow: "10px 10px 20px #ccc",
                      },
                    }}
                  >
                    <Typography
                      variant='h6'
                      marginTop={2}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Movie: <b>{show.movie}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Theater: <b>{show.theater}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Start Date: <b>{show.startDate}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Start Date: <b>{show.endDate}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={0}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Showtime: <b>{show.showtime}</b>
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Button
                        variant='contained'
                        onClick={() => handleCancellation(show._id)}
                        sx={{
                          bgcolor: "#2b2d42",
                          ":hover": {
                            bgcolor: "#121217",
                          },
                          color: "white",
                        }}
                        size='large'
                      >
                        Cancel Show
                      </Button>
                    </Box>
                  </Card>
                </Stack>
              );
            })}
        </Box>
      ) : (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Card
            sx={{
              borderRadius: 8,
              width: `calc(1000px - (2 * 8px))`,
              height: `calc(250px - (2 * 8px))`,
              [`@media (max-width: 768px)`]: {
                width: "100%",
                height: "100vh",
              },
              marginTop: 5,
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Typography
              variant='h6'
              marginTop={10}
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
        </Box>
      )}
    </>
  );
};

export default ListShows;
