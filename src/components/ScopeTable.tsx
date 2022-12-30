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
import ConfirmDialog from "./ConfirmDialog";
export const ScopeTable = () => {
  // Prepare States
  const [scopeName, setScopeName] = useState("");
  const [scopeType, setScopeType] = useState("");
  const [brandName, setBrandName] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [scopeSerial, setScopeSerial] = useState("");
  const [scopeStatus, setScopeStatus] = useState("");
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
  var ip = window.location.host;

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
    setScopeName("");
    setScopeType("");
    setBrandName("");
    setModelNumber("");
    setScopeSerial("");
    setScopeStatus("");
    setPersonnelName("");
    setEventDate("");
    setUpdatedDate("");
    setComments("");
  };

  // Create new book
  const handleScopeCreate = () => {
    // Send POST request to 'scopes/create' endpoint
    axios
      .post("http://" + ip.slice(0, -5) + ":4001/scopes/create", {
        scopeName: scopeName,
        scopeType: scopeType,
        brandName: brandName,
        modelNumber: modelNumber,
        scopeSerial: scopeSerial,
        scopeStatus: scopeStatus,
        personnelName: personnelName,
        eventDate: eventDate,
        updatedDate: updatedDate,
        comments: comments,
      })
      .then((res) => {
        console.log(res.data);

        // Fetch all scopes to refresh
        // the scopes on the scope table
        fetchScopes();
      })
      .catch((error) =>
        console.error(`There was an error creating ${scopeName} : ${error}`)
      );
  };

  // Submit new book
  const handleScopeSubmit = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Submit",
      subtitle: "Are you sure you want to submit?",
      onConfirm: () => {
        if (
          scopeName.length > 0 &&
          brandName.length > 0 &&
          modelNumber.length > 0 &&
          scopeSerial.length > 0 &&
          scopeStatus.length > 0 &&
          personnelName.length > 0
        ) {
          // Create new  scope
          handleScopeCreate();

          console.info(`${scopeName} with serial ${scopeSerial} added.`);

          // Reset all input fields
          handleInputsReset();
        }
        setConfirmDialog((prev) => {
          return { ...prev, isOpen: false };
        });
      },
    });
    // Check if all fields are filled
    // if (
    //   scopeName.length > 0 &&
    //   brandName.length > 0 &&
    //   modelNumber.length > 0 &&
    //   scopeSerial.length > 0 &&
    //   scopeStatus.length > 0 &&
    //   personnelName.length > 0
    // ) {
    //   // Create new  scope
    //   handleScopeCreate();

    //   console.info(`${scopeName} with serial ${scopeSerial} added.`);

    //   // Reset all input fields
    //   handleInputsReset();
    // }
  };

  const handleScopeRemove = (scopeId: number, scopeName: string) => {
    // Send PUT request to scope/delete' endpoint
    axios
      .put("http://" + ip.slice(0, -5) + ":4001/scopes/delete", {
        scopeId: scopeId,
      })
      .then(() => {
        console.log(`${scopeName} removed.`);

        // Fetch all scopes to refresh
        // the scopes on the scope table
        fetchScopes();
      })
      .catch((error) =>
        console.error(`There was an error removing ${scopeName} : ${error}`)
      );
  };
  // Reset scope list (remove all scopes)
  const handleListReset = () => {
    // Send PUT request to 'scopes/reset' endpoint
    axios
      .put("http://" + ip.slice(0, -5) + ":4001/scopes/reset")
      .then(() => {
        // Fetch all scopes to refresh
        // the scopes on the scopeshelf list
        fetchScopes();
      })
      .catch((error) =>
        console.error(`There was an error resetting the Scope table: ${error}`)
      );
  };

  const handleUpdateScope = (
    scopeId: number,
    scopeName: string,
    newStatus: string
  ) => {
    // Send PUT request to updateScope endpoint
    axios
      .put('http://"+ip.slice(0,-5)+":4001/scopes/updateStatus', {
        scopeId: scopeId,
        scopeStatus: newStatus,
      })
      .then(() => {
        console.log(`${scopeName} status updated to ${newStatus}.`);
      })
      .catch((error) =>
        console.error(`There was an error updating ${scopeName} : ${error}`)
      );
  };

  return (
    <div className="scope-list-wrapper">
      {/* Form for creating new scope */}
      <div className="scope-list-form">
        <div className="form-wrapper" onSubmit={handleScopeSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="scopeName">
                Enter Scope Name:
              </label>
              <input
                className="form-input"
                type="text"
                id="scopeName"
                name="scopeName"
                value={scopeName}
                onChange={(e) => setScopeName(e.currentTarget.value)}
              />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="scopeType">
                Enter Scope Type:
              </label>
              <input
                className="form-input"
                type="text"
                id="scopeType"
                name="scopeType"
                value={scopeType}
                onChange={(e) => setScopeType(e.currentTarget.value)}
              />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="brandName">
                Enter Brand Name:
              </label>
              <input
                className="form-input"
                type="text"
                id="brandName"
                name="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.currentTarget.value)}
              />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="modelNumber">
                Enter Model Number:
              </label>
              <input
                className="form-input"
                type="text"
                id="modelNumber"
                name="modelNumber"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.currentTarget.value)}
              />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="scopeSerial">
                Enter Scope Serial:
              </label>
              <input
                className="form-input"
                type="text"
                id="scopeSerial"
                name="scopeSerial"
                value={scopeSerial}
                onChange={(e) => setScopeSerial(e.currentTarget.value)}
              />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="scopeStatus">
                Enter Scope Status:
              </label>
              <input
                className="form-input"
                type="text"
                id="scopeStatus"
                name="scopeStatus"
                value={scopeStatus}
                onChange={(e) => setScopeStatus(e.currentTarget.value)}
              />
            </fieldset>
          </div>

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
          Add the scope
        </button>
        {/* Render Scope list component */}
        <ScopeList
          scopes={scopes}
          loading={loading}
          handleScopeRemove={handleScopeRemove}
          handleUpdateScope={handleUpdateScope}
        />
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};
