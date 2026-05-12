import { useState } from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { CLINICIANS } from "../data/clinicians";
import { LABS } from "../data/labs";
import { COPY } from "../constants/strings";
import type { DistanceMode } from "../utils/distance";

export type DispatchParams = {
  patientAddress: string;
  includeLab: boolean;
  mode: DistanceMode;
};

type Props = {
  onSubmit: (params: DispatchParams) => void;
};

const KNOWN_ADDRESSES = [
  ...CLINICIANS.map((clinician) => clinician.address),
  ...LABS.map((lab) => lab.address),
];

export const DispatchForm = ({ onSubmit }: Props) => {
  const [patientAddress, setPatientAddress] = useState("");
  const [includeLab, setIncludeLab] = useState(false);
  const [mode, setMode] = useState<DistanceMode>("random");
  const trimmedAddress = patientAddress.trim();

  return (
    <Stack
      component="form"
      spacing={2.5}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          patientAddress: trimmedAddress,
          includeLab,
          mode,
        });
      }}
    >
      <Autocomplete
        freeSolo
        options={KNOWN_ADDRESSES}
        value={patientAddress}
        onInputChange={(_event, value) => setPatientAddress(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={COPY.patientAddressLabel}
            placeholder={COPY.patientAddressPlaceholder}
            required
          />
        )}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={includeLab}
            onChange={(_event, checked) => setIncludeLab(checked)}
          />
        }
        label={COPY.labRequiredLabel}
      />

      <FormControl>
        <FormLabel>{COPY.distanceModeLabel}</FormLabel>
        <RadioGroup
          row
          value={mode}
          onChange={(_event, value) => setMode(value as DistanceMode)}
        >
          <FormControlLabel value="random" control={<Radio />} label={COPY.modeRandom} />
          <FormControlLabel value="haversine" control={<Radio />} label={COPY.modeHaversine} />
        </RadioGroup>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!trimmedAddress}
      >
        {COPY.submitLabel}
      </Button>
    </Stack>
  );
};
