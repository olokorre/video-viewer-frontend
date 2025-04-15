interface Props {
  placeholder: string;
  required: boolean;
  name: string;
  label: string;
  accept?: string;
}

export default function FileInput(props: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
      <label
        htmlFor={props.name}
        className="sm:col-span-3 text-base font-medium text-gray-800 dark:text-gray-200"
      >
        {props.label}
      </label>
      <input
        type="file"
        name={props.name}
        id={props.name}
        placeholder={props.placeholder}
        required={props.required}
        accept={props.accept}
        className="sm:col-span-9 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}
