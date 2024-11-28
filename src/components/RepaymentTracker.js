// src/components/RepaymentTracker/RepaymentTracker.js
import React from "react";

const RepaymentTracker = ({ loanDetails, repaymentRate }) => {
  const calculateRepayments = () =>
    loanDetails.map((loan) => ({
      ...loan,
      repayment: loan.amount + loan.amount * repaymentRate,
    }));

  return (
    <div>
      <h3>Repayment Tracker</h3>
      <ul>
        {calculateRepayments().map((loan) => (
          <li key={loan.id}>
            Loan ID: {loan.id}, Repayment: ${loan.repayment.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepaymentTracker;