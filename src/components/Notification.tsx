import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface INotification {
  notify: {
    isOpen: boolean;
    message: string;
    type: string;
  };
  setNotify: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      message: string;
      type: string;
    }>
  >;
}

export default function Notification(props: INotification) {
  const { notify, setNotify } = props;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Stack spacing={2}>
      <Snackbar
        sx={{ marginTop: 2 }}
        open={notify.isOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        key={notify.type}
      >
        {notify.type == "success" ? (
          <Alert onClose={handleClose} severity="success" sx={{ width: "80%" }}>
            {notify.message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" sx={{ width: "80%" }}>
            {notify.message}
          </Alert>
        )}
      </Snackbar>
    </Stack>
  );
}
