//import deps
import React from "react";

// Import components
import { ScopeListRow } from "./scope-list-row";

// Import styles
import "./../styles/scope-list.css";

// Create interfaces
interface ScopeUI {
  scopeId: number;
  scopeName: string;
  scopeSerial: string;
  scopeStatus: string;
  eventDate: string;
  updatedDate: string;
}

interface ScopeListUI {
  scopes: ScopeUI[];
  loading: boolean;
  handleScopeRemove: (scopeId: number, scopeName: string) => void;
  handleUpdateScope: (
    scopeID: number,
    scopeName: string,
    newStatus: string
  ) => void;
}

// Create ScopeList component
export const ScopeList = (props: ScopeListUI) => {
  // Show Loading Message
  if (props.loading) return <p>Master Scope Table is loading...</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table-head-item" />
          <th className="table-head-item">Scope Name</th>
          <th className="table-head-item">Serial</th>
          <th className="table-head-item" />
        </tr>
      </thead>
      <tbody className="table-body">
        {props.scopes.length > 0 ? (
          props.scopes.map((scope: ScopeUI, idx) => (
            <ScopeListRow
              key={scope.scopeId}
              scope={scope}
              position={idx + 1}
              handleScopeRemove={props.handleScopeRemove}
              handleUpdateScope={props.handleUpdateScope}
            />
          ))
        ) : (
          <tr className="table-row">
            <td
              className="table-item"
              style={{ textAlign: "center" }}
              colSpan={6}
            >
              There are no books to show. Create one!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
