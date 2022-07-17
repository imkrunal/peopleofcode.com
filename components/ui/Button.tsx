import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { createElement } from "react";
import { ImSpinner9 } from "react-icons/im";

type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export type ButtonBaseProps = {
  color?: "primary" | "secondary" | "minimal" | "warn" | "alert";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "fab" | "icon";
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  StartIcon?: SVGComponent;
  EndIcon?: SVGComponent;
  fullWidth?: boolean;
};
export type ButtonProps = ButtonBaseProps &
  (
    | (Omit<JSX.IntrinsicElements["a"], "href" | "onClick"> & LinkProps)
    | (Omit<JSX.IntrinsicElements["button"], "onClick"> & { href?: never })
  );

const Button = (props: ButtonProps) => {
  const {
    loading,
    StartIcon,
    size = "sm",
    color = "primary",
    EndIcon,
    fullWidth,
    ...passThroughProps
  } = props;
  const disabled = props.disabled || loading;
  const isLink = typeof props.href !== "undefined";
  const elementType = isLink ? "a" : "button";
  const element = createElement(
    elementType,
    {
      ...passThroughProps,
      disabled,
      className: classNames(
        "relative inline-flex items-center border border-transparent font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm cursor-pointer",
        fullWidth && "w-full justify-center",
        size === "xs" && "px-2.5 py-1.5 text-xs rounded",
        size === "sm" && "px-3 py-2 text-sm rounded-md",
        size === "md" && "px-4 py-2 text-sm rounded-md",
        size === "xl" && "px-6 py-3 text-base rounded-md",
        color === "primary" &&
          "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white"
      ),
      onClick: disabled
        ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault();
          }
        : props.onClick,
    },
    <>
      {StartIcon && (
        <StartIcon
          className={classNames(
            "inline",
            size === "icon"
              ? "h-5 w-5 "
              : "-ml-1 h-5 w-5 ltr:mr-2 rtl:ml-2 rtl:-mr-1"
          )}
        />
      )}
      {!loading && props.children}
      {loading && (
        <div>
          <ImSpinner9 className="mx-4 h-5 w-5 animate-spin text-white" />
        </div>
      )}
      {EndIcon && (
        <EndIcon className="-mr-1 inline h-5 w-5 ltr:ml-2 rtl:mr-2" />
      )}
    </>
  );

  return props.href ? (
    <Link passHref href={props.href}>
      {element}
    </Link>
  ) : (
    element
  );
};

export default Button;
