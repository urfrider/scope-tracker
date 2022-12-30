import React, { useEffect, useState } from "react";
import axios from "axios";

import { ScopeList } from "./scope-list";

// interface ScopeUI {
//     scopeId: number;
//     scopeName: string;
//     scopeSerial: string;
//     scopeStatus: string;
//     eventDate: string;
//     updatedDate: string;
// }

// interface ScopeListMeta{
//     scopes: ScopeUI[];
// }

export const ScopeMetadata = () => {
  const [scopesAvail, setScopesAvail] = useState(0);
  const [scopesUnavail, setScopesUnavail] = useState(0);
  const [scopesRepair, setScopesRepair] = useState(0);
  const [closestEventDate, setClosestEventDate] = useState("");
  const [closestEventScope, setClosestEventScope] = useState("");
  const [scopeStatus, setScopeStatus] = useState([]);
  var ip = window.location.host;

  useEffect(() => {
    numAvailScopes();
  }, []);

  const numAvailScopes = async () => {
    // Send Get request to 'scope/avail' endpoint
    axios
      .get("http://" + ip.slice(0, -5) + ":4001/scopes/avail")
      .then((count) => {
        setScopesAvail(count.data);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the scope list: ${error}`)
      );
  };

  const handleUpdateScope = (
    scopeId: number,
    scopeName: string,
    newStatus: string
  ) => {
    // Send PUT request to updateScope endpoint
    axios
      .put("http://" + ip.slice(0, -5) + ":4001/scopes/updateStatus", {
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

  const getClostestEvent = () => {
    axios
      .get("http://" + ip.slice(0, -5) + ":4001/scopes/closestEvent")
      .then((closestDate) => {
        const obj = closestDate.data[0];
        const date = obj["eventDate"];
        const scope = obj["scopeName"];
        setClosestEventDate(date);
        setClosestEventScope(scope);
      });
  };

  const getScopeStatuses = () => {
    axios
      .get("http://" + ip.slice(0, -5) + ":4001/scopes/scoupeStatus")
      .then((statuses) => {
        setScopeStatus(statuses.data);
      });
  };
};
