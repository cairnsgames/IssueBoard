import { useContext } from "react";
import { ToastsContext } from "./toastsprovider";

export const useToasts = () => {
  // get the context
  const context = useContext(ToastsContext);

  // if `undefined`, throw an error
  if (!context) {
    throw new Error("useToasts was used outside of its Provider");
  }
  const { toasts, addToast, closeToast } = context;

  return {
    toasts,
    addToast,
    closeToast,
  };
};
