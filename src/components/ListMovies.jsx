import { Card, Typography, Button, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../helpers/apiHelpers";
import { baseUrl } from "../main";
import axios from "axios";

const ListMovies = () => {
  const [movieData, setMovieData] = useState([]);

  const handleCancellation = async (id) => {
    try {
      const response = await axios.delete(baseUrl + `/api/movie/remove/${id}`, {
        withCredentials: true,
      });
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
      const response = await getMovies();
      setMovieData(response.data);
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
            Movies
          </Typography>
          <Button
            variant='contained'
            onClick={() => {
              navigate("/addMovies");
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
            Add Movies
          </Button>
        </Stack>
      </Box>
      {movieData.length > 0 ? (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {movieData.length > 0 &&
            movieData.map((movie) => {
              return (
                <Stack direction={"row"} key={movie._id}>
                  <Card
                    key={movie._id}
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
                      marginTop={2}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Movie: <b>{movie.name}</b>
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
                      IMDB: <b>{movie.imdb}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={1}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Actors: <b>{movie.actors.join(",")}</b>
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
                        onClick={() => handleCancellation(movie._id)}
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
              No Movies Found
            </Typography>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ListMovies;
