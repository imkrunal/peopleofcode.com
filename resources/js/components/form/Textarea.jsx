import PropTypes from 'prop-types'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

const Textarea = ({
  label,
  name,
  placeholder,
  value,
  error,
  rows,
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
      <div className="relative mt-1 rounded-md shadow-sm">
        <textarea
          name={name}
          id={name}
          className={`block w-full rounded-md shadow-sm sm:text-sm ${
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
          rows={rows}
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

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

export default Textarea
