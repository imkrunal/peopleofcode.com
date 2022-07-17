import classNames from "classnames";
import { ReactNode } from "react";
import {
  HiCheckCircle,
  HiExclamation,
  HiInformationCircle,
  HiXCircle,
} from "react-icons/hi";

type AlertProps = {
  children: ReactNode;
  type?: "success" | "info" | "warn" | "error";
};

const Alert = ({ children, type = "info" }: AlertProps) => {
  return (
    <div
      className={classNames(
        "rounded-md p-4",
        type === "success" && "bg-green-50",
        type === "info" && "bg-blue-50",
        type === "warn" && "bg-orange-50",
        type === "error" && "bg-red-50"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {type === "success" && (
            <HiCheckCircle
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          )}
          {type === "info" && (
            <HiInformationCircle
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
          )}
          {type === "warn" && (
            <HiExclamation
              className="h-5 w-5 text-orange-400"
              aria-hidden="true"
            />
          )}
          {type === "error" && (
            <HiXCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3">
          <p
            className={classNames(
              "text-sm font-mediu",
              type === "success" && "text-green-800",
              type === "info" && "text-blue-800",
              type === "warn" && "text-orange-800",
              type === "error" && "text-red-800"
            )}
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
