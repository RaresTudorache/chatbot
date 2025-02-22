import { Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      width="100%"
      padding={2}
      spacing={2}
      borderRadius="0 0 16px 16px"
      position="sticky"
      sx={{ backgroundColor: "primary.main" }}
    >
      <Typography variant="body1" color="white">
        Pick an option
      </Typography>
    </Stack>
  );
};

export default Footer;
