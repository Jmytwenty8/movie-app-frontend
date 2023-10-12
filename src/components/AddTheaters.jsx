import { Card, Stack, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../main";
import axios from "axios";

const AddTheaters = () => {
  const navigator = useNavigate();

  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [price, setPrice] = useState();
  const [totalSeats, setTotalSeats] = useState();
  const [onFocus, setOnFocus] = useState(false);

  const handleOnFocus = () => {
    setOnFocus(true);
  };

  const handleOnBlur = () => {
    setOnFocus(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        name: name,
        location: location,
        price: price,
        totalSeats: totalSeats,
      };
      const response = await axios.post(baseUrl + "/api/theater/create", body, {
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
        height: `calc(600px - (2 * 16px))`,
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
          {" "}
          THEATER
        </Typography>
        <Stack direction={"column"}>
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Theater Name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Theater Location'
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Price'
            value={price}
            type='number'
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Total Seats'
            value={totalSeats}
            helperText={onFocus ? "Keep 25 as of right now" : ""}
            onFocus={handleOnFocus}
            type='number'
            onBlur={handleOnBlur}
            onChange={(e) => {
              setTotalSeats(e.target.value);
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

export default AddTheaters;
