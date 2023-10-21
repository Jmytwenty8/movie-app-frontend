import { Card, Stack, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../main";
import axios from "axios";

const AddReview = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [onFocusRating, setOnFocusRating] = useState(false);

  const handleOnFocusRating = () => {
    setOnFocusRating(true);
  };
  const handleOnBlurRating = () => {
    setOnFocusRating(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!rating && !review) {
        navigator("/error", {
          state: { error: "Enter all Details before submitting Review" },
        });
        return;
      }
      const body = {
        id: data.id,
        rating: rating,
        description: review,
        isPending: false,
      };
      const response = await axios.post(baseUrl + "/api/review/update", body, {
        withCredentials: true,
      });
      if (response.status === 200 || response.status === 201) {
        navigator("/success", { state: { data: response.data } });
      }
    } catch (err) {
      navigator("/error", {
        state: { error: err?.response?.data?.message },
      });
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 10,
        width: `calc(800px - (2 * 16px))`,
        height: `calc(400px - (2 * 16px))`,
        display: "block",
        margin: "0 auto",
        marginTop: 10,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography
          variant='h4'
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {data.movie.toUpperCase()}
        </Typography>
        <Stack direction={"column"}>
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Review'
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Rating'
            value={rating}
            helperText={onFocusRating ? "Enter Your Rating out of 5" : ""}
            onFocus={handleOnFocusRating}
            type='number'
            onBlur={handleOnBlurRating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{
              marginTop: 5,
              marginLeft: 10,
              marginRight: 10,
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
              color: "white",
            }}
            size='large'
          >
            CREATE
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default AddReview;
