import { Card, Typography, Button, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTheaters } from "../helpers/apiHelpers";
import { baseUrl } from "../main";
import axios from "axios";

const ListTheaters = () => {
  const [theaterData, setTheaterData] = useState([]);

  const handleCancellation = async (id) => {
    try {
      const response = await axios.post(
        baseUrl + "/api/theater/delete",
        { id: id },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/success", { state: { data: response.data } });
      }
    } catch (err) {
      navigate("/error", {
        state: { error: err?.response?.data?.message },
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllTheaters();
      setTheaterData(response);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Box
        direction={"column"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Stack>
          <Typography
            variant='h3'
            align='center'
            marginBottom={1}
            marginTop={10}
            marginLeft={50}
            marginRight={50}
          >
            THEATERS
          </Typography>
          <Button
            variant='contained'
            onClick={() => {
              navigate("/addTheaters");
            }}
            sx={{
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
              color: "white",
              marginLeft: 40,
              marginRight: 40,
            }}
            size='large'
          >
            Add Theater
          </Button>
        </Stack>
      </Box>
      {theaterData ? (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {theaterData &&
            theaterData.map((theater) => {
              return (
                <Stack direction={"row"} key={theater._id}>
                  <Card
                    key={theater._id}
                    sx={{
                      borderRadius: 8,
                      width: `calc(1000px - (2 * 8px))`,
                      height: `calc(250px - (2 * 8px))`,
                      [`@media (max-width: 768px)`]: {
                        width: "100%",
                        height: "100vh",
                      },
                      marginTop: 5,
                      ":hover": {
                        boxShadow: "10px 10px 20px #ccc",
                      },
                    }}
                  >
                    <Typography
                      variant='h6'
                      marginTop={2}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Theater: <b>{theater.name}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={0}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Location: <b>{theater.location}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={1}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Price: <b>{theater.price}</b>
                    </Typography>
                    <Typography
                      variant='h6'
                      marginTop={1}
                      marginBottom={1}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                        letterSpacing: 1,
                      }}
                    >
                      Total Seating : <b>{theater.totalSeats}</b>
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Button
                        variant='contained'
                        onClick={() => handleCancellation(theater._id)}
                        sx={{
                          bgcolor: "#2b2d42",
                          ":hover": {
                            bgcolor: "#121217",
                          },
                          color: "white",
                        }}
                        size='large'
                      >
                        Delete Movie
                      </Button>
                    </Box>
                  </Card>
                </Stack>
              );
            })}
        </Box>
      ) : (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Card
            sx={{
              borderRadius: 8,
              width: `calc(1000px - (2 * 8px))`,
              height: `calc(250px - (2 * 8px))`,
              [`@media (max-width: 768px)`]: {
                width: "100%",
                height: "100vh",
              },
              marginTop: 5,
              ":hover": {
                boxShadow: "10px 10px 20px #ccc",
              },
            }}
          >
            <Typography
              variant='h6'
              marginTop={10}
              marginBottom={0}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                letterSpacing: 1,
              }}
            >
              {" "}
              No Theaters Found
            </Typography>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ListTheaters;
