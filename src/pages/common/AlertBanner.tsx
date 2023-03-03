import { Alert } from "react-bootstrap";

interface IAlertBanner {
  message?: string;
  variant?: "danger" | "warning";
}
const AlertBanner = ({
  message = "An unexpected error occurred , please try again later",
  variant = "danger",
}: IAlertBanner) => {
  return <Alert variant={variant}>{message}</Alert>;
};

export default AlertBanner;
