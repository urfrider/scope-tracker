import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Top = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 100px;
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
  .description {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }
`;

const BarcodeScanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dashed #a68c71;
  padding: 20px;
  margin: 20px;
  .image {
    width: 80%;
  }
`;

function Scan() {
  const navigate = useNavigate();
  return (
    <Container>
      <MainContainer>
        <Top>
          <Link to={`${navigate}`} onClick={() => navigate(-1)}>
            <ArrowBackIosNewRoundedIcon className="icon" />
          </Link>
          <h1>SCAN BARCODE</h1>
        </Top>
        <div className="description">
          <p>Please ensure barcode is within the box area</p>
        </div>
        <Link to="/update">
          <BarcodeScanner>
            <img
              className="image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/UPC-A-036000291452.svg/640px-UPC-A-036000291452.svg.png"
              alt="barcode"
            />
          </BarcodeScanner>
        </Link>
      </MainContainer>
    </Container>
  );
}

export default Scan;
