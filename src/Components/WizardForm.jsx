import React, { useState } from 'react'
import Steps from './Steps';

function WizardForm() {
    const [formData, setFormData]= useState({
        name:'',
        email:'',
        password:'',
        address:'',
        phone:'',
    });
    const [currentStep, setCurrentStep]=useState(1);
    const [errors, setErrors] = useState({});

    const updateFormData = (key, value) => {
      setFormData(prevData => ({
        ...prevData,
        [key]: value,
      }));
      setErrors(prevErrors => ({ ...prevErrors, [key]: '' }));
    };

    const validateStep = () => {
      const newErrors = {};
  
      if (currentStep === 1) {
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
      }
  
      if (currentStep === 2) {
        if (!formData.password) newErrors.password = 'Password is required';
      }
  
      if (currentStep === 3) {
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Return true if no errors
    };

  const nextStep = () => {
    if (validateStep()){
    setCurrentStep(prev => Math.min(prev + 1, 3)); // Adjust max step here
    }
  };

  // Navigate to the previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()){
    alert('Form submitted:', formData);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Multi-Step Form</h2>
    <form onSubmit={handleSubmit} >
      {currentStep === 1 && (
        <Steps
          title="Step 1: Personal Info"
          fields={[
            { label: 'Name', key: 'name', value: formData.name, error: errors.name },
            { label: 'Email', key: 'email', value: formData.email, error: errors.email},
          ]}
          updateFormData={updateFormData}
        />
      )}
      {currentStep === 2 && (
        <Steps
          title="Step 2: Account Info"
          fields={[
            { label: 'Password', key: 'password', value: formData.password, type: 'password', error: errors.password},
          ]}
          updateFormData={updateFormData}
        />
      )}
      {currentStep === 3 && (
        <Steps
          title="Step 3: Contact Info"
          fields={[
            { label: 'Address', key: 'address', value: formData.address },
            { label: 'Phone', key: 'phone', value: formData.phone },
          ]}
          updateFormData={updateFormData}
        />
      )}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          
        >
          Previous
        </button>

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  </div>
);
};

export default WizardForm