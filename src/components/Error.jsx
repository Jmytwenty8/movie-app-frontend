import { Card, Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";

const Error = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.error;

  return (
    <Card
      sx={{
        borderRadius: 8,
        width: `calc(1000px - (2 * 8px))`,
        height: "auto",
        minHeight: 250,
        [`@media (max-width: 768px)`]: {
          width: "100%",
        },
        margin: 60,
        marginTop: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant='h4'
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          wordWrap: "break-word",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {Array.isArray(data) ? data[0]?.toUpperCase() : data?.toUpperCase()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 1,
          marginBottom: 1,
          color: "red",
        }}
      >
        <ErrorIcon />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Button
          variant='contained'
          onClick={() => {
            navigate("/");
          }}
          sx={{
            bgcolor: "#2b2d42",
            ":hover": {
              bgcolor: "#121217",
            },
            color: "white",
          }}
          size='large'
        >
          Home
        </Button>
      </Box>
    </Card>
  );
};

export default Error;
