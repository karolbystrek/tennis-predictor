import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { Player } from "../../utils/types.ts";

type PlayerInfoProps = {
  player: Player;
};

export const PlayerInfo = ({ player }: PlayerInfoProps) => {
  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {player.firstName} {player.lastName}
          </Typography>
          <Chip label={player.ioc} color="primary" />
        </Box>

        <Stack spacing={3}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <InfoItem label="ID" value={player.id} />
            <InfoItem label="Hand" value={player.hand} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <InfoItem
              label="Date of Birth"
              value={new Date(player.dateOfBirth).toLocaleDateString()}
            />
            <InfoItem label="Age" value={player.age} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <InfoItem label="Height" value={`${player.height} cm`} />
            <InfoItem label="Rank" value={`#${player.rank}`} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <InfoItem label="Rank Points" value={player.rankPoints} />
            <InfoItem label="Overall ELO" value={player.elo} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <InfoItem label="ELO Hard" value={player.eloHard} />
            <InfoItem label="ELO Grass" value={player.eloGrass} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <InfoItem label="ELO Carpet" value={player.eloCarpet} />
            <InfoItem label="ELO Clay" value={player.eloClay} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
