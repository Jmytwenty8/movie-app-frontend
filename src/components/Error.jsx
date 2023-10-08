import { Card, Stack, Typography, Box, Button } from "@mui/material";
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
      <Stack margin={5} marginLeft={40}>
        <Typography variant='h4' marginBottom={2} marginLeft={2} color={"red"}>
          {data.toUpperCase()}
        </Typography>
        <Box marginLeft={20}>
          <ErrorIcon />
        </Box>
      </Stack>
      <Box marginLeft={57}>
        <Button
          variant='contained'
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </Box>
    </Card>
  );
};

export default Error;
