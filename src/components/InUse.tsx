import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IScopes } from "./Available";
import DetailModal from "./DetailModal";
import EditModal from "./EditModal";
import Notification from "../components/Notification";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
`;
const MainContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  height: 100%;
  gap: 20px;
  padding: 20px;
  width: 100%;
  overflow: scroll;
  .empty {
    background-color: transparent;
    box-shadow: none;
  }
  .last {
    margin-bottom: 90px;
  }
  &:last-child {
    margin-bottom: 90px;
  }
`;
const Card = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f1f2f6;
  height: 200px;
  width: 100%;
  min-width: 150px;
  max-width: 165px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 1px 16px 19px -7px rgba(135, 125, 125, 0.71);
  -webkit-box-shadow: 1px 16px 19px -7px rgba(135, 125, 125, 0.71);
  -moz-box-shadow: 1px 16px 19px -7px rgba(135, 125, 125, 0.71);

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .image {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .detail {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

var ip = window.location.host;

function InUse() {
  const [scopes, setScopes] = useState<IScopes[]>([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const scopeImg = (
    <img
      className="image"
      src="https://banner2.cleanpng.com/20180720/sxs/kisspng-endoscopy-esophagogastroduodenoscopy-colonoscopy-b-endoscopy-5b51de1886d924.2995205315320919285524.jpg"
      alt="scope"
    />
  );
  const getScopes = async () => {
    await axios
      .get("http://" + ip.slice(0, -5) + ":4001/scopes/all")
      .then((response) => setScopes(response.data));
  };

  useEffect(() => {
    getScopes();
  }, [scopes]);

  return (
    <Container>
      <MainContainer>
        {scopes.map(
          (scope) =>
            scope.scopeStatus !== "Available" &&
            scope.scopeStatus !== "Out for Repair" && (
              <Card key={scope.scopeId + scope.scopeName}>
                <div className="title">{scope.scopeName}</div>
                <div className="detail">S/N: {scope.scopeSerial}</div>
                {scopeImg}
                <EditModal
                  scope={scope}
                  notify={notify}
                  setNotify={setNotify}
                />
                <DetailModal {...scope} />
              </Card>
            )
        )}
      </MainContainer>
      <Notification notify={notify} setNotify={setNotify} />
    </Container>
  );
}

export default InUse;
