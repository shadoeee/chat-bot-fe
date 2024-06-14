import React from 'react';
import { Box, Link } from '@mui/material';

const Footer = ({ sx }) => {
  return (
    <Box sx={{ width: "100%", padding:0, minHeight: "auto", maxHeight: "auto", marginTop: 0,marginBottom:-2, color: "white", ...sx }}>
      <p style={{ fontSize: "20px", textAlign: "center",marginBottom: 0,marginTop:5 }}>
        Built with Love by <span><Link href="https://www.instagram.com/BalaDevBytes" target="_blank" rel="noopener noreferrer" sx={{fontWeight:"800", color: "lightgreen", textDecoration: "none" }}>BalaDevBytes</Link></span> Follow me on Instagram
      </p>
    </Box>
  );
};

export default Footer;