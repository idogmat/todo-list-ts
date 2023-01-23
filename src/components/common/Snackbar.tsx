import React, { useEffect, useState } from "react";
import { ButtonSnackbar, Container } from "../../style/elements";
import { RequestStatusType } from "../../store/app-reducer";

type SnackbarType = { status: RequestStatusType; error: null | string };

const Snackbar: React.FC<SnackbarType> = ({ status, error }) => {
  const [show, setShow] = useState<boolean>(!!status);

  let TIME = 2000;
  let TIMER: NodeJS.Timeout;

  function handleTimeout() {
    TIMER = setTimeout(() => {
      setShow(false);
    }, TIME);
  }

  function handleClose() {
    clearTimeout(TIMER);
  }

  useEffect(() => {
    if (!!status) {
      setShow(!!status);
      handleTimeout();
    }
    return () => {
      clearTimeout(TIMER);
    };
  }, [status, error]);
  return show ? (
    <Container status={status}>
      <p>{status}</p>
      {!!error && <p>{error}</p>}
      <ButtonSnackbar onClick={handleClose}>x</ButtonSnackbar>
    </Container>
  ) : (
    <></>
  );
};

export default Snackbar;
