import { useContext } from "react";
import { AuditContext } from "./auditprovider";

export const useAudit = () => {
  // get the context
  const context = useContext(AuditContext);

  // if `undefined`, throw an error
  if (!context) {
    throw new Error("useAudit was used outside of its Provider");
  }
  const {
    audits, addAudit, startTransaction, commitTransaction, failTransaction
  } = context;

  return {    
    audits, addAudit, startTransaction, commitTransaction, failTransaction
  };
};
