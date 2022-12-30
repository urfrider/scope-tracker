import React, { useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Link } from "react-router-dom";
import ApexChart from "react-apexcharts";
import axios from "axios";
import "@fontsource/roboto"; // Defaults to weight 400.
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { IScopes } from "./Available";

var ip = window.location.host;
const Container = styled.div<{ type: String }>`
  background-color: #f1f2f6;
  height: ${(props) => (props.type === "schedule" ? "200px" : "260px")};
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 16px 19px -7px rgba(135, 125, 125, 0.71);
  -webkit-box-shadow: 1px 16px 19px -7px rgba(135, 125, 125, 0.71);
  -moz-box-shadow: 1px 16px 19px -7px rgba(135, 125, 125, 0.71);
  font-family: Roboto;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-left: 5px;
    .title {
      color: #b21f31;
      font-size: 1.2rem;
      font-weight: bold;
      font-family: Roboto;
    }
    .icon {
      align-self: flex-end;
      color: #b21f31;
    }
  }
  .scheduleDetails {
    .clockdiv {
      font-family: Roboto;
      color: black;
      display: inline-block;
      font-weight: 1000;
      text-align: center;
      font-size: 30px;
      padding: 2px;
      padding-left: 15px;
      border-radius: 50px;
    }

    .scopeInfo {
      margin-left: 15px;
    }

    .clockdiv > div {
      padding: 7px;
      border-radius: 3px;
      display: inline-block;
    }

    .clockdiv div > span {
      padding: 15px;
      border-radius: 3px;
      display: inline-block;
      font-family: Roboto;
    }

    .smalltext {
      padding-top: 5px;
      font-size: 15px;
      color: rgba(21, 21, 21, 0.73);
      font-weight: 500;
      font-family: Roboto;
    }
  }
  .equipmentDetails {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    .chart {
      width: 100%;
    }
  }
`;

const Loader = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  .loading {
    color: #b21f31;
  }
`;

interface IWidgets {
  type: string;
}

interface ITimeNow {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Widgets({ type }: IWidgets) {
  const [timeNow, setTimeNow] = useState<ITimeNow>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [closestEventDate, setClosestEventDate] = useState("");
  const [closestEventScope, setClosestEventScope] = useState("");
  const [scopeStatus, setScopeStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  var timeLtr = new Date(closestEventDate).getTime() / 1000;
  useEffect(() => {
    getClostestEvent();
    getScopeStatuses();
    let timer = setInterval(() => {
      var timeNow2 = new Date().getTime() / 1000;
      var diff = timeLtr - timeNow2;

      var noDays = Math.floor(diff / (24 * 60 * 60));
      var noHours = Math.floor((diff % (24 * 60 * 60)) / (60 * 60));
      var noMinutes = Math.floor((diff % (60 * 60)) / 60);
      var noSeconds = Math.floor(diff % 60);

      setTimeNow({
        days: noDays,
        hours: noHours,
        minutes: noMinutes,
        seconds: noSeconds,
      });
      clearInterval(timer);
    }, 1000);
  }, [timeNow]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2100);
  }, []);
  const getClostestEvent = async () => {
    await axios
      .get("http://" + ip.slice(0, -5) + ":4001/scopes/closestEvent")
      .then((closestDate) => {
        const obj = closestDate.data[0];
        const date = obj["eventDate"];
        const scope = obj["scopeName"];
        setClosestEventDate(date);
        setClosestEventScope(scope);
      });
  };

  const getScopeStatuses = async () => {
    await axios
      .get("http://" + ip.slice(0, -5) + ":4001/scopes/scoupeStatus")
      .then((statuses) => {
        setScopeStatus(statuses.data);
      });
  };

  var data;
  switch (type) {
    case "schedule":
      data = {
        title: <div className="title">Schedule</div>,
        details: (
          <>
            <div className="scheduleDetails">
              {loading ? (
                <Loader sx={{ color: "grey.500" }} spacing={2} direction="row">
                  <CircularProgress className="loading" color="inherit" />
                </Loader>
              ) : (
                <>
                  <span className="scopeInfo">
                    Sample {closestEventScope} in:
                  </span>
                  <div className="clockdiv">
                    <div>
                      <span>{timeNow.days}</span>
                      <div className="smalltext">Days</div>
                    </div>
                    <div>
                      <span>{timeNow.hours}</span>
                      <div className="smalltext">Hours</div>
                    </div>
                    <div>
                      <span>{timeNow.minutes}</span>
                      <div className="smalltext">Minutes</div>
                    </div>
                    <div>
                      <span>{timeNow.seconds}</span>
                      <div className="smalltext">Seconds</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ),
      };
      break;
    case "scope":
      data = {
        title: <div className="title">Scope Status</div>,
        details: (
          <div className="equipmentDetails">
            <ApexChart
              className="chart"
              type="pie"
              height="100%"
              width="100%"
              series={scopeStatus.map((t) => t["count(*)"])}
              options={{
                chart: {
                  width: 500,
                  type: "pie",
                },
                stroke: {
                  colors: ["transparent"],
                },
                plotOptions: {
                  pie: {
                    customScale: 1.1,
                    dataLabels: {
                      offset: -10,
                    },
                  },
                },
                labels: scopeStatus.map((t: IScopes) => t.scopeStatus),
                dataLabels: {
                  style: {
                    fontSize: "11px",
                    colors: ["white"],
                  },
                },
                legend: {
                  formatter: function (seriesName, opts) {
                    return (
                      seriesName +
                      ":  " +
                      opts.w.globals.series[opts.seriesIndex]
                    );
                  },
                },
                theme: {
                  mode: "light",
                  palette: "palette1",
                },
                colors: [
                  "#eb5f1a",
                  "#2a54a1",
                  "#f6a417",
                  "#34b3e7",
                  "#008FFB",
                  "#e3b017",
                  "#5bb1c7",
                ],
              }}
            />
          </div>
        ),
      };
      break;
    default:
      break;
  }

  return (
    <Container type={type}>
      <Link to={`/${type}`} state={{ type: `${type}` }}>
        <div className="top">
          {data?.title}
          <span className="icon">
            <KeyboardArrowRightRoundedIcon />
          </span>
        </div>
      </Link>
      {data?.details}
    </Container>
  );
}

export default React.memo(Widgets);
