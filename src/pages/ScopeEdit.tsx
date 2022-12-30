import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { ScopeTable } from "../components/ScopeTable";
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
    width: 100%;
    margin-bottom: 50px;
  }
`;

function ScopeEdit() {
  return (
    <Container>
      <MainContainer>
        <Top>
          <Link to="/profile">
            <ArrowBackIosNewRoundedIcon className="icon" />
          </Link>
          <h1>ADD SCOPES</h1>
        </Top>
        <div className="description">
          <ScopeTable />
        </div>
      </MainContainer>
    </Container>
  );
}

export default ScopeEdit;
