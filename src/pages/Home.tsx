import React, { useEffect, useState } from "react";
import Menubar from "../components/Menubar";
import styled from "styled-components";
import Widgets from "../components/Widgets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import IconButton from "@mui/material/IconButton";
import ConfirmDialog from "../components/ConfirmDialog";
import { isAdmin } from "../atoms";
import { useRecoilValue } from "recoil";
import Notification from "../components/Notification";
import "@fontsource/roboto"; // Defaults to weight 400.

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Top = styled.div`
  margin-top: 30px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 28px;
  .left {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 1.2rem;
      margin-bottom: 5px;
      font-family: Roboto;
    }
    .name {
      font-size: 1.4rem;
      font-weight: bold;
      font-family: Roboto;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .profile {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-left: 20px;
    }
    .icon {
      font-size: 2rem;
      color: black;
    }
  }
`;
const Tabs = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  flex: 1;
`;

function Home() {
  // ** HASH PASSWORD IN FRONT-END BEFORE SUBMIT FORM **
  // If code runs twice is because of <React.StrictMode></React.StrictMode> in index.tsx
  // const passwordString = "healthcare123";
  // const saltRounds = 10;
  // const salt = bcrypt.genSaltSync(saltRounds);
  // const hash = bcrypt.hashSync(passwordString, salt);
  // console.log(hash); // -- insert this hash in DB with user creation form
  const navigate = useNavigate();
  const admin = useRecoilValue(isAdmin);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    onConfirm: {},
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state === "scopeUpdate") {
      setNotify({
        isOpen: true,
        message: "Scope is successfully updated!",
        type: "success",
      });
    } else if (location.state === "login") {
      setNotify({
        isOpen: true,
        message: "Login successful!",
        type: "success",
      });
    }
  }, []);
  return (
    <Container>
      <Menubar />
      <MainContainer>
        <Top>
          <div className="left">
            <span className="title">Hello!</span>
            <span className="name">{admin ? "Kimberly Tan" : "Cindy Lim"}</span>
          </div>
          <div className="right">
            <IconButton
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Logout",
                  subtitle: "Are you sure you want to log out?",
                  onConfirm: () => {
                    navigate("/");
                  },
                });
              }}
              className="logout"
            >
              <ExitToAppOutlinedIcon className="icon" />
            </IconButton>
            <Link to="/profile">
              <img
                className="profile"
                src={
                  admin
                    ? "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                    : "https://www.microstockposts.com/storage/2019/10/000074.jpg"
                }
              />
            </Link>
          </div>
        </Top>
        <Tabs>
          <Widgets type="schedule" />
        </Tabs>
        <Tabs>
          <Widgets type="scope" />
        </Tabs>
      </MainContainer>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
}

export default Home;
