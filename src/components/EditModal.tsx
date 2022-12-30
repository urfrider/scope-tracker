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
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import ConfirmDialog from "./ConfirmDialog";
import { IScopes } from "./Available";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

var ip = window.location.host;
const Container = styled.div`
  position: relative;
  .editBtn {
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
  top: "46%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  color: "grey",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
  px: 4,
};

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .action {
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
  }
  .submitBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border-radius: 10px;
    padding: 5px;
    button {
      background-color: #b21f31;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      padding: 10px;
      height: 50px;
      width: 200px;
    }
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
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

interface IEditModal {
  scope: IScopes;
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

export default function EditModal(props: IEditModal) {
  const { scope, notify, setNotify } = props;

  const [scopes, setScopes] = useState<IScopes[]>();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    onConfirm: {},
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const onClick = () => {
    if (action == "") {
      setNotify({
        isOpen: true,
        message: "Please choose an option!",
        type: "error",
      });
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: "Submit",
      subtitle: "Are you sure you want to submit?",
      onConfirm: () => {
        axios
          .put("http://" + ip.slice(0, -5) + ":4001/scopes/updateStatus", {
            scopeId: scope.scopeId,
            scopeStatus: action,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) =>
            console.error(
              `There was an error updating ${scope.scopeName} : ${error}`
            )
          );
        setOpen(false);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        setNotify({
          isOpen: true,
          message: "Scope is successfully updated!",
          type: "success",
        });
      },
    });
  };
  const [action, setAction] = React.useState("Washing");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAction((event.target as HTMLInputElement).value);
  };
  const controlProps = (item: string) => ({
    checked: action === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <Container>
      <Button className="editBtn" onClick={handleOpen}>
        edit
      </Button>
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
                  <span>Scope Type:</span> <span> {scope.scopeType}</span>
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
            <Typography id="transition-modal-description" sx={{ mt: 0 }}>
              <Detail>
                <div className="action">
                  <FormControl margin="none">
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={action}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Washing"
                        control={
                          <Radio
                            {...controlProps("Washing")}
                            color="success"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 30,
                              },
                            }}
                          />
                        }
                        label="Washing"
                      />
                      <FormControlLabel
                        value="Drying"
                        control={
                          <Radio
                            color="success"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 30,
                              },
                            }}
                          />
                        }
                        label="Drying"
                      />
                      <FormControlLabel
                        value="Sample(Pass)"
                        control={
                          <Radio
                            color="success"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 30,
                              },
                            }}
                          />
                        }
                        label="Sample(Pass)"
                      />
                      <FormControlLabel
                        value="Sample(Fail)"
                        control={
                          <Radio
                            color="success"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 30,
                              },
                            }}
                          />
                        }
                        label="Sample(Fail)"
                      />
                      <FormControlLabel
                        value="Available"
                        control={
                          <Radio
                            color="success"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 30,
                              },
                            }}
                          />
                        }
                        label="Available"
                      />
                      <FormControlLabel
                        value="Under Quarantine"
                        control={
                          <Radio
                            color="success"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 30,
                              },
                            }}
                          />
                        }
                        label="Under Quarantine"
                      />
                      <FormControlLabel
                        value="Out for Repair"
                        control={
                          <Radio
                            color="success"
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 30,
                              },
                            }}
                          />
                        }
                        label="Out for Repair"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="submitBtn">
                  <Button onClick={onClick} variant="contained">
                    Submit
                  </Button>
                </div>
              </Detail>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Container>
  );
}
