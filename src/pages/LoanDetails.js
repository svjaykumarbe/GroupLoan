// src/pages/LoanDetails.js
import React, { useState } from "react";

const LoanDetailsPage = ({ group }) => {
  const [loanDetails, setLoanDetails] = useState(group.loanDetails || []);
  const [loanAmount, setLoanAmount] = useState(0);

  const addLoan = () => {
    if (!loanAmount || loanAmount <= 0) return;
    const newLoan = {
      id: Date.now(),
      amount: loanAmount,
      date: new Date().toISOString(),
    };
    setLoanDetails([...loanDetails, newLoan]);
    setLoanAmount(0);
  };

  return (
    <div>
      <h1>Loan Details for {group.name}</h1>
      <input
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(Number(e.target.value))}
        placeholder="Enter loan amount"
      />
      <button onClick={addLoan}>Add Loan</button>
      <h2>Loan History</h2>
      <ul>
        {loanDetails.map((loan) => (
          <li key={loan.id}>
            Loan ID: {loan.id} | Amount: ${loan.amount} | Date: {loan.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanDetailsPage;