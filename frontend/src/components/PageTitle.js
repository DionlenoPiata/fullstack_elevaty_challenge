import { Typography } from "@mui/material";

export default function PageTitle({ title }) {
  return (
    <Typography color="text.primary" variant="h5">
      {title}
    </Typography>
  );
}
