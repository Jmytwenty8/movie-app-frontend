import { Card, Typography, TextField, Stack, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../main";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Password = () => {
  const navigator = useNavigate();
  const [password, setPassword] = useState("");
  let user = useSelector((state) => state.user.currentUser);
  if (user && typeof user === "string") {
    user = JSON.parse(user);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password.length == 0) {
        navigator("/error", {
          state: { error: "Password cannot be empty" },
        });
        return;
      }
      const response = await axios.post(
        baseUrl + "/api/user/patch",
        {
          email: user.email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        navigator("/success", { state: { data: response.data } });
      }
    } catch (err) {
      navigator("/error", {
        state: { error: err.response.data.message },
      });
    }
  };
  return (
    <Card
      sx={{
        borderRadius: 10,
        width: `calc(800px - (2 * 16px))`,
        height: `calc(500px - (2 * 16px))`,
        display: "block",
        margin: "0 auto",
        marginTop: 10,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant='h3' align='center' marginTop={10}>
          PASSWORD
        </Typography>
        <TextField
          sx={{
            display: "flex",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
          label='Password'
          value={password}
          type='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Stack textAlign='center' direction={"row"} display={"block"}>
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
            UPDATE PASSWORD
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default Password;
