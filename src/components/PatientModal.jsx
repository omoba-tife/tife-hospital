import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  FileText,
  Shield,
} from "lucide-react";

const PatientModal = ({ patient, mode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    gender: "Male",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "A+",
    allergies: [],
    medicalHistory: [],
    insurance: {
      provider: "",
      policyNumber: "",
      coverage: 0,
      expiryDate: "",
    },
    status: "Active",
  });

  const [newAllergy, setNewAllergy] = useState("");
  const [newMedicalCondition, setNewMedicalCondition] = useState("");

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInsuranceChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      insurance: {
        ...prev.insurance,
        [field]: value,
      },
    }));
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...(prev.allergies || []), newAllergy.trim()],
      }));
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (index) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddMedicalCondition = () => {
    if (newMedicalCondition.trim()) {
      setFormData((prev) => ({
        ...prev,
        medicalHistory: [
          ...(prev.medicalHistory || []),
          newMedicalCondition.trim(),
        ],
      }));
      setNewMedicalCondition("");
    }
  };

  const handleRemoveMedicalCondition = (index) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: prev.medicalHistory?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isReadOnly = mode === "view";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === "add"
                  ? "Add New Patient"
                  : mode === "edit"
                  ? "Edit Patient"
                  : "Patient Details"}
              </h2>
              <p className="text-sm text-gray-600">
                {mode === "add"
                  ? "Enter patient information"
                  : mode === "edit"
                  ? "Update patient information"
                  : "View patient information"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={isReadOnly}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      handleInputChange("age", parseInt(e.target.value))
                    }
                    disabled={isReadOnly}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      handleInputChange("gender", e.target.value)
                    }
                    disabled={isReadOnly}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) =>
                      handleInputChange("bloodGroup", e.target.value)
                    }
                    disabled={isReadOnly}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={isReadOnly}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={isReadOnly}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    disabled={isReadOnly}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    value={formData.emergencyContact}
                    onChange={(e) =>
                      handleInputChange("emergencyContact", e.target.value)
                    }
                    disabled={isReadOnly}
                    placeholder="Name - Phone Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-600" />
                Medical Information
              </h3>

              {/* Allergies */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergies
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.allergies?.map((allergy, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                    >
                      {allergy}
                      {!isReadOnly && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {!isReadOnly && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      placeholder="Add allergy"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleAddAllergy}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* Medical History */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical History
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.medicalHistory?.map((condition, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {condition}
                      {!isReadOnly && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedicalCondition(index)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {!isReadOnly && (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMedicalCondition}
                      onChange={(e) => setNewMedicalCondition(e.target.value)}
                      placeholder="Add medical condition"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleAddMedicalCondition}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Insurance Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-purple-600" />
                Insurance Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    value={formData.insurance?.provider}
                    onChange={(e) =>
                      handleInsuranceChange("provider", e.target.value)
                    }
                    disabled={isReadOnly}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Policy Number
                  </label>
                  <input
                    type="text"
                    value={formData.insurance?.policyNumber}
                    onChange={(e) =>
                      handleInsuranceChange("policyNumber", e.target.value)
                    }
                    disabled={isReadOnly}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coverage (%)
                  </label>
                  <input
                    type="number"
                    value={formData.insurance?.coverage}
                    onChange={(e) =>
                      handleInsuranceChange(
                        "coverage",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={isReadOnly}
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.insurance?.expiryDate}
                    onChange={(e) =>
                      handleInsuranceChange("expiryDate", e.target.value)
                    }
                    disabled={isReadOnly}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-4 px-6 py-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {isReadOnly ? "Close" : "Cancel"}
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {mode === "add" ? "Add Patient" : "Update Patient"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientModal;
