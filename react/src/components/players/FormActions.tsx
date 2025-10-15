import { Box, Button, CircularProgress } from "@mui/material";

type FormActionsProps = {
  onCancel: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
};

export const FormActions = ({
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  isSubmitting = false,
  disabled = false,
}: FormActionsProps) => {
  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
      <Button
        variant="outlined"
        onClick={onCancel}
        disabled={disabled || isSubmitting}
      >
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={disabled || isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : submitLabel}
      </Button>
    </Box>
  );
};
