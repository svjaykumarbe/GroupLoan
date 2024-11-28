import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const GroupDetails = ({ setSelectedGroup }) => {
  const location = useLocation(); // Access the location object to get the state
  const group = location.state?.group; // Retrieve the passed group from the state

  // Declare hooks before conditional logic
  const [memberName, setMemberName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");

  // Safely initialize members and loans if group is available, otherwise use empty arrays
  const [members, setMembers] = useState(group?.members || []);
  const [loans, setLoans] = useState(group?.loans || []);
  const navigate = useNavigate();

  // Handle early return if no group is found
  useEffect(() => {
    if (!group) {
      // Redirect to Dashboard if group is not found
      setSelectedGroup(null);
      navigate("/");
    }
  }, [group, navigate, setSelectedGroup]);

  // Add a member to the group
  const addMember = () => {
    if (memberName.trim()) {
      setMembers([...members, memberName]);
      setMemberName(""); // Clear input field
    }
  };

  // Add a loan to the group
  const addLoan = () => {
    const amount = parseFloat(loanAmount);
    if (amount > 0) {
      setLoans([...loans, { amount, date: new Date().toISOString() }]);
      setLoanAmount(""); // Clear input field
    }
  };

  // Calculate total loan amount
  const totalLoanAmount = loans.reduce((total, loan) => total + loan.amount, 0);

  if (!group) {
    return (
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h6" color="error">
          Group not found. Redirecting back to dashboard...
        </Typography>
      </Box>
    );
  }

  // Check if group.name is a valid string or an object
  const groupName = group?.name ? (
    typeof group.name === "string" ? (
      group.name
    ) : (
      // If group.name is an object, display a JSON string of the object for debugging
      JSON.stringify(group.name)
    )
  ) : (
    "Unknown Group"
  );

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedGroup(null);
          navigate("/");
        }}
        style={{ marginBottom: "20px" }}
      >
        Back to Dashboard
      </Button>

      {/* Group Name */}
      <Typography variant="h4" gutterBottom>
        Group: {groupName}
      </Typography>

      {/* Members Section */}
      <Typography variant="h6" gutterBottom>
        Members in {groupName}
      </Typography>
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: "20px" }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Enter member name"
            variant="outlined"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="secondary" fullWidth onClick={addMember}>
            Add Member
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ marginBottom: "30px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Member Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Loans Section */}
      <Typography variant="h6" gutterBottom>
        Loan Details for {groupName}
      </Typography>
      <Grid container spacing={2} alignItems="center" style={{ marginBottom: "20px" }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Enter loan amount"
            variant="outlined"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" color="secondary" fullWidth onClick={addLoan}>
            Add Loan
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan, index) => (
              <TableRow key={index}>
                <TableCell>${loan.amount}</TableCell>
                <TableCell>{new Date(loan.date).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total Loan Amount */}
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Total Loan Amount: ${totalLoanAmount.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default GroupDetails;