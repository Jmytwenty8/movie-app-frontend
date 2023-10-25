import { Card, Typography, Button, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllWishlistByUser, fetchMovieDetails } from "../helpers/apiHelpers";
import { baseUrl } from "../main";
import axios from "axios";

const ListWishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);

  const handleCancellation = async (id) => {
    try {
      const response = await axios.post(
        baseUrl + `/api/wishlist/remove/`,
        { id: id },
        {
          withCredentials: true,
        }
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
      const allWishlists = await getAllWishlistByUser();
      const resolvedData = await Promise.all(
        allWishlists.map(async (wishlist) => {
          const data = {};
          data._id = wishlist._id;
          const movieDetails = await fetchMovieDetails(wishlist.movieId);
          data.movie = movieDetails;
          return data;
        })
      );
      setWishlistData(resolvedData);
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
            marginBottom={1}
            marginTop={10}
            marginLeft={50}
            marginRight={50}
          >
            WISHLIST
          </Typography>
        </Stack>
      </Box>
      {wishlistData.length > 0 ? (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {wishlistData.length > 0 &&
            wishlistData.map((wishlist) => {
              return (
                <Stack direction={"row"} key={wishlist._id}>
                  <Card
                    key={wishlist._id}
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
                      marginBottom={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Movie: <b>{wishlist.movie.name}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={2}
                      marginBottom={2}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Actors: <b>{wishlist.movie.actors.join(",")}</b>
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
                        sx={{
                          bgcolor: "#2b2d42",
                          ":hover": {
                            bgcolor: "#121217",
                          },
                          color: "white",
                          marginRight: 2,
                        }}
                        size='large'
                        component={Link}
                        to={`/movie/${wishlist.movie._id}`}
                      >
                        Book
                      </Button>
                      <Button
                        variant='contained'
                        onClick={() => handleCancellation(wishlist._id)}
                        sx={{
                          bgcolor: "#2b2d42",
                          ":hover": {
                            bgcolor: "#121217",
                          },
                          color: "white",
                        }}
                        size='large'
                      >
                        Delete
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
              No Wishlists Found
            </Typography>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ListWishlist;
