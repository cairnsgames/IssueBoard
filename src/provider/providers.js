import { AuditProvider } from "./auditprovider";
import { BoardProvider } from "./boardprovider";
import { ToastsProvider } from "./toastsprovider";

const Providers = (props) => {
  return (
    <AuditProvider user={props?.user}>
      <ToastsProvider>
        <BoardProvider>{props.children}</BoardProvider>
      </ToastsProvider>
    </AuditProvider>
  );
};

export default Providers;
