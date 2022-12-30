import React, { useEffect, useReducer, useState } from "react";
import FullCalendar, { compareByFieldSpec } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from "@fullcalendar/list";
import axios from "axios";
import styled from "styled-components";
import { EditSchForm } from "./EditSchForm";
import { stringify } from "querystring";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import "./../styles/fullcalendar.css";

const Container = styled.div`
  background-color: transparent;
  height: 80px;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50%;
    background-color: #b21f31;
    border-radius: 10px;
    color: #f1f2f6;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 10px;
  }

  .button1,
  .button2 {
    &:hover {
      background-color: grey;
      color: white;
    }
  }

  .details {
    position: relative;
  }
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const closeBtnStyle = {
  position: "absolute",
  top: 5,
  right: 5,
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
var ip = window.location.host;

const CalendarEdit = () => {
  const [scopes, setScopes] = useState([]);
  const [event, setEvent] = useState<any>({});
  const [tempEvent, setTempEvent] = useState<any>({});
  const [dayDate, setDayDate] = useState("");
  const [dayTitle, setDayTitle] = useState("");
  const [dayScopeId, setDayScopeId] = useState(0);
  const [dayName, setDayName] = useState("");
  const [flag, setFlag] = useState(0);
  const [flag2, setFlag2] = useState(0);

  const vardate = dayDate;
  const [open, setOpen] = React.useState(false);

  const fetchScopes = async () => {
    // Send GET request to 'scope/all' endpoint
    axios
      .get("http://" + ip.slice(0, -5) + ":4001/scopes/all")
      .then((response) => {
        // Update the books state
        setScopes(response.data);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the scope list: ${error}`)
      );
  };

  //Everytime dayDate changes, component re-renders
  useEffect(() => {
    fetchScopes();
    setEvent("");
  }, [dayDate, flag2]);

  //Causing this domino effect 1, this sets the flag to toggle, AND RE-RENDERS the page (this would hide the previous calander)
  useEffect(() => {
    console.log(event);
    if (event === "") {
      if (flag === 0) {
        setFlag(1);
      } else {
        setFlag(0);
      }
    }
  }, [event]);

  // Causing this domino effect 2, which sets the actual event that was clicked, since calander list was empty on domino effect 1,
  //this cause a new calander list to initialise according to a new click
  useEffect(() => {
    var temp = tempEvent;
    setEvent((prevEvent: any) => (prevEvent = temp));
  }, [flag]);

  const data = scopes?.map((obj: any) => {
    if (obj.scopeId.toString().length < 2) var newScopeId = "0" + obj.scopeId;
    else newScopeId = obj.scopeId;
    return {
      title: obj.scopeName + " scheduled for sampling " + newScopeId,
      date: obj.eventDate,
    };
  });

  const handleEventClick = (arg: any) => {
    setTempEvent((prevEvent: any) => (prevEvent = arg.event));
    setDayDate(arg.event.startStr.slice(0, 10));
    setDayTitle(arg.event.title.slice(0, -2));
    var currentScopeId = arg.event.title.slice(-2);
    if (currentScopeId.slice(0, 1) === "0") {
      setDayScopeId(currentScopeId.toString().slice(1, 2));
    } else setDayScopeId(currentScopeId);

    scopes?.map((obj: any) => {
      if (obj.scopeId.toString() === dayScopeId.toString()) {
        setDayName((prevName: any) => (prevName = obj.scopeName));
      }
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var mili = Date.parse(event?.startStr);
  var date = new Date(mili);
  var scopeId = "test";

  return (
    <>
      <Wrapper>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={data}
          eventClick={handleEventClick}
          selectable={true}
          selectLongPressDelay={1}
          eventColor="#ff0000"
          eventBackgroundColor="#9b9e9e"
        />
        {event?.title == null ? (
          <></>
        ) : (
          <Container>
            <div className="details">
              {dayTitle} on {dayDate}
              <br></br>
              <Button onClick={handleOpen}>Edit Schdeule</Button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <IconButton
                  sx={closeBtnStyle}
                  onClick={handleClose}
                  className="icon"
                >
                  <CloseIcon />
                </IconButton>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Update Schedule
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <EditSchForm
                    flag2={flag2}
                    setFlag2={setFlag2}
                    setOpen={setOpen}
                    scopeId={dayScopeId}
                    scopeName={dayName}
                  />
                </Typography>
              </Box>
            </Modal>
          </Container>
        )}
      </Wrapper>
    </>
  );
};

export default CalendarEdit;
