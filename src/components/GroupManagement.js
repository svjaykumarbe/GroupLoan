// src/components/GroupManagement/GroupManagement.js
import React, { useState } from "react";
import { toast } from "react-toastify";

const GroupManagement = ({ groups, setGroups }) => {
  const [groupName, setGroupName] = useState("");

  const addGroup = () => {
    if (!groupName) {
      toast.error("Group name is required");
      return;
    }
    setGroups([...groups, { id: Date.now(), name: groupName, members: [] }]);
    setGroupName("");
    toast.success("Group added successfully");
  };

  return (
    <div>
      <h2>Manage Groups</h2>
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
      />
      <button onClick={addGroup}>Add Group</button>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupManagement;