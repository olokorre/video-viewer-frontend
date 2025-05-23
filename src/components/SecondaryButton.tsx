import { MouseEventHandler } from "react";

interface Props {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: MouseEventHandler | undefined;
  icon?: string;
  disabled?: boolean;
}

export default function SecondaryButton(props: Props) {
  return (
    <button
      type={props.type}
      className={`bg-white hover:bg-gray-100 text-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={props.disabled ? undefined : props.onClick}
      disabled={props.disabled}
    >
      {props.icon && <span className="icon-class mr-2">{props.icon}</span>}
      {props.text}
    </button>
  );
}
