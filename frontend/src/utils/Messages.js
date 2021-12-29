import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyError = (msg) => toast.error(msg);
export const notifySuccess = (msg) => toast.success(msg);
export const notifyDismiss = (msg) => toast.dismiss(msg);
export const notifyInfo = (msg) => toast.info(msg);
export const notifyWarn = (msg) => toast.warn(msg);
