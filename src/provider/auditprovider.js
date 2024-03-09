import React, { createContext, useEffect, useState } from "react";

const AuditContext = createContext();

const AuditProvider = (props) => {
  const { children } = props;

  if (props?.user === undefined) {
    throw new Error("AuditProvider was used without a user");
  }

  const [audits, setAudits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("Audit chnaged", audits)
  }, [audits]);

  const getNextId = () => {
    setCounter(counter + 1);
    return counter;
  };

  const addAudit = (table, action, message, data, additional) => {
    const newAudit = {
      id: getNextId(),
      table,
      action,
      message,
      data,
      additional,
      user: props?.user?.id,
      starttime: new Date(),
      status: "success",
    };
    setAudits([...audits, newAudit]);
  };

  const startTransaction = (table, action, message, data, additional) => {
    const newTransaction = {
      id: getNextId(),
      table,
      action,
      message,
      data,
      additional,
      user: props?.user?.id,
      time: new Date(),
    };
    setTransactions([...transactions, newTransaction]);
    return newTransaction;
  };

  const commitTransaction = (transaction, data) => {
    const newAudit = {
      id: transaction.id,
      user: props?.user?.id,
      table: transaction.table,
      action: transaction.action,
      message: transaction.message,
      before: transaction.data,
      after: data,
      additional: transaction.additional,
      starttime: transaction.time,
      endtime: new Date(),
      status: "success",
    };
    setAudits([...audits, newAudit]);
    setTransactions(
      transactions.map((item) => {
        if (item.id !== transaction.id) {
          return item;
        }
      })
    );
  };

  const failTransaction = (transaction, message) => {
    const newAudit = {
      id: transaction.id,
      user: props?.user?.id,
      table: transaction.table,
      action: transaction.action,
      message: transaction.message,
      before: transaction.data,
      additional: transaction.additional,
      starttime: transaction.time,
      endtime: new Date(),
      status: "Failed",
      error: message,
    };
    setAudits([...audits, newAudit]);
    setTransactions(
      transactions.map((item) => {
        if (item.id !== transaction.id) {
          return item;
        }
      })
    );
  };

  return (
    <AuditContext.Provider
      value={{ audits, addAudit, startTransaction, commitTransaction, failTransaction }}
    >
      {children}
    </AuditContext.Provider>
  );
};

export { AuditContext, AuditProvider };
