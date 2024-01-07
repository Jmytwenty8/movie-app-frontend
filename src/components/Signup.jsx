import {
  Typography,
  Card,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../main";
import { useNavigate } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { MuiTelInput } from "mui-tel-input";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("+91");
  const [wallet, setWallet] = useState("");

  const navigator = useNavigate();

  const handleReset = () => {
    setEmailId("");
    setEmailPassword("");
    setName("");
    setNumber("");
    setWallet("");
  };

  return (
    <Card
      sx={{
        borderRadius: 10,
        width: `calc(800px - (2 * 16px))`,
        height: `calc(800px - (2 * 16px))`,
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
              baseUrl + "/api/user/create",
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
            if (response.status === 200) {
              response.data.signup = true;
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
          CREATE ACCOUNT
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
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            setEmailPassword(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge='end'
                >
                  {showPassword ? (
                    <GoEyeClosed fontSize='medium' />
                  ) : (
                    <GoEye fontSize='medium' />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* <TextField
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
        /> */}
        <MuiTelInput
          sx={{
            display: "flex",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
          value={number}
          defaultCountry={"IN"}
          onlyCountries={["IN"]}
          disableFormatting
          forceCallingCode
          onChange={(value) => {
            setNumber(value);
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
            Signup
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

export default Signup;
