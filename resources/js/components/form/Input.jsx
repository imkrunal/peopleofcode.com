import PropTypes from 'prop-types'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

const Input = ({
  label,
  name,
  type,
  placeholder,
  addOn,
  value,
  error,
  onChange,
  ...props
}) => {
  return (
    <div {...props}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative mt-1 flex rounded-md shadow-sm">
        {addOn && (
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
            {addOn}
          </span>
        )}
        <input
          type={type || 'text'}
          name={name}
          id={name}
          className={`"block sm:text-sm" w-full pr-10 focus:outline-none ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 text-gray-900 placeholder-gray-300 focus:border-indigo-600 focus:ring-indigo-500'
          } ${addOn ? 'rounded-r-md ' : 'rounded-md '}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.oneOf(['email', 'password', 'text']),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  addOn: PropTypes.any,
  onChange: PropTypes.func.isRequired,
}

export default Input
