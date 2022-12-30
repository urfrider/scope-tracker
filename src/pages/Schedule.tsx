import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import styled from "styled-components";
import Menubar from "../components/Menubar";
import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Top = styled.div`
  position: relative;
  margin-top: 20px;
  display: flex;
  flex: 1;
  justify-content: center;
  height: 80px;
  padding: 20px;
  .icon {
    position: absolute;
    left: 5%;
    margin-right: 50px;
    color: #a68c71;
    font-size: 1.5rem;
  }
  h1 {
    font-size: 2rem;
    color: #a68c71;
  }
`;
const MainContainer = styled.div`
  flex: 1;
`;
const Tabs = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

function Schedule() {
  return (
    <Container>
      <Menubar />
      <MainContainer>
        <Top>
          <Link to="/home">
            <ArrowBackIosNewRoundedIcon className="icon" />
          </Link>
          <h1>SCHEDULE</h1>
        </Top>
        <div>
          <Calendar />
        </div>
      </MainContainer>
    </Container>
  );
}

export default Schedule;
