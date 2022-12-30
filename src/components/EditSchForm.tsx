// Import deps
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
// Import components
import { ScopeList } from "./scope-list";
// Import styles
import "./../styles/scopetable.css";
import "../../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";

interface IEditSchForm {
  scopeId: number;
  scopeName: string;
  setOpen: any;
  setFlag2: any;
  flag2: any;
}

export const EditSchForm = ({
  scopeId,
  scopeName,
  setOpen,
  setFlag2,
  flag2,
}: IEditSchForm) => {
  var ip = window.location.host;
  // Prepare States
  const [personnelName, setPersonnelName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [comments, setComments] = useState("");
  const [scopes, setScopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subtitle: "",
    onConfirm: {},
  });

  // Fetch all scopes on initial render
  useEffect(() => {
    fetchScopes();
    //Get Today's Date
    const today = new Date();
    const yyyy = today.getFullYear();
    let MM = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours();
    let mm = today.getMinutes();
    let ss = today.getSeconds();

    const formattedToday =
      yyyy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
    setUpdatedDate(formattedToday);
  }, []);

  // Fetch all scopes
  const fetchScopes = async () => {
    // Send GET request to 'scope/all' endpoint
    axios
      .get("http://" + ip.slice(0, -5) + ":4001/scopes/all")
      .then((response) => {
        // Update the books state
        setScopes(response.data);

        // Update Loading state
        setLoading(false);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the scope list: ${error}`)
      );
  };

  // Reset all input fields
  const handleInputsReset = () => {
    setPersonnelName("");
    setEventDate("");
    setUpdatedDate("");
    setComments("");
  };

  // Submit new book
  const handleScopeSubmit = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Submit",
      subtitle: "Are you sure you want to submit?",
      onConfirm: () => {
        // Check if all fields are filled
        if (personnelName.length > 0) {
          // Create new  scope
          handleUpdateScopeSchedule();

          console.info(`${scopeName} has been rescheduled.`);

          // Reset all input fields
          handleInputsReset();
          setOpen(false);
          if (flag2 === 0) {
            setFlag2(1);
          } else {
            setFlag2(0);
          }
        }
      },
    });
  };

  const handleUpdateScopeSchedule = () => {
    // Send PUT request to updateScope endpoint
    axios
      .put("http://" + ip.slice(0, -5) + ":4001/scopes/updateSchedule", {
        scopeId: scopeId,
        personnelName: personnelName,
        eventDate: eventDate,
        updatedDate: updatedDate,
        comments: comments,
      })
      .then((res) => {
        console.log(res.data);
        fetchScopes();
      })
      .catch((error) =>
        console.error(`There was an error updating ${scopeName} : ${error}`)
      );
  };

  return (
    <div className="scope-list-wrapper">
      {/* Form for creating new scope */}
      <div>
        UPDATING SCOPE ID: {scopeId}, {scopeName}
      </div>
      <br></br>
      <div className="scope-list-form">
        <div className="form-wrapper" onSubmit={handleScopeSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="personnelName">
                Personnel Name:
              </label>
              <input
                className="form-input"
                type="text"
                id="personnelName"
                name="personnelName"
                value={personnelName}
                onChange={(e) => setPersonnelName(e.currentTarget.value)}
              />
            </fieldset>
          </div>

          <div>
            <fieldset>
              <br></br>
              <label className="form-label" htmlFor="eventDate">
                Enter Event Date:
              </label>
              <DateTimePickerComponent
                id="datetimepicker"
                placeholder="Select a date and time"
                format={"yyyy-MM-dd hh:mm:ss"}
                onChange={(e: any) => {
                  setEventDate(e.value);
                  console.log(eventDate);
                }}
              />
              <br></br>
            </fieldset>
          </div>

          <div>
            <fieldset>
              <br></br>
              <label className="form-label" htmlFor="updatedDate">
                Enter Updated Date:
              </label>
              <DateTimePickerComponent
                id="datetimepicker"
                placeholder="Select a date and time"
                format={"yyyy-MM-dd hh:mm:ss"}
                value={new Date(updatedDate)}
                onChange={(e: any) => {
                  setUpdatedDate(e.value);
                  console.log(updatedDate);
                }}
              />
              <br></br>
              <br></br>
            </fieldset>
          </div>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="comments">
                Comments:
              </label>
              <input
                className="form-input"
                type="text"
                id="comments"
                name="comments"
                value={comments}
                onChange={(e) => setComments(e.currentTarget.value)}
              />
            </fieldset>
          </div>
        </div>

        <button onClick={handleScopeSubmit} className="btn btn-add">
          Update Scope Schedule
        </button>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};
