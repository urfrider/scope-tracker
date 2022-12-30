import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { SelectChangeEvent } from "@mui/material/Select";
import { IScopes } from "./Available";

const Container = styled.div`
  position: relative;
  Button {
    color: #a68c71;
    border: 1px solid #a68c71;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 10px;
    height: 25px;
    width: 80px;
    &:hover {
      color: #b21f31;
      border: 1px solid #b21f31;
    }
  }
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  color: "grey",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  div {
    display: flex;
    span {
      flex: 1;
    }
  }
`;

const closeBtnStyle = {
  position: "absolute",
  top: 5,
  right: 5,
};

export default function DetailModal(scope: IScopes) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [action, setAction] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAction(event.target.value);
  };

  return (
    <Container>
      <Button onClick={handleOpen}>detail</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <IconButton
              sx={closeBtnStyle}
              onClick={handleClose}
              className="icon"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ textDecoration: "underline", mt: 1 }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              {scope.scopeName}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 1 }}>
              <Top>
                <div>
                  <span>Brand:</span> <span>{scope.brandName}</span>
                </div>
                <div>
                  <span>Scope Type:</span> <span> {scope.scopeType}</span>
                </div>
                <div>
                  <span>Model No:</span> <span> {scope.modelNumber}</span>
                </div>
                <div>
                  <span>Serial No:</span> <span> {scope.scopeSerial}</span>
                </div>
              </Top>
            </Typography>
            <Typography
              sx={{ textDecoration: "underline", mt: 2 }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Current Status
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 1 }}>
              <Top>
                <div>
                  <span>Status:</span> <span>{scope.scopeStatus}</span>
                </div>
                <div>
                  <span>Event Date:</span> <span> {scope.eventDate}</span>
                </div>
                <div>
                  <span>Comment:</span>{" "}
                  <span> {scope.comments == "" ? "NIL" : scope.comments}</span>
                </div>
                <div>
                  <span>Updated Date:</span> <span> {scope.updatedDate}</span>
                </div>
                <div>
                  <span>Updated By:</span> <span> {scope.personnelName}</span>
                </div>
              </Top>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
}
