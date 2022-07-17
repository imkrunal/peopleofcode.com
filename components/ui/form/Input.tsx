import classNames from "classnames";
import { useField } from "formik";
import { HiExclamationCircle } from "react-icons/hi";

type InputProps = Omit<JSX.IntrinsicElements["input"], "name"> & {
  name: string;
  label?: string;
};

const Input = ({ name, label, placeholder, type }: InputProps) => {
  const [input, { touched, error }] = useField(name);

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          id={name}
          className={classNames(
            "block w-full pr-10 focus:outline-none sm:text-sm rounded-md",
            touched && error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          )}
          placeholder={placeholder}
          aria-invalid={touched && error ? true : false}
          aria-describedby={touched && error ? `${name}-error` : name}
          {...input}
        />
        {touched && error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <HiExclamationCircle
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {touched && error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
