import React from 'react'

// function Steps(title, fields, updateFormData) {
    const Steps = ({ title, fields, updateFormData }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {fields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-2 font-medium">{field.label}</label>
          <input
            type={field.type || 'text'}
            value={field.value}
            onChange={(e) => updateFormData(field.key, e.target.value)}
            // className="w-full p-2 border border-gray-300 rounded"
            className={`w-full p-2 border ${field.error ? 'border-red-500' : 'border-gray-300'} rounded`}
            required
          />
           {field.error && <p className="text-red-500 text-sm">{field.error}</p>}
        </div>
      ))}
    </div>
  )
}

export default Steps