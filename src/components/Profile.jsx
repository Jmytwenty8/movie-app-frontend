import { Typography, Card, TextField, Button, Stack } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { baseUrl } from "../main";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../Store";
import Cookies from "js-cookie";

const Profile = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.currentUser);
  if (user && typeof user === "string") {
    user = JSON.parse(user);
  }
  const [emailId, setEmailId] = useState(user?.email);
  const [emailPassword, setEmailPassword] = useState("");
  const [name, setName] = useState(user?.name);
  const [number, setNumber] = useState(user?.number);
  const [wallet, setWallet] = useState(user?.wallet);
  const [role, setRole] = useState(user?.role);

  const navigator = useNavigate();

  const getUserData = async (data) => {
    const response = axios.post(baseUrl + "/api/user/getUser", data);
    return response;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        baseUrl + "/api/user/patch",
        {
          email: emailId,
          password: emailPassword,
          name: name,
          number: number,
          wallet: wallet,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200 || response.status === 201) {
        const res = await getUserData({ email: emailId });
        dispatch(userActions.login(res.data.data));
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
        height: `calc(900px - (2 * 16px))`,
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
      <form onSubmit={handleSubmit}>
        <Typography variant='h3' align='center' marginTop={10}>
          PROFILE
        </Typography>
        <TextField
          sx={{
            display: "flex",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
          label='Name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          onChange={(e) => {
            setEmailPassword(e.target.value);
          }}
        />
        <TextField
          sx={{
            display: "flex",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
          label='Number'
          value={number}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => {
            setNumber(e.target.value);
          }}
        />
        <TextField
          sx={{
            display: "flex",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
          label='Wallet'
          value={wallet}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => {
            setWallet(e.target.value);
          }}
        />
        <TextField
          sx={{
            display: "flex",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
          label='Role'
          value={role}
          disabled
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
            UPDATE
          </Button>
          {/* <Button
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
          </Button> */}
        </Stack>
      </form>
    </Card>
  );
};

export default Profile;
