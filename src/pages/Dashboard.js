// src/pages/Dashboard.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import CreateGroupDialog from "../components/CreateGroupDialog"; // Import the new dialog

const Dashboard = ({ groups, setGroups, setSelectedGroup }) => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

  // Open dialog to create a new group
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle the creation of a new group
  const handleCreateGroup = (groupData) => {
    setGroups([...groups, { id: Date.now(), name: groupData.groupName, members: groupData.members }]);
    setOpenDialog(false); // Close the dialog after creating a group
  };

  // Navigate to group details and pass the selected group through state
  const handleViewGroupDetails = (group) => {
    setSelectedGroup(group);
    navigate("/group-details", { state: { group } });
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Button to open the Create Group Dialog */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        style={{ marginBottom: "20px" }}
      >
        Create New Group
      </Button>

      <Typography variant="h6" gutterBottom>
        Your Groups
      </Typography>

      {/* Display groups in a table */}
      {groups.length === 0 ? (
        <Typography variant="body1">No groups available. Add a group to get started.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Group Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Members</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.members.length}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleViewGroupDetails(group)}
                      style={{ marginRight: "10px" }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        setGroups(groups.filter((g) => g.id !== group.id))
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create Group Dialog */}
      <CreateGroupDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
};

export default Dashboard;