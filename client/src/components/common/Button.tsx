import React, { FunctionComponent } from "react";
import classNames from "classnames";
import Icon from "./Icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon?: string;
  value?: string;
  variant?: Variants;
}

export enum Variants {
  BASE = "base",
  NEUTRAL = "neutral",
  DEFAULT = "default",
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className = "",
  icon,
  value,
  variant = Variants.NEUTRAL,
  ...otherProps
}) => {
  return (
    <button
      className={classNames(
        "px-4 py-2 text-base disabled:text-gray-500 disabled:cursor-not-allowed uppercase border-2 border-transparent",
        {
          "rounded-container bg-yellow-200 hover:bg-yellow-100 hover:border-black disabled:bg-gray-100":
            variant === Variants.NEUTRAL,
        },
        {
          "hover:rounded-container hover:bg-yellow-100 hover:border-black disabled:bg-gray-100":
            variant === Variants.BASE,
        },
        {
          "hover:bg-gradient-to-t hover:border-black hover:from-blue-300 hover:to-blue-100 bg-gradient-to-t from-blue-300 to-blue-500 rounded-container hover:bg-white hover:text-black disabled:bg-gray-100":
            variant === Variants.DEFAULT,
        },
        className
      )}
      {...otherProps}
    >
      {icon && <Icon icon={icon} aria-hidden="true" />}
      {value ? <span className={icon && "ml-2"}>{value}</span> : children}
    </button>
  );
};

export default Button;
