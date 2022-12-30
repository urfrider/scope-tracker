import React, { useState } from "react";
import styled from "styled-components";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 90%;
  background-color: #94795d;
  width: 100%;
  height: 10%;
  border-radius: 0px;
  z-index: 9999;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  height: 50px;
  width: 100%;
  .icon {
    font-size: 2rem;
    color: white;
  }
`;

const BarcodeScanner = styled.div`
  background-color: #b21f31;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Menubar() {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    onConfirm: {},
  });
  return (
    <Container>
      <Contents>
        <Link to="/home">
          <IconButton sx={{ "&:hover": { backgroundColor: "grey" } }}>
            <HomeRoundedIcon className="icon" />
          </IconButton>
        </Link>
        <Link to="/schedule">
          <IconButton sx={{ "&:hover": { backgroundColor: "grey" } }}>
            <CalendarMonthRoundedIcon className="icon" />
          </IconButton>
        </Link>
        <Link to="/scan">
          <BarcodeScanner>
            <IconButton sx={{ "&:hover": { backgroundColor: "grey" } }}>
              <CropFreeOutlinedIcon className="icon" />
            </IconButton>
          </BarcodeScanner>
        </Link>
        <Link to="/profile">
          <IconButton sx={{ "&:hover": { backgroundColor: "grey" } }}>
            <PersonRoundedIcon className="icon" />
          </IconButton>
        </Link>
        <Link to="/help">
        <IconButton sx={{ "&:hover": { backgroundColor: "grey" } }}>
          <HelpRoundedIcon className="icon" />
        </IconButton>
        </Link>
      </Contents>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Container>
  );
}

export default Menubar;
