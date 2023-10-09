import { Card, Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;
  return (
    <Card
      sx={{
        borderRadius: 8,
        width: `calc(1000px - (2 * 8px))`,
        height: `calc(250px - (2 * 8px))`,
        [`@media (max-width: 768px)`]: {
          width: "100%",
          height: "100vh",
        },
        margin: 60,
        marginTop: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <Typography
        variant='h4'
        marginTop={5}
        marginBottom={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {data?.message?.toUpperCase()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <CheckCircleIcon sx={{ color: "green" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {data.signup ? (
          <Button
            variant='contained'
            onClick={() => {
              navigate("/signin");
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
            Login
          </Button>
        ) : (
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
        )}
      </Box>
    </Card>
  );
};

export default Success;
