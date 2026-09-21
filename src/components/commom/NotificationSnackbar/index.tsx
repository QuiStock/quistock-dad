import { useState } from "react";
import * as S from "./styles";
import { type INotificationProps } from "@/types";

interface INotificationSnackbarProps extends INotificationProps {
  onClose?: () => void;
}

const NotificationSnackbar = ({
  message,
  type,
  onClose,
}: INotificationSnackbarProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    onClose && onClose();
    setOpen(false);
  };

  return (
    <S.Wrapper
      open={open}
      autoHideDuration={type === "long" ? 60000 : 8000}
      onClose={handleClose}
    >
      <S.Alert
        onClose={handleClose}
        elevation={6}
        variant="filled"
        severity={type === "long" ? "info" : type}
        sx={{ width: "100%" }}
      >
        <p dangerouslySetInnerHTML={{ __html: message }} />
      </S.Alert>
    </S.Wrapper>
  );
};

export { NotificationSnackbar };
