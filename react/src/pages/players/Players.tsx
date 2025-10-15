import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography
} from "@mui/material";
import { usePlayers } from "../../hooks/usePlayers.ts";

type SortField =
  | "firstName"
  | "ioc"
  | "hand"
  | "age"
  | "rank"
  | "rankPoints"
  | "elo"
  | "height";
type SortOrder = "asc" | "desc";

export const Players = () => {
  const { data: players, isLoading, error } = usePlayers();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("elo");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredPlayers = useMemo(() => {
    if (!players) return [];

    const query = searchQuery.toLowerCase().trim();
    let filtered = players;

    if (query) {
      filtered = players.filter(
        (player) =>
          player.firstName.toLowerCase().includes(query) ||
          player.lastName.toLowerCase().includes(query) ||
          `${player.firstName} ${player.lastName}`
            .toLowerCase()
            .includes(query) ||
          player.ioc.toLowerCase().includes(query),
      );
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [players, sortField, sortOrder]);

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ marginTop: 8 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 8 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Tennis Players
        </Typography>

        <TextField
          fullWidth
          label="Search players"
          placeholder="Search by name or country..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
          size="small"
        />

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {filteredPlayers.length} player
          {filteredPlayers.length !== 1 ? "s" : ""} found
        </Typography>

        <TableContainer component={Paper}>
          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "firstName"}
                    direction={sortField === "firstName" ? sortOrder : "asc"}
                    onClick={() => handleSort("firstName")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "ioc"}
                    direction={sortField === "ioc" ? sortOrder : "asc"}
                    onClick={() => handleSort("ioc")}
                  >
                    Country
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortField === "hand"}
                    direction={sortField === "hand" ? sortOrder : "asc"}
                    onClick={() => handleSort("hand")}
                  >
                    Hand
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "age"}
                    direction={sortField === "age" ? sortOrder : "asc"}
                    onClick={() => handleSort("age")}
                  >
                    Age
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "rank"}
                    direction={sortField === "rank" ? sortOrder : "asc"}
                    onClick={() => handleSort("rank")}
                  >
                    Rank
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "rankPoints"}
                    direction={sortField === "rankPoints" ? sortOrder : "asc"}
                    onClick={() => handleSort("rankPoints")}
                  >
                    Points
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "elo"}
                    direction={sortField === "elo" ? sortOrder : "asc"}
                    onClick={() => handleSort("elo")}
                  >
                    ELO
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={sortField === "height"}
                    direction={sortField === "height" ? sortOrder : "asc"}
                    onClick={() => handleSort("height")}
                  >
                    Height
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPlayers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ py: 2 }}
                    >
                      No players found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPlayers.map((player) => (
                  <TableRow key={player.id} hover>
                    <TableCell>
                      {player.firstName} {player.lastName}
                    </TableCell>
                    <TableCell>{player.ioc}</TableCell>
                    <TableCell>{player.hand}</TableCell>
                    <TableCell align="right">{player.age}</TableCell>
                    <TableCell align="right">{player.rank}</TableCell>
                    <TableCell align="right">{player.rankPoints}</TableCell>
                    <TableCell align="right">{player.elo.toFixed(0)}</TableCell>
                    <TableCell align="right">
                      {player.height || "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
