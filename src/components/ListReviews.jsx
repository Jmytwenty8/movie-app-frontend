/* eslint-disable no-unused-vars */
import { Card, Typography, Button, Box, Stack, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllReviewsByUser,
  fetchMovieDetails,
  getAllBookingsByUser,
} from "../helpers/apiHelpers";
import dayjs from "dayjs";
import { baseUrl } from "../main";
import axios from "axios";

const ListReviews = () => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let reviews = await getAllReviewsByUser();
      const allBookings = await getAllBookingsByUser();
      const filteredReviews = reviews.filter((review) => {
        return !allBookings.some((booking) => booking._id === review.bookingId);
      });
      filteredReviews.map(async (review) => {
        const removeReview = await axios.post(
          baseUrl + "/api/review/remove",
          { id: review._id },
          { withCredentials: true }
        );
      });
      reviews = await getAllReviewsByUser();
      const resolvedData = await Promise.all(
        reviews.map(async (review) => {
          const data = {
            ...review,
          };
          data.reservationDate = review.reservationDate;
          const movieDetails = await fetchMovieDetails(review.movieId);
          data.movie = movieDetails.name;
          return data;
        })
      );
      setReviewData(resolvedData);
    };
    fetchData();
  }, []);

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
            REVIEWS
          </Typography>
        </Stack>
      </Box>
      {reviewData.length > 0 ? (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {reviewData &&
            reviewData.map((review) => {
              return (
                <Stack direction={"row"} key={review._id}>
                  {review.isPending ? (
                    <Card
                      key={review._id}
                      sx={{
                        borderRadius: 8,
                        width: `calc(1000px - (2 * 8px))`,
                        height: `calc(180px - (2 * 8px))`,
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
                        Movie: <b>{review.movie}</b>
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
                        Reservation Date :{" "}
                        <b>
                          {dayjs(review.reservationDate).format("DD-MM-YYYY")}
                        </b>
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
                          }}
                          size='large'
                          component={Link}
                          state={{
                            id: review._id,
                            movie: review.movie,
                          }}
                          to={"/addReview"}
                          disabled={
                            dayjs(review.reservationDate).format(
                              "DD-MM-YYYY"
                            ) >= dayjs().format("DD-MM-YYYY")
                              ? true
                              : false
                          }
                        >
                          Write Review
                        </Button>
                      </Box>
                    </Card>
                  ) : (
                    <Card
                      key={review._id}
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
                        Movie: <b>{review.movie}</b>
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
                        Description: <b>{review.description}</b>
                      </Typography>
                      <Rating
                        value={review.rating}
                        precision={0.5}
                        sx={{
                          pointerEvents: "none",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      />
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
                        Reservation Date :{" "}
                        <b>
                          {dayjs(review.reservationDate).format("DD-MM-YYYY")}
                        </b>
                      </Typography>
                    </Card>
                  )}
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
              No Movies Found For Review
            </Typography>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ListReviews;
