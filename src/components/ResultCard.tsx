import { Box, Stack, Typography } from "@mui/material";
import { COPY } from "../constants/strings";
import type { OptimizerResult } from "../utils/optimizer";

type Props = { result: OptimizerResult };

export const ResultCard = ({ result }: Props) => (
  <Stack spacing={2}>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {COPY.bestClinicianLabel}
      </Typography>
      <Typography variant="h5">{result.clinician.name}</Typography>
    </Box>

    <Box>
      <Typography variant="body2" color="text.secondary">
        {COPY.roundTripLabel}
      </Typography>
      <Typography variant="h5" color="primary">
        {result.totalMiles.toFixed(1)} mi
      </Typography>
    </Box>

    {result.lab && (
      <Box>
        <Typography variant="body2" color="text.secondary">
          {COPY.labDropoffLabel}
        </Typography>
        <Typography>{result.lab.name}</Typography>
      </Box>
    )}

    <Box>
      <Typography variant="body2" color="text.secondary">
        {COPY.routeLabel}
      </Typography>
      <Stack spacing={0.5} sx={{ mt: 1 }}>
        {result.segments.map((segment, i) => (
          <Typography key={i} variant="body2">
            {i + 1}. {segment.from} to {segment.to} ({segment.miles.toFixed(1)} mi)
          </Typography>
        ))}
      </Stack>
    </Box>
  </Stack>
);
