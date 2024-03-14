import React, { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery, Button } from "@mui/material"; // Import Button component
import Form from "./Form";
import Form2 from "./Form2";
import Navbar from "scenes/navbar";
import bgImage from "./bg2.jpg";

const LoginPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);

  const handleForm1Click = () => {
    setShowForm1(true);
    setShowForm2(false);
  };

  const handleForm2Click = () => {
    setShowForm1(false);
    setShowForm2(true);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          color: "#fff",
          textAlign: "center",
          padding: "150px 0",
          position: "relative",
          borderBottom: "1px solid #343a40",
          height: "60vh",
          backgroundColor: "rgba(28, 28, 28, 0.8)",
        }}
      >
        <Typography
          fontWeight="bold"
          color="primary"
          fontSize="clamp(2rem, 5vw, 5rem)"
          sx={{
            backgroundColor: "primary",
            backgroundImage: `linear-gradient(45deg, #5514B4, #FF80FF)`,
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            "&:hover": {
              backgroundColor: "primary",
              backgroundImage: `linear-gradient(180deg, #5514B4, #FF80FF)`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "all 500ms ease-in-out",
              cursor: "pointer",
            },
          }}
        >
          PAKISTAN LEGAL AWARENESS FACILITIES
        </Typography>
        <Typography fontSize="1.2rem" mt={3}>
          It has the privileged to be the “First website on law in Haripur
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center", height: "40vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Form Section */}
        <Box
          width={isMobile ? "80%" : "50%"}
          p="2rem"
          margin="2rem"
          textAlign="center"
          borderRadius="2rem"
          boxShadow="0 -2px 10px rgba(0, 0, 225, 225);"
          backgroundColor={theme.palette.mode === "dark" ? "#343a40" : "#0c0c0c"}
          color="white"
          sx={{
            "&:hover": {
              boxShadow: "0 0 10px 0 rgb(255,255,255)",
              transition: "all 500ms ease-in-out",
            },
          }}
        >
          <Typography color="teal" fontWeight="500" variant="h5" mt={2} mb={2}>
            {showForm1 ? "Looking for Lawyer?" : "Looking for Clients?"}
          </Typography>
          {showForm1 && <Form />}
          {showForm2 && <Form2 />}
          <Box mt={2}>
            <Button variant="contained" color="primary" onClick={handleForm1Click}>
              Looking for Lawyer?
            </Button>
            <Button variant="contained" color="primary" onClick={handleForm2Click} sx={{ marginLeft: "1rem" }}>
              Looking for Clients?
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
