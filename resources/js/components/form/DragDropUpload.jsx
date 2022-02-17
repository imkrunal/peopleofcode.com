import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

const DragDropUpload = ({
  label,
  name,
  accept,
  error,
  defaultValue,
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
      <div className="relative mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300">
        {image || defaultValue ? (
          <>
            <img
              src={image || defaultValue}
              className="relative z-10 rounded-md"
            />
            <button
              className="absolute right-4 bottom-4 z-20 rounded border bg-white p-2 text-gray-900 shadow-sm"
              onClick={() => ref.current.click()}
              type="button"
            >
              Upload
            </button>
            <input
              id={name}
              name={name}
              ref={ref}
              type="file"
              className="hidden"
              accept={accept}
              onChange={setPreview}
            />
          </>
        ) : (
          <div className="space-y-1 p-5 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor={name}
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id={name}
                  name={name}
                  ref={ref}
                  type="file"
                  className="hidden"
                  accept={accept}
                  onChange={setPreview}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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

DragDropUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  accept: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default DragDropUpload
