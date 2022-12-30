import { useState } from "react";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import logo from "./images/ttshlogo.png";
import Notification from "../components/Notification";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  padding: 15px;
  width: 100%;
  justify-content: center;
  align-items: center;
  .form {
    position: relative;
    top: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    .error {
      color: red;
    }
    .username,
    .password {
      width: 80%;
      height: 50px;
      background-color: transparent;
      margin: 8px 0;
      border: none;
      border-bottom: 2px solid black;
      font-size: 1.1rem;
      &:focus {
        outline: none;
        border-bottom: 2px solid black;
        background-color: inherit;
      }
    }
    .login {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      width: 70%;
      padding: 20px;
      height: 50px;
      border-radius: 15px;
      background-color: #b21f31;
      font-size: 1.3rem;
      font-weight: bold;
      color: white;
    }
  }

  .image {
    width: 280px;
    height: 85px;
  }
`;
const Items = styled.div<{ adminActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  .admin {
    color: black;
    padding: 10px;
    border-radius: 10px;
    border: ${(props) =>
      props.adminActive ? "3px solid #b21f31" : "3px solid black"};
    height: 100px;
    width: 100px;
  }
  .nurse {
    color: black;
    padding: 10px;
    border-radius: 10px;
    border: ${(props) =>
      props.adminActive ? "3px solid black" : "3px solid #b21f31"};
    height: 100px;
    width: 100px;
  }
  .adminSelected {
    display: ${(props) => (props.adminActive ? "flex" : "none")};
    position: absolute;
    bottom: 0;
    right: 0;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #b21f31;
  }
  .nurseSelected {
    display: ${(props) => (props.adminActive ? "none" : "flex")};
    position: absolute;
    bottom: 0;
    right: 0;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: #b21f31;
  }
  .adminLabel {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${(props) => (props.adminActive ? "red" : "black")};
  }
  .nurseLabel {
    font-size: 1.1rem;
    font-weight: bold;
    color: ${(props) => (props.adminActive ? "black" : "red")};
  }
`;
const MainContainer = styled.div`
  flex: 1;
`;

interface IForm {
  username: string;
  password: string;
}

function Login() {
  let navigate = useNavigate();
  var ip = window.location.host;
  const [admin, setAdmin] = useRecoilState(isAdmin);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();
  const handleValid = ({ username, password }: IForm) => {
    const data = {
      userName: username,
      password: password,
    };
    if (admin === true) {
      axios
        .post(
          "http://" + ip.slice(0, -5) + ":4001/scopes/authenthecateAdmin",
          data
        )
        .then((res) => {
          if (res.data === true) {
            navigate("/home", {
              state: "login",
            });
          } else {
            setNotify({
              isOpen: true,
              message: "Wrong username or password",
              type: "error",
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(
          "http://" + ip.slice(0, -5) + ":4001/scopes/authenthecateUser",
          data
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.data === true) {
            navigate("/home", {
              state: "login",
            });
          } else {
            setNotify({
              isOpen: true,
              message: "Wrong username or password",
              type: "error",
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const adminOnClick = () => {
    setAdmin(true);
  };
  const nurseOnClick = () => {
    setAdmin(false);
  };
  return (
    <Container>
      <MainContainer>
        <Tabs>
          <div>
            <img className="image" src={logo} alt="logo" />
          </div>
        </Tabs>
        <Tabs>
          <div style={{ fontSize: "1.8rem" }}>Choose Account Type</div>
        </Tabs>
        <Tabs>
          <Items adminActive={admin}>
            <IconButton onClick={adminOnClick}>
              <AdminPanelSettingsOutlinedIcon className="admin" />
            </IconButton>
            <span className="adminLabel">Admin</span>
            <DoneOutlinedIcon className="adminSelected" />
          </Items>
          <Items adminActive={admin}>
            <IconButton onClick={() => nurseOnClick()}>
              <VaccinesOutlinedIcon className="nurse" />
            </IconButton>
            <span className="nurseLabel">Nurse</span>
            <DoneOutlinedIcon className="nurseSelected" />
          </Items>
        </Tabs>
        <Tabs>
          <div style={{ color: "#636e72" }}>
            Please log in below to get started
          </div>
        </Tabs>
        <Tabs>
          <form onSubmit={handleSubmit(handleValid)} className="form">
            <input
              {...register("username", {
                required: "Username is required",
              })}
              placeholder="Username"
              className="username"
            />
            <span className="error">{errors?.username?.message}</span>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Password"
              className="password"
              type="password"
            />
            <span className="error">{errors?.password?.message}</span>

            <button className="login">Login</button>
          </form>
        </Tabs>
      </MainContainer>
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
}

export default Login;
