import React, { ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "60px", // espaço para o header
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
