import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

const ImageUpload = ({
  label,
  name,
  value,
  defaultValue,
  error,
  previewClasses,
  onChange,
  ...props
}) => {
  const [image, setImage] = useState(null)
  const ref = useRef()
  const setPreview = (e) => {
    const file = e.target.files[0]
    setImage(URL.createObjectURL(file))
    onChange(e)
  }

  return (
    <div {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-2 flex items-center">
        <span className={previewClasses}>
          {image || defaultValue ? (
            <img src={image || defaultValue} className="h-full w-full" />
          ) : (
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </span>
        <input
          type="file"
          className="hidden"
          ref={ref}
          onChange={setPreview}
          id={name}
          name={name}
          accept="image/*"
        />

        <button
          onClick={() => ref.current.click()}
          type="button"
          className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Upload
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

ImageUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  previewClasses: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default ImageUpload
