import classNames from "classnames";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
};

const Checkbox = ({ name, label }: CheckboxProps) => {
  const [input, { touched, error }] = useField(name);

  return (
    <div>
      <div className="flex items-center">
        <input
          id={name}
          type="checkbox"
          className={classNames(
            "h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          )}
          {...input}
        />
        {label && (
          <label htmlFor={name} className="ml-2 block text-sm text-gray-900">
            {label}
          </label>
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

export default Checkbox;
