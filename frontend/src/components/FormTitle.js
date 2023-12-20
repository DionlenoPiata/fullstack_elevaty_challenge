import { Typography } from "@mui/material";

export default function FormTitle({ title }) {
  return (
    <Typography color="text.primary" variant="h6" sx={{ marginBottom: 2 }}>
      {title}
    </Typography>
  );
}
