import React, { ReactNode } from "react";
import { Box, CssBaseline, CircularProgress } from "@mui/material";
import HeaderMFE from "../components/HeaderMFE";
import FooterMFE from "../components/FooterMFE";
import { useAuth } from "../shared/hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh" 
      }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <HeaderMFE />
       {children}
      <FooterMFE />
    </Box>
  );
};

export default Layout;
