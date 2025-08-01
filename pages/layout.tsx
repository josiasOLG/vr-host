import React, { ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import HeaderMFE from "../components/HeaderMFE";
import FooterMFE from "../components/FooterMFE";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <HeaderMFE />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "80px", // espaço para o header
          marginBottom: "80px", // espaço para o footer
        }}
      >
        {children}
      </Box>
      <FooterMFE />
    </Box>
  );
};

export default Layout;
