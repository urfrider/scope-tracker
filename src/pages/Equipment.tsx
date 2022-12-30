import styled from "styled-components";
import Menubar from "../components/Menubar";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Link, useLocation, Outlet, useMatch } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

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
  /* align-items: center; */
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
  .statusBtn {
    width: 90%;
  }
  .updateBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100%;
    background-color: #b21f31;
    border-radius: 10px;
    color: #f1f2f6;
    font-size: 1.4rem;
    font-weight: bold;
  }
  .btnBox {
    margin-top: -20px;
    .btn {
      font-size: 0.8rem;
    }
  }
`;

const Tab = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "#b21f31" : "#a68c71")};
`;

function Equipment() {
  const { state } = useLocation();
  const availableMatch = useMatch(`/${state.type}/available`);
  const inUseMatch = useMatch(`/${state.type}/inUse`);
  const underRepairMatch = useMatch(`/${state.type}/underRepair`);
  console.log(state?.type);
  return (
    <Container>
      <Menubar />
      <MainContainer>
        <Top>
          <Link to="/home">
            <ArrowBackIosNewRoundedIcon className="icon" />
          </Link>
          <h1>{state.type.toUpperCase()} STATUS</h1>
        </Top>
        <Tabs>
          <Link className="statusBtn" to="/scan">
            <span className="updateBtn">Update</span>
          </Link>
        </Tabs>
        <Tabs>
          <Box className="btnBox">
            <ButtonGroup
              color="inherit"
              variant="outlined"
              aria-label="outlined button group"
            >
              <Link
                to={`/${state.type}/available`}
                state={{ type: `${state.type}` }}
              >
                <Tab isActive={availableMatch !== null}>
                  <Button className="btn">Available</Button>
                </Tab>
              </Link>
              <Link
                to={`/${state.type}/inUse`}
                state={{ type: `${state.type}` }}
              >
                <Tab isActive={inUseMatch !== null}>
                  <Button className="btn">In Use</Button>
                </Tab>
              </Link>
              <Link
                to={`/${state.type}/underRepair`}
                state={{ type: `${state.type}` }}
              >
                <Tab isActive={underRepairMatch !== null}>
                  <Button className="btn">Under Repair</Button>
                </Tab>
              </Link>
            </ButtonGroup>
          </Box>
        </Tabs>
        <Outlet />
      </MainContainer>
    </Container>
  );
}

export default Equipment;
