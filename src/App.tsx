import { useState } from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { DispatchForm, type DispatchParams } from "./components/DispatchForm";
import { ResultCard } from "./components/ResultCard";
import { COPY } from "./constants/strings";
import { findBestClinician, type OptimizerResult } from "./utils/optimizer";

const App = () => {
  const [result, setResult] = useState<OptimizerResult | null>(null);

  const handleSubmit = (params: DispatchParams) => setResult(
    findBestClinician(params.patientAddress, params.includeLab, params.mode),
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      <Box component="header" sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper" }}>
        <Container maxWidth="lg" sx={{ py: 2.5 }}>
          <Typography variant="h5" component="h1">{COPY.appName}</Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>{COPY.formTitle}</Typography>
              <DispatchForm onSubmit={handleSubmit} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>{COPY.resultTitle}</Typography>
              {result ? (
                <ResultCard result={result} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {COPY.resultEmpty}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
