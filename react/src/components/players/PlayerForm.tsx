import { Box, MenuItem, TextField, Typography } from "@mui/material";
import type { ChangeEvent } from "react";

type PlayerFormData = {
  firstName: string;
  lastName: string;
  hand: string;
  dateOfBirth: string;
  ioc: string;
  height: string;
  elo: string;
  eloHard: string;
  eloGrass: string;
  eloCarpet: string;
  eloClay: string;
};

type PlayerFormProps = {
  formData: PlayerFormData;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export const PlayerForm = ({
  formData,
  onChange,
  disabled = false,
}: PlayerFormProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Personal Information */}
      <Typography variant="h6" color="text.secondary">
        Personal Information
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          disabled={disabled}
        />
        <TextField
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          disabled={disabled}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          required
          fullWidth
          select
          label="Hand"
          name="hand"
          value={formData.hand}
          onChange={onChange}
          disabled={disabled}
        >
          <MenuItem value="R">Right</MenuItem>
          <MenuItem value="L">Left</MenuItem>
          <MenuItem value="U">Unknown</MenuItem>
        </TextField>
        <TextField
          required
          fullWidth
          label="Country Code (IOC)"
          name="ioc"
          value={formData.ioc}
          onChange={onChange}
          disabled={disabled}
          inputProps={{ maxLength: 3 }}
          helperText="e.g., USA, GBR, ESP"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          required
          fullWidth
          type="date"
          label="Date of Birth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={onChange}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          type="number"
          label="Height (cm)"
          name="height"
          value={formData.height}
          onChange={onChange}
          disabled={disabled}
        />
      </Box>

      {/* ELO Ratings */}
      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
        ELO Ratings
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          type="number"
          label="Overall ELO"
          name="elo"
          value={formData.elo}
          onChange={onChange}
          disabled={disabled}
          helperText="Default: 1500"
        />
        <TextField
          fullWidth
          type="number"
          label="ELO Hard"
          name="eloHard"
          value={formData.eloHard}
          onChange={onChange}
          disabled={disabled}
          helperText="Default: 1500"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          type="number"
          label="ELO Grass"
          name="eloGrass"
          value={formData.eloGrass}
          onChange={onChange}
          disabled={disabled}
          helperText="Default: 1500"
        />
        <TextField
          fullWidth
          type="number"
          label="ELO Carpet"
          name="eloCarpet"
          value={formData.eloCarpet}
          onChange={onChange}
          disabled={disabled}
          helperText="Default: 1500"
        />
      </Box>

      <TextField
        fullWidth
        type="number"
        label="ELO Clay"
        name="eloClay"
        value={formData.eloClay}
        onChange={onChange}
        disabled={disabled}
        helperText="Default: 1500"
      />
    </Box>
  );
};
