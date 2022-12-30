import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CalendarEdit from "../components/CalendarEdit";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Top = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  flex: 1;
  justify-content: center;
  height: 20px;
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
  .description {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
`;

function SchEdit() {
  return (
    <Container>
      <MainContainer>
        <Top>
          <Link to="/profile">
            <ArrowBackIosNewRoundedIcon className="icon" />
          </Link>
          <h1>EDIT SCHEDULE</h1>
        </Top>
        <div className="description">
          <CalendarEdit />
        </div>
      </MainContainer>
    </Container>
  );
}

export default SchEdit;
