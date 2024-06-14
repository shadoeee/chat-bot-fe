import { Box, useMediaQuery,useTheme } from '@mui/material'
import React from 'react'
import TypingAnimation from '../components/typer/typingAnimation'
import Footer from '../components/footer/Footer';

const Home = () => {
  const theme = useTheme();
  const isBelowMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box sx={{ display: "flex", width: "100%", flexDirection: "column", alignItems: "center", mx: "auto" }}>
        <Box><TypingAnimation /></Box>
        <Box sx={{ width: "100%", display: "flex", flexDirection: { md: "row", xs: "column" }, gap: 5, my: 10, }}>
          <img className='image-inverted rotate' src='openai.png' alt='robot' style={{width:"100px",margin:"auto",marginTop:-60}} />
        </Box>
        <Box sx={{ display: "flex", widows: "100%", mx: "auto" }}>
          <img src='chat-page.png' alt='chatbot' style={{display:"flex",margin:"auto",width:isBelowMD ? "80%" : "60%",borderRadius:20,boxShadow:"-5px -5px 105px #8de88d",marginTop:20, marginBottom:50}} />
        </Box>
        <Footer sx={{marginBottom:5, marginTop:5,}} />
      </Box>
    </Box>
  )
}

export default Home
