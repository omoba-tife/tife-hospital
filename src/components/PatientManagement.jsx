import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Edit,
  Eye,
  FileText,
  Activity,
  Download,
  MoreVertical,
  Calendar,
  Phone,
  Mail,
  MapPin,
  User,
  Shield,
  AlertTriangle,
  ChevronDown,
  X,
  BarChart3,
  Clock,
  Heart,
  Stethoscope,
  Bed,
  Trash2,
  Send,
  Printer,
  MessageCircle,
  Star,
  TrendingUp,
  Users,
  Ambulance,
  Microscope,
  Pill,
  Clipboard,
  Bell,
  CheckCircle,
} from "lucide-react";

// Enhanced Patient Modal Component
const PatientModal = ({ patient, mode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "",
    allergies: [],
    medicalHistory: [],
    currentMedications: [],
    insurance: {
      provider: "",
      policyNumber: "",
      coverage: 80,
      expiryDate: "",
    },
    assignedDoctor: "",
    assignedNurse: "",
    assignedWard: "",
    room: "",
    condition: "Stable",
    notes: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState("");
  const [newMedicalHistory, setNewMedicalHistory] = useState("");

  useEffect(() => {
    if (patient && mode !== "add") {
      setFormData(patient);
    }
  }, [patient, mode]);

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Medical Info", icon: Heart },
    { number: 3, title: "Insurance", icon: Shield },
    { number: 4, title: "Admission", icon: Bed },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()],
      }));
      setNewAllergy("");
    }
  };

  const removeAllergy = (index) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index),
    }));
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setFormData((prev) => ({
        ...prev,
        currentMedications: [...prev.currentMedications, newMedication.trim()],
      }));
      setNewMedication("");
    }
  };

  const removeMedication = (index) => {
    setFormData((prev) => ({
      ...prev,
      currentMedications: prev.currentMedications.filter((_, i) => i !== index),
    }));
  };

  const addMedicalHistory = () => {
    if (newMedicalHistory.trim()) {
      setFormData((prev) => ({
        ...prev,
        medicalHistory: [...prev.medicalHistory, newMedicalHistory.trim()],
      }));
      setNewMedicalHistory("");
    }
  };

  const removeMedicalHistory = (index) => {
    setFormData((prev) => ({
      ...prev,
      medicalHistory: prev.medicalHistory.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const StepIcon = steps[currentStep - 1].icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <StepIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {mode === "add"
                    ? "Add New Patient"
                    : mode === "edit"
                    ? "Edit Patient"
                    : "Patient Details"}
                </h2>
                <p className="text-blue-100">
                  Step {currentStep} of 4: {steps[currentStep - 1].title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-between mt-6 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 -translate-y-1/2 -z-10"></div>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      currentStep >= step.number
                        ? "bg-white text-blue-600 shadow-lg"
                        : "bg-white/30 text-white/70"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 transition-colors ${
                      currentStep >= step.number
                        ? "text-white font-medium"
                        : "text-white/60"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-180px)]"
        >
          <div className="p-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter patient's full name"
                      disabled={mode === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="120"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Age"
                      disabled={mode === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={mode === "view"}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group
                    </label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) =>
                        setFormData({ ...formData, bloodGroup: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={mode === "view"}
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Phone number"
                      disabled={mode === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Email address"
                      disabled={mode === "view"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Full address"
                      disabled={mode === "view"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Name and phone number"
                      disabled={mode === "view"}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Medical Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allergies
                    </label>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newAllergy}
                          onChange={(e) => setNewAllergy(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Add allergy"
                          disabled={mode === "view"}
                        />
                        <button
                          type="button"
                          onClick={addAllergy}
                          className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={mode === "view"}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                          >
                            <span>{allergy}</span>
                            {mode !== "view" && (
                              <button
                                type="button"
                                onClick={() => removeAllergy(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Medications
                    </label>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newMedication}
                          onChange={(e) => setNewMedication(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Add medication"
                          disabled={mode === "view"}
                        />
                        <button
                          type="button"
                          onClick={addMedication}
                          className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={mode === "view"}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.currentMedications.map(
                          (medication, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                            >
                              <span className="text-sm text-blue-700">
                                {medication}
                              </span>
                              {mode !== "view" && (
                                <button
                                  type="button"
                                  onClick={() => removeMedication(index)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical History
                    </label>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newMedicalHistory}
                          onChange={(e) => setNewMedicalHistory(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          placeholder="Add medical condition"
                          disabled={mode === "view"}
                        />
                        <button
                          type="button"
                          onClick={addMedicalHistory}
                          className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={mode === "view"}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.medicalHistory.map((history, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                          >
                            <span className="text-sm text-green-700">
                              {history}
                            </span>
                            {mode !== "view" && (
                              <button
                                type="button"
                                onClick={() => removeMedicalHistory(index)}
                                className="text-green-500 hover:text-green-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Additional medical notes..."
                      disabled={mode === "view"}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Insurance Information */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Insurance Provider
                    </label>
                    <input
                      type="text"
                      value={formData.insurance.provider}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            provider: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Insurance company name"
                      disabled={mode === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Policy Number
                    </label>
                    <input
                      type="text"
                      value={formData.insurance.policyNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            policyNumber: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Policy number"
                      disabled={mode === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Coverage (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.insurance.coverage}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            coverage: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Coverage percentage"
                      disabled={mode === "view"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      value={formData.insurance.expiryDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          insurance: {
                            ...formData.insurance,
                            expiryDate: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={mode === "view"}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Admission Details */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned Doctor *
                    </label>
                    <select
                      required
                      value={formData.assignedDoctor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignedDoctor: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={mode === "view"}
                    >
                      <option value="">Select Doctor</option>
                      <option value="Dr. Similoluwa Adebayo">
                        Dr. Similoluwa Adebayo
                      </option>
                      <option value="Dr. Sarah Wilson">Dr. Sarah Wilson</option>
                      <option value="Dr. Michael Brown">
                        Dr. Michael Brown
                      </option>
                      <option value="Dr. Emily Chen">Dr. Emily Chen</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned Nurse
                    </label>
                    <select
                      value={formData.assignedNurse}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignedNurse: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={mode === "view"}
                    >
                      <option value="">Select Nurse</option>
                      <option value="Nurse Amina Yusuf">
                        Nurse Amina Yusuf
                      </option>
                      <option value="Nurse Grace Chen">Nurse Grace Chen</option>
                      <option value="Nurse James Wilson">
                        Nurse James Wilson
                      </option>
                      <option value="Nurse Lisa Park">Nurse Lisa Park</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ward *
                    </label>
                    <select
                      required
                      value={formData.assignedWard}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assignedWard: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={mode === "view"}
                    >
                      <option value="">Select Ward</option>
                      <option value="General Ward A">General Ward A</option>
                      <option value="General Ward B">General Ward B</option>
                      <option value="ICU">ICU</option>
                      <option value="Maternity Ward">Maternity Ward</option>
                      <option value="Surgery Ward">Surgery Ward</option>
                      <option value="Pediatric Ward">Pediatric Ward</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.room}
                      onChange={(e) =>
                        setFormData({ ...formData, room: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Room number"
                      disabled={mode === "view"}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condition
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) =>
                        setFormData({ ...formData, condition: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      disabled={mode === "view"}
                    >
                      <option value="Stable">Stable</option>
                      <option value="Good">Good</option>
                      <option value="Critical">Critical</option>
                      <option value="Unstable">Unstable</option>
                      <option value="Recovered">Recovered</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                {currentStep > 1 && mode !== "view" && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                  >
                    Previous
                  </button>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                {mode === "view" ? (
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Close
                  </button>
                ) : currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                  >
                    {mode === "add" ? "Add Patient" : "Update Patient"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Enhanced Toast Component
const Toast = ({ message, type = "info", onClose, action }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  }[type];

  const icon = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertTriangle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Bell className="w-5 h-5" />,
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-xl shadow-lg z-50 animate-in slide-in-from-right flex items-center space-x-3 min-w-80`}
    >
      {icon}
      <div className="flex-1">
        <p className="font-medium">{message}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm underline mt-1 opacity-90 hover:opacity-100"
          >
            {action.label}
          </button>
        )}
      </div>
      <button onClick={onClose} className="text-white hover:text-gray-200 ml-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const PatientManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [wardFilter, setWardFilter] = useState("all");
  const [selectedPatientForActions, setSelectedPatientForActions] =
    useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const [patients, setPatients] = useState([
    {
      id: "1",
      name: "Fola Okunuga",
      age: 45,
      gender: "Male",
      phone: "+1 234-567-8900",
      email: "fola.okunuga@email.com",
      address: "123 Main St, City, State 12345",
      emergencyContact: "Jane Okunuga - +1 234-567-8901",
      bloodGroup: "A+",
      allergies: ["Penicillin", "Nuts"],
      medicalHistory: ["Hypertension", "Diabetes Type 2"],
      currentMedications: ["Metformin 500mg", "Lisinopril 10mg"],
      vitalSigns: {
        bloodPressure: "130/85",
        heartRate: "72",
        temperature: "98.6",
        oxygenSaturation: "98%",
      },
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HCP123456789",
        coverage: 80,
        expiryDate: "2024-12-31",
      },
      admissionDate: "2024-01-15",
      dischargeDate: null,
      status: "Active",
      condition: "Stable",
      assignedDoctor: "Dr. Similoluwa Adebayo",
      assignedNurse: "Nurse Amina Yusuf",
      assignedWard: "General Ward A",
      room: "A-101",
      lastVisit: "2024-01-20",
      nextAppointment: "2024-02-15",
      notes: "Patient responding well to treatment. Blood sugar levels stable.",
    },
    {
      id: "2",
      name: "Tolu Johnson",
      age: 32,
      gender: "Female",
      phone: "+1 234-567-8902",
      email: "tolu.johnson@email.com",
      address: "456 Oak Ave, City, State 12345",
      emergencyContact: "Robert Johnson - +1 234-567-8903",
      bloodGroup: "O-",
      allergies: ["Latex"],
      medicalHistory: ["Asthma"],
      currentMedications: ["Albuterol Inhaler"],
      vitalSigns: {
        bloodPressure: "120/80",
        heartRate: "68",
        temperature: "98.4",
        oxygenSaturation: "99%",
      },
      insurance: {
        provider: "MediCover",
        policyNumber: "MC987654321",
        coverage: 90,
        expiryDate: "2024-11-30",
      },
      admissionDate: "2024-01-18",
      dischargeDate: null,
      status: "Active",
      condition: "Good",
      assignedDoctor: "Dr. Sarah Wilson",
      assignedNurse: "Nurse Grace Chen",
      assignedWard: "Maternity Ward",
      room: "M-205",
      lastVisit: "2024-01-22",
      nextAppointment: "2024-02-05",
      notes: "Regular prenatal checkup. All parameters normal.",
    },
    {
      id: "3",
      name: "Robert Davis",
      age: 67,
      gender: "Male",
      phone: "+1 234-567-8904",
      email: "robert.davis@email.com",
      address: "789 Pine St, City, State 12345",
      emergencyContact: "Mary Davis - +1 234-567-8905",
      bloodGroup: "B+",
      allergies: [],
      medicalHistory: ["Heart Disease", "High Cholesterol", "Hypertension"],
      currentMedications: [
        "Atorvastatin 20mg",
        "Aspirin 81mg",
        "Metoprolol 25mg",
      ],
      vitalSigns: {
        bloodPressure: "145/90",
        heartRate: "85",
        temperature: "99.1",
        oxygenSaturation: "95%",
      },
      insurance: {
        provider: "Senior Care",
        policyNumber: "SC456789123",
        coverage: 95,
        expiryDate: "2024-10-15",
      },
      admissionDate: "2024-01-20",
      dischargeDate: null,
      status: "Critical",
      condition: "Unstable",
      assignedDoctor: "Dr. Michael Brown",
      assignedNurse: "Nurse James Wilson",
      assignedWard: "ICU",
      room: "ICU-03",
      lastVisit: "2024-01-23",
      nextAppointment: null,
      notes: "Close monitoring required. Vital signs fluctuating.",
    },
    {
      id: "4",
      name: "Sarah Martinez",
      age: 28,
      gender: "Female",
      phone: "+1 234-567-8906",
      email: "sarah.martinez@email.com",
      address: "321 Elm St, City, State 12345",
      emergencyContact: "Carlos Martinez - +1 234-567-8907",
      bloodGroup: "AB+",
      allergies: ["Shellfish", "Iodine"],
      medicalHistory: ["Appendectomy 2019"],
      currentMedications: ["Multivitamin"],
      vitalSigns: {
        bloodPressure: "110/70",
        heartRate: "65",
        temperature: "98.2",
        oxygenSaturation: "100%",
      },
      insurance: {
        provider: "Wellness First",
        policyNumber: "WF789123456",
        coverage: 85,
        expiryDate: "2024-09-20",
      },
      admissionDate: "2024-01-10",
      dischargeDate: "2024-01-18",
      status: "Discharged",
      condition: "Recovered",
      assignedDoctor: "Dr. Emily Chen",
      assignedNurse: "Nurse Lisa Park",
      assignedWard: "Surgery Ward",
      room: "S-104",
      lastVisit: "2024-01-18",
      nextAppointment: "2024-02-10",
      notes: "Successful recovery post-surgery. Follow-up scheduled.",
    },
  ]);

  const wards = [
    "All",
    "General Ward A",
    "General Ward B",
    "ICU",
    "Maternity Ward",
    "Surgery Ward",
    "Pediatric Ward",
  ];
  const statuses = ["All", "Active", "Critical", "Discharged", "Transferred"];

  const showToast = (message, type = "info", action = null) => {
    setToast({ message, type, action });
  };

  const closeToast = () => {
    setToast(null);
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.room.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || patient.status === statusFilter;
    const matchesWard =
      wardFilter === "all" || patient.assignedWard === wardFilter;

    return matchesSearch && matchesStatus && matchesWard;
  });

  const patientStats = {
    total: patients.length,
    active: patients.filter((p) => p.status === "Active").length,
    critical: patients.filter((p) => p.status === "Critical").length,
    discharged: patients.filter((p) => p.status === "Discharged").length,
    todayAdmissions: patients.filter(
      (p) => p.admissionDate === new Date().toISOString().split("T")[0]
    ).length,
    occupancyRate: Math.round(
      (patients.filter((p) => p.status !== "Discharged").length / 50) * 100
    ),
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleSavePatient = async (patientData) => {
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (modalMode === "add") {
      const newPatient = {
        ...patientData,
        id: String(patients.length + 1),
        admissionDate: new Date().toISOString().split("T")[0],
        status: "Active",
        dischargeDate: null,
        lastVisit: new Date().toISOString().split("T")[0],
        vitalSigns: {
          bloodPressure: "120/80",
          heartRate: "72",
          temperature: "98.6",
          oxygenSaturation: "98%",
        },
      };
      setPatients((prev) => [...prev, newPatient]);
      showToast("Patient added successfully!", "success");
    } else {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === selectedPatient.id ? { ...p, ...patientData } : p
        )
      );
      showToast("Patient updated successfully!", "success");
    }

    setIsModalOpen(false);
    setLoading(false);
  };

  const handleDischargePatient = async (patientId) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === patientId
          ? {
              ...patient,
              status: "Discharged",
              dischargeDate: new Date().toISOString().split("T")[0],
              condition: "Recovered",
            }
          : patient
      )
    );
    setSelectedPatientForActions(null);
    showToast("Patient discharged successfully!", "success");
    setLoading(false);
  };

  const handleTransferPatient = async (patientId, newWard) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === patientId
          ? { ...patient, assignedWard: newWard }
          : patient
      )
    );
    setSelectedPatientForActions(null);
    showToast(`Patient transferred to ${newWard}`, "success");
    setLoading(false);
  };

  const handleDeletePatient = async (patientId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this patient? This action cannot be undone."
      )
    ) {
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setPatients((prev) => prev.filter((patient) => patient.id !== patientId));
    setSelectedPatientForActions(null);
    showToast("Patient deleted successfully!", "success");
    setLoading(false);
  };

  const handleExportAllData = () => {
    const dataStr = JSON.stringify(patients, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "patients_data_export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("All patient data exported successfully!", "success");
  };

  const handleExportPatientData = (patient, format = "json") => {
    let content, filename, mimeType;

    switch (format) {
      case "json":
        content = JSON.stringify(patient, null, 2);
        filename = `patient_${patient.name.replace(/\s+/g, "_")}_data.json`;
        mimeType = "application/json";
        break;
      case "csv":
        const headers = ["Field", "Value"];
        const data = [
          ["Patient ID", patient.id],
          ["Name", patient.name],
          ["Age", patient.age],
          ["Gender", patient.gender],
          ["Phone", patient.phone],
          ["Email", patient.email],
          ["Status", patient.status],
          ["Condition", patient.condition],
          ["Assigned Doctor", patient.assignedDoctor],
          ["Ward", patient.assignedWard],
          ["Room", patient.room],
          ["Blood Group", patient.bloodGroup],
          ["Admission Date", patient.admissionDate],
        ];
        content = [headers, ...data].map((row) => row.join(",")).join("\n");
        filename = `patient_${patient.name.replace(/\s+/g, "_")}_data.csv`;
        mimeType = "text/csv";
        break;
      default:
        return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Patient data exported as ${format.toUpperCase()}`, "success");
  };

  const handleSendReminder = (patient) => {
    showToast(`Appointment reminder sent to ${patient.name}`, "info", {
      label: "View Message",
      onClick: () => console.log("View message details"),
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "Discharged":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Transferred":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case "Stable":
        return "text-green-600";
      case "Good":
        return "text-blue-600";
      case "Unstable":
        return "text-red-600";
      case "Recovered":
        return "text-gray-600";
      default:
        return "text-yellow-600";
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setWardFilter("all");
    setShowFilters(false);
    showToast("All filters cleared", "info");
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
          action={toast.action}
        />
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">Processing...</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Patient Management
          </h1>
          <p className="text-gray-600">
            Manage patient records, admissions, and care
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportAllData}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
          {(user.role === "admin" ||
            user.role === "doctor" ||
            user.role === "nurse") && (
            <button
              onClick={handleAddPatient}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Patient</span>
            </button>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Patients
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {patientStats.total}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {patientStats.active}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">
                {patientStats.critical}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Discharged</p>
              <p className="text-2xl font-bold text-gray-600">
                {patientStats.discharged}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
              <Bed className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Today's Admissions
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {patientStats.todayAdmissions}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Occupancy Rate
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {patientStats.occupancyRate}%
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="all">All Status</option>
            {statuses.slice(1).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={wardFilter}
            onChange={(e) => setWardFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="all">All Wards</option>
            {wards.slice(1).map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admission Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Blood Groups</option>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Patient Records
          </h2>
          <span className="text-sm text-gray-500">
            Showing {filteredPatients.length} of {patients.length} patients
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medical Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Care Team
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {patient.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {patient.age} years • {patient.gender} •{" "}
                          {patient.bloodGroup}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {patient.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">Allergies:</span>{" "}
                        {patient.allergies.length > 0
                          ? patient.allergies.join(", ")
                          : "None"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Medications:</span>{" "}
                        {patient.currentMedications.length} current
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Admitted: {patient.admissionDate}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          patient.status
                        )}`}
                      >
                        {patient.status}
                      </span>
                      <p
                        className={`text-sm font-medium ${getConditionColor(
                          patient.condition
                        )}`}
                      >
                        {patient.condition}
                      </p>
                      {patient.vitalSigns && (
                        <div className="text-xs text-gray-500">
                          BP: {patient.vitalSigns.bloodPressure} • HR:{" "}
                          {patient.vitalSigns.heartRate}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {patient.assignedDoctor}
                      </p>
                      <p className="text-sm text-gray-500">
                        {patient.assignedWard}
                      </p>
                      <p className="text-xs text-gray-400">
                        Room: {patient.room}
                      </p>
                      {patient.nextAppointment && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Next: {patient.nextAppointment}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewPatient(patient)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {(user.role === "admin" ||
                        user.role === "doctor" ||
                        user.role === "nurse") && (
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                          title="Edit Patient"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors"
                        title="Medical Records"
                      >
                        <FileText className="w-4 h-4" />
                      </button>

                      {/* More Actions Dropdown */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setSelectedPatientForActions(
                              selectedPatientForActions === patient.id
                                ? null
                                : patient.id
                            )
                          }
                          className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          title="More Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {selectedPatientForActions === patient.id && (
                          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10 animate-in fade-in">
                            <div className="py-1">
                              <button
                                onClick={() => handleSendReminder(patient)}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                              >
                                <Send className="w-4 h-4" />
                                <span>Send Reminder</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleExportPatientData(patient, "json")
                                }
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 transition-colors"
                              >
                                <Download className="w-4 h-4" />
                                <span>Export Data (JSON)</span>
                              </button>
                              <button
                                onClick={() =>
                                  handleExportPatientData(patient, "csv")
                                }
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 transition-colors"
                              >
                                <Download className="w-4 h-4" />
                                <span>Export Data (CSV)</span>
                              </button>
                              <button
                                onClick={() => handleExportPatientData(patient)}
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                              >
                                <Printer className="w-4 h-4" />
                                <span>Print Summary</span>
                              </button>

                              <div className="border-t border-gray-100 my-1"></div>

                              {patient.status !== "Discharged" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleTransferPatient(
                                        patient.id,
                                        "General Ward B"
                                      )
                                    }
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors"
                                  >
                                    <Stethoscope className="w-4 h-4" />
                                    <span>Transfer Ward</span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDischargePatient(patient.id)
                                    }
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50 transition-colors"
                                  >
                                    <Bed className="w-4 h-4" />
                                    <span>Discharge Patient</span>
                                  </button>
                                </>
                              )}

                              {(user.role === "admin" ||
                                user.role === "doctor") && (
                                <>
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <button
                                    onClick={() =>
                                      handleDeletePatient(patient.id)
                                    }
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete Patient</span>
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No patients found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={handleAddPatient}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Patient
            </button>
          </div>
        )}
      </div>

      {/* Patient Modal */}
      {isModalOpen && (
        <PatientModal
          patient={selectedPatient}
          mode={modalMode}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePatient}
        />
      )}
    </div>
  );
};

export default PatientManagement;
