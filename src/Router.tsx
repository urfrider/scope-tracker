import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Available from "./components/Available";
import InUse from "./components/InUse";
import UnderRepair from "./components/UnderRepair";
import Equipment from "./pages/Equipment";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Scan from "./pages/Scan";
import SchEdit from "./pages/SchEdit";
import Schedule from "./pages/Schedule";
import ScopeEdit from "./pages/ScopeEdit";
import Update from "./pages/Update";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path={"scope/"} element={<Equipment />}>
            <Route path={"available"} element={<Available />} />
            <Route path={"inUse"} element={<InUse />} />
            <Route path={"underRepair"} element={<UnderRepair />} />
          </Route>
          <Route path={"dryer/"} element={<Equipment />}>
            <Route path={"available"} element={<Available />} />
            <Route path={"inUse"} element={<InUse />} />
            <Route path={"underRepair"} element={<UnderRepair />} />
          </Route>
          <Route path="schedule" element={<Schedule />} />
          <Route path="update" element={<Update />} />
          <Route path="scan" element={<Scan />} />
          <Route path="profile" element={<Profile />} />
          <Route path="scopeEdit" element={<ScopeEdit />} />
          <Route path="schEdit" element={<SchEdit />} />
          <Route path="help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
