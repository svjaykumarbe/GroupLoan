// src/components/MemberManagement/MemberManagement.js
import React, { useState } from "react";

const MemberManagement = ({ group, updateGroup }) => {
  const [memberName, setMemberName] = useState("");

  const addMember = () => {
    if (!memberName) return;
    const updatedGroup = {
      ...group,
      members: [...group.members, { id: Date.now(), name: memberName }],
    };
    updateGroup(updatedGroup);
    setMemberName("");
  };

  return (
    <div>
      <h3>Members in {group.name}</h3>
      <input
        type="text"
        value={memberName}
        onChange={(e) => setMemberName(e.target.value)}
        placeholder="Enter member name"
      />
      <button onClick={addMember}>Add Member</button>
      <ul>
        {group.members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MemberManagement;