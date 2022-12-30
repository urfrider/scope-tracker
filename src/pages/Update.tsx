import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/joy/Box";
import Textarea from "@mui/joy/Textarea";
import Menubar from "../components/Menubar";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { IScopes } from "../components/Available";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ConfirmDialog from "../components/ConfirmDialog";
import { useRecoilValue } from "recoil";
import { isAdmin } from "../atoms";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Top = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 0px;
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
    font-size: 1.6rem;
    color: #a68c71;
  }
`;
const MainContainer = styled.div`
  flex: 1;
  .description {
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-bottom: 15px;
    font-size: 1.1rem;
    font-weight: Bold;
  }

  .details {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.4;
  }

  .bolded {
    font-weight: bold;
    font-size: 0.8rem;
  }
  .fontColor {
    color: #b42739;
  }

  .updater {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 1.5;
    background-color: #d3c6b8;
    padding: 7px;
    padding-left: 15px;
    width: 90%;
    border-radius: 12px;
  }
  .form {
    display: flex;
    flex-direction: column;
    padding-top: 15px;
    font-size: 1.2rem;
    font-weight: Bold;
    width: 310px;
  }
`;

const Tabs = styled.div`
  display: flex;
  padding: 10px;
  padding-left: 0px;
  padding-right: 40px;
  width: 100%;
  justify-content: center;
  align-items: center;
  .statusBtn {
    width: 100%;
  }
  .submitBtn {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 100%;
    padding-left: none;
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

const Loader = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  .loading {
    color: #b21f31;
  }
`;

function Update() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [scope, setScope] = useState<IScopes>();
  const [comment, setComment] = useState("");
  const admin = useRecoilValue(isAdmin);
  const [status, setStatus] = React.useState("Washing");
  const [updatedDate, setUpdatedDate] = useState("");
  const today = new Date();
  const yyyy = today.getFullYear();
  let MM = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let mm = today.getMinutes();
  let ss = today.getSeconds();
  var ip = window.location.host;

  const formattedToday =
    yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    onConfirm: {},
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
  };

  const handleText = (event: any) => {
    setComment(event.target.value);
  };

  const onClick = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Submit",
      subtitle: "Are you sure you want to submit?",
      onConfirm: () => {
        const data = {
          scopeStatus: status,
          comments: comment,
          updatedDate: updatedDate,
          personnelName: admin ? "Kimberly Tan" : "Cindy Lim",
          scopeId: scope?.scopeId,
        };
        axios
          .put(
            "http://" + ip.slice(0, -5) + ":4001/scopes/nurseUpdateScopeStatus",
            data
          )
          .then((res) => {
            console.log(res.data);
            navigate("/home", {
              state: "scopeUpdate",
            });
          })
          .catch((error) => console.error());
      },
    });
  };

  useEffect(() => {
    axios.get("http://" + ip.slice(0, -5) + ":4001/scopes/all").then(
      (response) => {
        setScope(response.data[0]);
      },
      (error) => {
        console.log(error);
      }
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setUpdatedDate(formattedToday);
  }, []);
  console.log(scope);

  const controlProps = (item: string) => ({
    checked: status === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  return (
    <Container>
      <Menubar />
      <MainContainer>
        {loading ? (
          <Loader sx={{ color: "grey.500" }} spacing={2} direction="row">
            <CircularProgress className="loading" color="inherit" />
          </Loader>
        ) : (
          <>
            <Top>
              <Link to={`${navigate}`} onClick={() => navigate(-1)}>
                <ArrowBackIosNewRoundedIcon className="icon" />
              </Link>
              <h1>EQUIPMENT UPDATE</h1>
            </Top>
            <div className="description">
              <p>
                <span className="fontColor">{scope?.scopeName}</span>
              </p>
              <div className="details">
                <p>
                  {" "}
                  <span className="bolded">Scope Brand:</span>&nbsp;
                  {scope?.brandName}
                </p>
                <p>
                  {" "}
                  <span className="bolded">Scope Serial No:</span>&nbsp;
                  {scope?.scopeSerial}
                </p>
              </div>
            </div>

            <div className="description">
              <p>
                <span className="fontColor">Select Activity</span>
              </p>
              <div className="form">
                {"\n"}
                {"\n"}

                <FormControl margin="none">
                  <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={status}
                    onChange={handleChange}
                    sx={{
                      lineHeight: "normal",
                      marginTop: -1,
                      maxHeight: 140,
                    }}
                  >
                    <FormControlLabel
                      value="Washing"
                      sx={{
                        height: 35,
                      }}
                      control={
                        <Radio
                          {...controlProps("Washing")}
                          color="success"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                          }}
                        />
                      }
                      label="Washing"
                    />
                    <FormControlLabel
                      value="Drying"
                      sx={{
                        height: 35,
                      }}
                      control={
                        <Radio
                          color="success"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                          }}
                        />
                      }
                      label="Drying"
                    />
                    <FormControlLabel
                      value="Sample(Pass)"
                      sx={{
                        height: 35,
                      }}
                      control={
                        <Radio
                          color="success"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                          }}
                        />
                      }
                      label="Sample(Pass)"
                    />
                    <FormControlLabel
                      value="Sample(Fail)"
                      sx={{
                        height: 35,
                      }}
                      control={
                        <Radio
                          color="success"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                          }}
                        />
                      }
                      label="Sample(Fail)"
                    />
                    <FormControlLabel
                      value="Available"
                      sx={{
                        height: 35,
                      }}
                      control={
                        <Radio
                          color="success"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                          }}
                        />
                      }
                      label="Available"
                    />
                    <FormControlLabel
                      value="Under Quarantine"
                      sx={{
                        height: 35,
                      }}
                      control={
                        <Radio
                          color="success"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                          }}
                        />
                      }
                      label="Under Quarantine"
                    />
                    <FormControlLabel
                      value="Out for Repair"
                      sx={{
                        height: 35,
                      }}
                      control={
                        <Radio
                          color="success"
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 25,
                            },
                          }}
                        />
                      }
                      label="Out for Repair"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className="description">
              <p>
                <span className="fontColor">Performed By:</span>
              </p>
              <div className="updater">
                <p>
                  <span className="bolded">Updated By:</span>&nbsp;&nbsp;
                  {admin ? "Kimberly Tan" : "Cindy Lim"}
                </p>
                <p>
                  <span className="bolded">Date: </span>
                  {updatedDate}
                </p>
              </div>
            </div>

            <div className="description">
              <p>
                <span className="fontColor">Comments</span>
              </p>
              <Box
                sx={{
                  p: 2,
                  padding: 0,
                  width: 310,
                  marginTop: 1,
                  borderColor: "#c4c0bd",
                }}
              >
                <Textarea
                  value={comment}
                  onChange={handleText}
                  placeholder="Type in here…"
                  minRows={1.5}
                  maxRows={3}
                />
              </Box>

              <Tabs>
                <button onClick={onClick} className="submitBtn">
                  Submit
                </button>
              </Tabs>
            </div>
          </>
        )}
      </MainContainer>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Container>
  );
}

export default Update;
