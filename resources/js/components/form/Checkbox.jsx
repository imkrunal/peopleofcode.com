import PropTypes from 'prop-types'

const Checkbox = ({ label, name, value, error, onChange }) => {
  return (
    <div className="relative flex items-start">
      <div className="flex h-5 items-center">
        <input
          id={name}
          name={name}
          type="checkbox"
          className={`h-4 w-4 rounded ${
            error
              ? 'border-red-300 text-red-600 focus:ring-red-500'
              : 'border-gray-300 text-indigo-600 focus:ring-indigo-500'
          }`}
          checked={value === 1 || undefined}
          onChange={onChange}
        />
      </div>
      {error}
      <div className="ml-3 text-sm">
        {label && (
          <>
            <label htmlFor={name} className="font-medium text-gray-700">
              {label}
            </label>
            <span className="text-gray-500">
              <span className="sr-only">{label}</span>
            </span>
          </>
        )}
      </div>
    </div>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox
