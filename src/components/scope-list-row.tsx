// Import deps
import React from "react";
import "./../styles/scope-list.css";

// Create interfaces
interface ScopeListRowUI {
  position: number;
  scope: {
    scopeId: number;
    scopeName: string;
    scopeSerial: string;
    scopeStatus: string;
    eventDate: string;
    updatedDate: string;
  };
  handleScopeRemove: (scopeId: number, scopeName: string) => void;
  handleUpdateScope: (
    scopeID: number,
    scopeName: string,
    newStatus: string
  ) => void;
}

// Create scopeListRow component

export const ScopeListRow = (props: ScopeListRowUI) => (
  <tr className="table-row">
    <td className="table-number">{props.position}</td>
    <td className="table-item">{props.scope.scopeName}</td>
    <td className="table-item">{props.scope.scopeSerial}</td>
    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() =>
          props.handleScopeRemove(props.scope.scopeId, props.scope.scopeName)
        }
      >
        Remove Scope
      </button>
    </td>
  </tr>
);
