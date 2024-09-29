import { Alert, Snackbar } from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface AutoHideAlertProps {
  errors: Array<{
    url: string;
    error: {
      error: {
        code: number;
        message: string;
        status: string;
      };
    };
  }>;
}

const AutoHideAlert: React.FC<AutoHideAlertProps> = ({ errors }) => {
  const [open, setOpen] = useState(true);

  // Close the alert automatically after 5 seconds
  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000} // Auto-hide after 5 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position the Snackbar
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errors.length > 0
            ? errors.map((error, index) => (
                <div key={index}>
                  URL: {error.url}, Message: {error.error.error.message}
                </div>
              ))
            : "No errors!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AutoHideAlert;
