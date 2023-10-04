import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  CardMedia,
} from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieCard = ({ _id, name, description, imageUrl }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 360,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <CardMedia sx={{ height: 140 }} image={imageUrl} title={name} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            margin: "auto",
            bgcolor: "#2b2d42",
            ":hover": {
              bgcolor: "#121217",
            },
            color: "white",
          }}
          size='small'
          component={Link}
          to={`/movie/${_id}`}
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

MovieCard.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default MovieCard;
