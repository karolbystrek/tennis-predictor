import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole.ts";

export const PlayerActions = ({ playerId }: { playerId: number }) => {
  const navigate = useNavigate();
  const { isAdmin } = useRole();

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {isAdmin() && (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate(`/players/update/${playerId}`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => navigate(`/players/delete/${playerId}`)}
          >
            Delete
          </Button>
        </>
      )}
    </Box>
  );
};
