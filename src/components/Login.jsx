import { Typography, Card, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../main";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../Store";

const Login = () => {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const navigator = useNavigate();

  const handleReset = () => {
    setEmailId("");
    setEmailPassword("");
  };

  return (
    <Card
      sx={{
        borderRadius: 10,
        width: `calc(800px - (2 * 16px))`,
        height: `calc(600px - (2 * 16px))`,
        [`@media (max-width: 768px)`]: {
          width: "100%",
          height: "100vh",
        },
        display: "block",
        margin: "0 auto",
        marginTop: 10,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <form
        onReset={handleReset}
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            const response = await axios.post(
              baseUrl + "/api/user/login",
              {
                email: emailId,
                password: emailPassword,
              },
              {
                withCredentials: true,
              }
            );
            if (response.status === 200) {
              dispatch(userActions.login(response.data.data));
              navigator("/success", { state: { data: response.data } });
            }
          } catch (err) {
            navigator("/error", {
              state: { error: err.response.data.message },
            });
          }
        }}
      >
        <Typography variant='h3' align='center' marginTop={10}>
          LOGIN
        </Typography>
        <TextField
          sx={{
            display: "flex",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
          label='Email'
          value={emailId}
          onChange={(e) => {
            setEmailId(e.target.value);
          }}
        />
        <TextField
          sx={{
            display: "flex",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
          label='Password'
          value={emailPassword}
          type='password'
          onChange={(e) => {
            setEmailPassword(e.target.value);
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
            Login
          </Button>
          <Button
            variant='contained'
            sx={{
              marginTop: 5,
              marginLeft: 10,
              marginRight: 10,
              bgcolor: "#f44336",
              ":hover": {
                bgcolor: "#b71c1c",
              },
              color: "white",
            }}
            size='large'
            type='reset'
          >
            Reset
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default Login;
