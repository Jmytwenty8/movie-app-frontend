import { Card, Stack, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../main";
import axios from "axios";

const AddMovies = () => {
  const navigator = useNavigate();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [imdb, setImdb] = useState();
  const [runtime, setRuntime] = useState();
  const [actors, setActors] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [onFocusActor, setOnFocusActor] = useState(false);
  const [onFocusRuntime, setOnFocusRuntime] = useState(false);

  const handleOnFocusActor = () => {
    setOnFocusActor(true);
  };
  const handleOnFocusRuntime = () => {
    setOnFocusRuntime(true);
  };
  const handleOnBlurActor = () => {
    setOnFocusActor(false);
  };
  const handleOnBlurRuntime = () => {
    setOnFocusRuntime(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const separatedActors = actors.split(",");
      const body = {
        name: name,
        description: description,
        imdb: imdb,
        runtime: runtime,
        actors: separatedActors,
        imageUrl: imageUrl,
      };
      const response = await axios.post(baseUrl + "/api/movie/create", body, {
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
        height: `calc(700px - (2 * 16px))`,
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
          MOVIE
        </Typography>
        <Stack direction={"column"}>
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Movie Name'
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
            label='Movie Description'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='IMDB'
            value={imdb}
            onChange={(e) => {
              setImdb(e.target.value);
            }}
          />
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Runtime'
            value={runtime}
            helperText={onFocusRuntime ? "Enter Length in minutes" : ""}
            onFocus={handleOnFocusRuntime}
            onBlur={handleOnBlurRuntime}
            onChange={(e) => {
              setRuntime(e.target.value);
            }}
          />
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Actors'
            helperText={
              onFocusActor ? "Please enter actors separated by comma(,)" : ""
            }
            onFocus={handleOnFocusActor}
            onBlur={handleOnBlurActor}
            value={actors}
            onChange={(e) => {
              setActors(e.target.value);
            }}
          />
          <TextField
            sx={{
              display: "flex",
              marginTop: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
            label='Image URL'
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
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

export default AddMovies;
