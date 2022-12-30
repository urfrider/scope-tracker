import React, { useEffect, useReducer, useState } from "react";
import FullCalendar, { compareByFieldSpec } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from "@fullcalendar/list";
import axios from "axios";
import styled from "styled-components";
import "./../styles/fullcalendar.css";

const Container = styled.div`
  background-color: #f1f2f6;
  height: 150px;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 1px 16px 19px -7px rgba(135, 125, 125, 0.71);
  -webkit-box-shadow: 1px 16px 19px -7px rgba(135, 125, 125, 0.71);
  -moz-box-shadow: 1px 16px 19px -7px rgba(135, 125, 125, 0.71);
`;
var ip = window.location.host
const Calendar = () => {
  const [scopes, setScopes] = useState([]);
  const [event, setEvent] = useState<any>({});
  const [tempEvent, setTempEvent] = useState<any>({});
  const [dayDate, setDayDate] = useState("");
  const [flag, setFlag] = useState(0);
  const vardate = dayDate;

  const fetchScopes = async () => {
    // Send GET request to 'scope/all' endpoint
    axios
      .get("http://"+ip.slice(0,-5)+":4001/scopes/all")
      .then((response) => {
        // Update the books state
        setScopes(response.data);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the scope list: ${error}`)
      );
  };

  //Everytime dayDate changes, component re-renders setting event to empty
  useEffect(() => {
    fetchScopes();
    setEvent("");
  }, [dayDate]);

  //Causing this domino effect 1, this sets the flag to toggle, AND RE-RENDERS the page (this would hide the previous calander)
  useEffect(() => {
   console.log(event) 
    if(event === ""){
      if(flag === 0){
        setFlag(1);
      }else{
        setFlag(0)
      }
    }},[event])

  // Causing this domino effect 2, which sets the actual event that was clicked, since calander list was empty on domino effect 1, 
  //this cause a new calander list to initialise according to a new click
  useEffect(() => {
    var temp = tempEvent;
    setEvent((prevEvent: any) => (prevEvent = temp));
  }, [flag]);

  const data = scopes?.map((obj: any) => {
    return {
      title: obj.scopeName + " scheduled for sampling",
      date: obj.eventDate,
    };
  });

  const handleEventClick = (arg: any) => {
    console.log("Handler active!")
    setTempEvent((prevEvent: any) => (prevEvent = arg.event));
    setDayDate(arg.event.startStr.slice(0, 10));
  };

  var mili = Date.parse(event?.startStr);
  var date = new Date(mili);
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={data}
        eventClick={handleEventClick}
        selectable={true}
        selectLongPressDelay={1}
        eventColor="#ff0000"
        eventBackgroundColor="black"
      />
      {event?.title == null ? (
        <></>
      ) : (
        <>
          <br></br>
          <FullCalendar
            plugins={[listPlugin]}
            initialView="listDay"
            events={data}
            initialDate={vardate}
            headerToolbar={{ start: "", center: "", end: "" }}
            listDaySideFormat={{ month: "long", day: "2-digit" }}
            eventColor="#ff0000"
          />
        </>
      )}
    </>
  );
};

export default Calendar;
