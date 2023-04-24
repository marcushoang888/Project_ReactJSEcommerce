import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "30vh",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
