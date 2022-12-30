import styled from "styled-components";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import Menubar from "../components/Menubar";
import { isAdmin } from "../atoms";
import { useRecoilValue } from "recoil";
import CakeIcon from "@mui/icons-material/Cake";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  .menubar {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 30vh;
  position: relative;
  display: flex;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    max-width: 100%;
    min-height: 40px;
    display: inline-block;
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
    transform: scaleX(1.5);
    background-position: right top;
    background-size: 100vw 200px;
    background-color: #a68c71;
  }
  .profile {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: 10px;
  }
`;

const MainHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  max-width: 500px;
  background-color: transparent;
  gap: 10px;
  color: #f1f2f6;
  .name {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .position {
    font-size: 1.1rem;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 30px;
  padding: 10px;
  padding-left: 30px;
  width: 100%;
  align-items: center;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 80%;
    background-color: #b21f31;
    border-radius: 10px;
    color: #f1f2f6;
    font-size: 1.4rem;
    font-weight: bold;
  }

  .button1,
  .button2 {
    &:hover {
      background-color: grey;
      color: white;
    }
  }
`;

function Profile() {
  const admin = useRecoilValue(isAdmin);
  const navigate = useNavigate();

  return (
    <Container>
      <div className="menubar">
        <Menubar />
      </div>
      <Header>
        <MainHeader>
          <img
            className="profile"
            src={
              admin
                ? "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg"
                : "https://www.microstockposts.com/storage/2019/10/000074.jpg"
            }
          />
          <span className="name">{admin ? "Kimberly Tan" : "Cindy Lim"}</span>
          <span className="position">
            {admin ? "Administrator" : "Head Nurse"}
          </span>
        </MainHeader>
      </Header>
      <Tabs>
        <PermIdentityIcon /> {admin ? "ID2434" : "ID1234"}
      </Tabs>
      <Tabs>
        <CakeIcon /> {admin ? "1996/01/17" : "1995/02/17"}
      </Tabs>
      <Tabs>
        <LocalPhoneIcon /> {admin ? "+65 92314367" : "+65 86231273"}
      </Tabs>
      <Tabs>
        <EmailIcon /> {admin ? "kimberlyTan@gmail.com" : "cindyLim@gmail.com"}
      </Tabs>
      {admin ? (
        <ActionButtons>
          <button
            className="button button1"
            onClick={() => {
              navigate("/scopeEdit");
            }}
          >
            Manage Scopes
          </button>
          <button
            className="button button2"
            onClick={() => {
              navigate("/schEdit");
            }}
          >
            Manage Schedules
          </button>
        </ActionButtons>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Profile;
