import { MouseEventHandler } from "react";

interface Props {
  text: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: MouseEventHandler | undefined;
}

export default function PrimaryButton(props: Props) {
  return (
    <button
      type={props.type}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
