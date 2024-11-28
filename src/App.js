// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import GroupDetails from "./pages/GroupDetails";
import LoanDetailsPage from "./pages/LoanDetails";

const App = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const updateGroup = (updatedGroup) => {
    setGroups(groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                groups={groups}
                setGroups={setGroups}
                setSelectedGroup={setSelectedGroup}
              />
            }
          />
          <Route
            path="/group-details"
            element={
              <GroupDetails
                group={selectedGroup}
                updateGroup={updateGroup}
              />
            }
          />
          <Route
            path="/loan-details"
            element={<LoanDetailsPage group={selectedGroup} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;