import {
  Card,
  Typography,
  TextField,
  Stack,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../main";
import { useNavigate, useParams } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";

const ForgetPassword = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password.length == 0) {
        navigator("/error", {
          state: { error: "Password cannot be empty" },
        });
        return;
      }
      if (password !== confirmPassword) {
        navigator("/error", {
          state: { error: "Password and Confirm Password do not match" },
        });
        return;
      }
      const response = await axios.post(
        baseUrl + "/api/user/resetPassword",
        {
          token: id,
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
          RESET PASSWORD
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
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            setPassword(e.target.value);
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
        <TextField
          sx={{
            display: "flex",
            marginTop: 5,
            marginLeft: 10,
            marginRight: 10,
          }}
          label='Confirm Password'
          value={confirmPassword}
          type={showPassword ? "text" : "password"}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
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

export default ForgetPassword;
