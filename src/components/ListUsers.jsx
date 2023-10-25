import { Card, Typography, Button, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../helpers/apiHelpers";
import { baseUrl } from "../main";
import axios from "axios";

const ListUsers = () => {
  const [usersData, setUsersData] = useState([]);

  const handleCancellation = async (id) => {
    try {
      const response = await axios.post(
        baseUrl + "/api/user/remove",
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
      const response = await getAllUsers();
      setUsersData(response);
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
            USERS
          </Typography>
        </Stack>
      </Box>
      {usersData ? (
        <Box
          direction={"column"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          {usersData &&
            usersData.map((user) => {
              return (
                <Stack direction={"row"} key={user._id}>
                  <Card
                    key={user._id}
                    sx={{
                      borderRadius: 8,
                      width: `calc(1000px - (2 * 8px))`,
                      height: `calc(300px - (2 * 8px))`,
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
                      Name: <b>{user.name}</b>
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
                      Email: <b>{user.email}</b>
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
                      Number: <b>{user.number}</b>
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
                      Role: <b>{user.role}</b>
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
                      Wallet: <b>{user.wallet}</b>
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
                        onClick={() => handleCancellation(user._id)}
                        sx={{
                          bgcolor: "#2b2d42",
                          ":hover": {
                            bgcolor: "#121217",
                          },
                          color: "white",
                        }}
                        size='large'
                      >
                        Delete User
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
              No Users Found
            </Typography>
          </Card>
        </Box>
      )}
    </>
  );
};

export default ListUsers;
