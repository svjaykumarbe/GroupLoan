// src/components/CreateGroupDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography, // Add this import for Typography
} from "@mui/material";

const CreateGroupDialog = ({ open, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([{ name: "" }]);
  const [newMemberName, setNewMemberName] = useState("");

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      setMembers([...members, { name: newMemberName }]);
      setNewMemberName("");
    }
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleCreate = () => {
    if (groupName.trim() && members.length > 0) {
      onCreateGroup({ groupName, members });
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Group</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Group Name"
          variant="outlined"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          fullWidth
          label="Enter member name"
          variant="outlined"
          value={newMemberName}
          onChange={(e) => setNewMemberName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button variant="contained" color="secondary" onClick={handleAddMember}>
          Add Member
        </Button>

        {/* Add a Typography component for displaying messages or headings */}
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Members List
        </Typography>

        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Member Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => handleRemoveMember(index)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary" variant="contained">
          Create Group
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupDialog;