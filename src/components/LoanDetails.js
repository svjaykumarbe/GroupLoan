// src/components/LoanDetails/LoanDetails.js
import React, { useState } from "react";

const LoanDetails = ({ group }) => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanDetails, setLoanDetails] = useState([]);

  const addLoan = () => {
    const loan = {
      id: Date.now(),
      amount: loanAmount,
      date: new Date().toISOString(),
    };
    setLoanDetails([...loanDetails, loan]);
  };

  return (
    <div>
      <h3>Loan Details for {group.name}</h3>
      <input
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        placeholder="Enter loan amount"
      />
      <button onClick={addLoan}>Add Loan</button>
      <ul>
        {loanDetails.map((loan) => (
          <li key={loan.id}>
            Amount: ${loan.amount}, Date: {loan.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanDetails;