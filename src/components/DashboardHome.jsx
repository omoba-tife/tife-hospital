import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Activity,
  Heart,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Pill,
  Stethoscope,
  Bed,
  Download,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  MessageCircle,
  Settings,
  Search,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Filter,
  MoreVertical,
  Star,
  Zap,
  Target,
  BarChart3,
  Shield,
  Clipboard,
  Ambulance,
  Microscope,
} from "lucide-react";

// Enhanced Mock data service
const DataService = {
  getPatients: () => [
    {
      id: 1,
      name: "John Christ",
      age: 45,
      gender: "Male",
      condition: "Stable",
      room: "301",
      doctor: "Dr. Michael Adamson",
      admissionDate: "2024-01-15",
      lastVisit: "2024-01-20",
      bloodGroup: "A+",
      allergies: ["Penicillin", "Shellfish"],
      avatar: "JC",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 32,
      gender: "Female",
      condition: "Good",
      room: "205",
      doctor: "Dr. Sarah Wilson",
      admissionDate: "2024-01-18",
      lastVisit: "2024-01-22",
      bloodGroup: "O-",
      allergies: ["Latex"],
      avatar: "SJ",
    },
    {
      id: 3,
      name: "Robert Davis",
      age: 67,
      gender: "Male",
      condition: "Critical",
      room: "ICU-03",
      doctor: "Dr. James Odion",
      admissionDate: "2024-01-20",
      lastVisit: "2024-01-23",
      bloodGroup: "B+",
      allergies: ["Aspirin", "Peanuts"],
      avatar: "RD",
    },
  ],

  getAppointments: () => [
    {
      id: 1,
      patientName: "John Christ",
      doctor: "Dr. Michael Adamson",
      time: "2:00 PM",
      date: "2024-01-24",
      type: "Consultation",
      status: "confirmed",
      duration: "30 min",
      department: "Cardiology",
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      doctor: "Dr. Sarah Wilson",
      time: "3:30 PM",
      date: "2024-01-24",
      type: "Follow-up",
      status: "confirmed",
      duration: "45 min",
      department: "Pediatrics",
    },
    {
      id: 3,
      patientName: "Robert Davis",
      doctor: "Dr. James Odion",
      time: "4:15 PM",
      date: "2024-01-24",
      type: "Emergency",
      status: "pending",
      duration: "60 min",
      department: "ICU",
    },
  ],

  getNotifications: () => [
    {
      id: 1,
      type: "appointment",
      title: "New Appointment Scheduled",
      message: "Dr. Smith scheduled a new appointment with John Christ",
      time: "5 min ago",
      read: false,
      priority: "medium",
      action: "view_appointment",
    },
    {
      id: 2,
      type: "alert",
      title: "Critical Patient Alert",
      message: "Patient in Room 204 needs immediate attention",
      time: "10 min ago",
      read: false,
      priority: "high",
      action: "view_patient",
    },
    {
      id: 3,
      type: "system",
      title: "System Update Available",
      message: "New features available in patient management system",
      time: "1 hour ago",
      read: true,
      priority: "low",
      action: "view_updates",
    },
    {
      id: 4,
      type: "lab",
      title: "Lab Results Ready",
      message: "Blood test results for Sarah Johnson are available",
      time: "2 hours ago",
      read: false,
      priority: "medium",
      action: "view_lab_results",
    },
  ],

  getDoctors: () => [
    {
      id: 1,
      name: "Dr. Michael Adamson",
      specialty: "Cardiology",
      available: true,
    },
    {
      id: 2,
      name: "Dr. Sarah Wilson",
      specialty: "Pediatrics",
      available: true,
    },
    {
      id: 3,
      name: "Dr. James Odion",
      specialty: "Neurology",
      available: false,
    },
    {
      id: 4,
      name: "Dr. Emily Chen",
      specialty: "Orthopedics",
      available: true,
    },
  ],
};

// Enhanced Toast component
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

// Enhanced Modal component
const Modal = ({ isOpen, onClose, title, children, size = "md", actions }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div
        className={`bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden animate-in zoom-in`}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
        {actions && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end space-x-3">{actions}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Add Patient Form
const AddPatientForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "",
    allergies: "",
    medicalHistory: "",
    insuranceProvider: "",
    policyNumber: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Medical Info" },
    { number: 3, title: "Insurance Info" },
  ];

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {/* Step Indicator */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 -z-10"></div>
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.number
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`text-xs mt-2 ${
                currentStep >= step.number
                  ? "text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h4>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <select
                required
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Phone number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Email address"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Full address"
              />
            </div>
          </div>
        )}

        {/* Step 2: Medical Information */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Medical Information
              </h4>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) =>
                  setFormData({ ...formData, bloodGroup: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact
              </label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyContact: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Emergency contact"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allergies
              </label>
              <textarea
                value={formData.allergies}
                onChange={(e) =>
                  setFormData({ ...formData, allergies: e.target.value })
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="List any allergies (separated by commas)"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical History
              </label>
              <textarea
                value={formData.medicalHistory}
                onChange={(e) =>
                  setFormData({ ...formData, medicalHistory: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Previous medical conditions, surgeries, etc."
              />
            </div>
          </div>
        )}

        {/* Step 3: Insurance Information */}
        {currentStep === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Insurance Information
              </h4>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Provider
              </label>
              <input
                type="text"
                value={formData.insuranceProvider}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    insuranceProvider: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Insurance company name"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Number
              </label>
              <input
                type="text"
                value={formData.policyNumber}
                onChange={(e) =>
                  setFormData({ ...formData, policyNumber: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Insurance policy number"
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between space-x-3 pt-6 mt-6 border-t border-gray-200">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Previous
            </button>
          )}
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Add Patient
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

// Enhanced Schedule Appointment Form
const ScheduleAppointmentForm = ({ onSave, onClose, patients, doctors }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    type: "consultation",
    notes: "",
    urgency: "routine",
    department: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    // Simulate fetching available slots
    if (formData.doctorId && formData.date) {
      const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  }, [formData.doctorId, formData.date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const selectedPatient = patients.find(
    (p) => p.id === parseInt(formData.patientId)
  );
  const selectedDoctor = doctors.find(
    (d) => d.id === parseInt(formData.doctorId)
  );

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Appointment Details
          </h4>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient *
            </label>
            <select
              required
              value={formData.patientId}
              onChange={(e) =>
                setFormData({ ...formData, patientId: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (Room: {patient.room})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor *
            </label>
            <select
              required
              value={formData.doctorId}
              onChange={(e) =>
                setFormData({ ...formData, doctorId: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}{" "}
                  {!doctor.available && "(Unavailable)"}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time *
              </label>
              <select
                required
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={!availableSlots.length}
              >
                <option value="">Select Time</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Type *
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="consultation">Consultation</option>
              <option value="follow-up">Follow-up</option>
              <option value="surgery">Surgery</option>
              <option value="checkup">Regular Checkup</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urgency Level
            </label>
            <select
              value={formData.urgency}
              onChange={(e) =>
                setFormData({ ...formData, urgency: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Additional Information
          </h4>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Any additional notes, symptoms, or special requirements..."
            />
          </div>

          {/* Preview Section */}
          {(selectedPatient || selectedDoctor) && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h5 className="font-medium text-gray-900">Appointment Preview</h5>
              {selectedPatient && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedPatient.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Room {selectedPatient.room}
                    </p>
                  </div>
                </div>
              )}
              {selectedDoctor && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedDoctor.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedDoctor.specialty}
                    </p>
                  </div>
                </div>
              )}
              {formData.date && formData.time && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(formData.date).toLocaleDateString()} at{" "}
                      {formData.time}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {formData.type}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Schedule Appointment
        </button>
      </div>
    </form>
  );
};

// Enhanced Billing Form
const BillingForm = ({ onSave, onClose, patients }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    services: [],
    insuranceCoverage: 0,
    paymentMethod: "cash",
    notes: "",
  });

  const [servicesList, setServicesList] = useState([
    { id: 1, name: "Consultation", price: 100, selected: false },
    { id: 2, name: "Blood Test", price: 50, selected: false },
    { id: 3, name: "X-Ray", price: 150, selected: false },
    { id: 4, name: "MRI Scan", price: 500, selected: false },
    { id: 5, name: "Surgery", price: 2000, selected: false },
  ]);

  const toggleService = (serviceId) => {
    setServicesList((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, selected: !service.selected }
          : service
      )
    );
  };

  const calculateTotal = () => {
    return servicesList
      .filter((service) => service.selected)
      .reduce((total, service) => total + service.price, 0);
  };

  const calculateFinalAmount = () => {
    const total = calculateTotal();
    const insurance = (total * formData.insuranceCoverage) / 100;
    return total - insurance;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedServices = servicesList.filter((service) => service.selected);
    onSave({
      ...formData,
      services: selectedServices,
      totalAmount: calculateTotal(),
      finalAmount: calculateFinalAmount(),
    });
  };

  const totalAmount = calculateTotal();
  const finalAmount = calculateFinalAmount();

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Billing Information
          </h4>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient *
            </label>
            <select
              required
              value={formData.patientId}
              onChange={(e) =>
                setFormData({ ...formData, patientId: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} (Room: {patient.room})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Coverage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.insuranceCoverage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  insuranceCoverage: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              value={formData.paymentMethod}
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="cash">Cash</option>
              <option value="card">Credit Card</option>
              <option value="insurance">Insurance</option>
              <option value="online">Online Payment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Additional billing notes..."
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Services & Charges
          </h4>

          <div className="space-y-2">
            {servicesList.map((service) => (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  service.selected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 border rounded ${
                      service.selected
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  ></div>
                  <span className="text-sm font-medium text-gray-900">
                    {service.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  ${service.price}
                </span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Insurance Coverage ({formData.insuranceCoverage}%):
              </span>
              <span className="font-medium text-green-600">
                -$
                {((totalAmount * formData.insuranceCoverage) / 100).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
              <span className="text-gray-900">Total Amount:</span>
              <span className="text-blue-600">${finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Generate Bill
        </button>
      </div>
    </form>
  );
};

// Enhanced Reports Dashboard
const ReportsDashboard = ({ onClose, patients, appointments }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  const reports = [
    {
      id: "patient-stats",
      title: "Patient Statistics",
      description: "Admission, discharge, and demographic reports",
      icon: Users,
      color: "blue",
    },
    {
      id: "financial",
      title: "Financial Reports",
      description: "Revenue, billing, and insurance claims",
      icon: CreditCard,
      color: "green",
    },
    {
      id: "medical",
      title: "Medical Reports",
      description: "Lab results, treatments, and outcomes",
      icon: Clipboard,
      color: "purple",
    },
    {
      id: "appointment",
      title: "Appointment Analytics",
      description: "Scheduling efficiency and doctor utilization",
      icon: Calendar,
      color: "orange",
    },
  ];

  const generateReport = (reportId) => {
    setSelectedReport(reportId);
    // Simulate report generation
    setTimeout(() => {
      // In real app, this would generate actual report data
      console.log(`Generated ${reportId} report for`, dateRange);
    }, 1000);
  };

  const downloadReport = () => {
    // Simulate download
    console.log(`Downloading ${selectedReport} report`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, start: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, end: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => generateReport(report.id)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 bg-${report.color}-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 text-${report.color}-600`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {report.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {report.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>

      {selectedReport && (
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-900">
              {reports.find((r) => r.id === selectedReport)?.title} Report
            </h4>
            <button
              onClick={downloadReport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600">
              Report for {dateRange.start} to {dateRange.end} is being
              generated...
            </p>
            {/* In real app, show actual report data here */}
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced Quick Actions Component
const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: "add-patient",
      label: "Add Patient",
      icon: Users,
      color: "blue",
      description: "Register new patient",
    },
    {
      id: "schedule-appointment",
      label: "Schedule",
      icon: Calendar,
      color: "green",
      description: "Book appointment",
    },
    {
      id: "create-bill",
      label: "Create Bill",
      icon: CreditCard,
      color: "purple",
      description: "Generate invoice",
    },
    {
      id: "view-reports",
      label: "View Reports",
      icon: BarChart3,
      color: "orange",
      description: "Analytics & insights",
    },
    {
      id: "lab-orders",
      label: "Lab Orders",
      icon: Microscope,
      color: "red",
      description: "Request tests",
    },
    {
      id: "prescriptions",
      label: "Prescriptions",
      icon: Pill,
      color: "pink",
      description: "Manage medications",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div
              className={`w-10 h-10 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
            >
              <Icon className={`w-5 h-5 text-${action.color}-600`} />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">
              {action.label}
            </h4>
            <p className="text-xs text-gray-500">{action.description}</p>
          </button>
        );
      })}
    </div>
  );
};

// Enhanced Patient Card Component
const PatientCard = ({ patient, onViewDetails }) => {
  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case "critical":
        return "red";
      case "serious":
        return "orange";
      case "stable":
        return "green";
      case "good":
        return "blue";
      default:
        return "gray";
    }
  };

  const color = getConditionColor(patient.condition);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="font-semibold text-blue-600 text-sm">
              {patient.avatar}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{patient.name}</h4>
            <p className="text-sm text-gray-500">
              {patient.age} years • {patient.gender}
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-1 bg-${color}-100 text-${color}-700 rounded-full text-xs font-medium capitalize`}
        >
          {patient.condition}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Room:</span>
          <span className="font-medium">{patient.room}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Doctor:</span>
          <span className="font-medium text-blue-600">{patient.doctor}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Admitted:</span>
          <span className="font-medium">
            {new Date(patient.admissionDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {patient.allergies && patient.allergies.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Allergies:</p>
          <div className="flex flex-wrap gap-1">
            {patient.allergies.map((allergy, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => onViewDetails(patient)}
        className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
      >
        View Details
      </button>
    </div>
  );
};

// Enhanced Appointment Card Component
const AppointmentCard = ({ appointment, onEdit, onCancel }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "pending":
        return "yellow";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  const color = getStatusColor(appointment.status);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">
            {appointment.patientName}
          </h4>
          <p className="text-sm text-gray-600">{appointment.doctor}</p>
        </div>
        <span
          className={`px-2 py-1 bg-${color}-100 text-${color}-700 rounded-full text-xs font-medium capitalize`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Time:</span>
          <span className="font-medium">{appointment.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Date:</span>
          <span className="font-medium">
            {new Date(appointment.date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Type:</span>
          <span className="font-medium capitalize">{appointment.type}</span>
        </div>
        {appointment.duration && (
          <div className="flex justify-between">
            <span className="text-gray-500">Duration:</span>
            <span className="font-medium">{appointment.duration}</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(appointment)}
          className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onCancel(appointment)}
          className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DashboardHome = ({ user }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Initialize data
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Load initial data
    setPatients(DataService.getPatients());
    setAppointments(DataService.getAppointments());
    setDoctors(DataService.getDoctors());
    const initialNotifications = DataService.getNotifications();
    setNotifications(initialNotifications);
    setUnreadNotifications(initialNotifications.filter((n) => !n.read).length);

    return () => clearInterval(timer);
  }, []);

  const showToast = (message, type = "info", action = null) => {
    setToast({ message, type, action });
  };

  const closeToast = () => {
    setToast(null);
  };

  const getStats = () => {
    const criticalPatients = patients.filter(
      (p) => p.condition.toLowerCase() === "critical"
    ).length;
    const todayAppointments = appointments.filter(
      (a) => a.date === new Date().toISOString().split("T")[0]
    );

    return [
      {
        label: "Total Patients",
        value: patients.length.toString(),
        change: "+12%",
        changeType: "increase",
        icon: Users,
        color: "bg-blue-500",
        description: "Active patients in system",
        view: "patients",
      },
      {
        label: "Today's Appointments",
        value: todayAppointments.length.toString(),
        change: "+8%",
        changeType: "increase",
        icon: Calendar,
        color: "bg-green-500",
        description: "Scheduled for today",
        view: "appointments",
      },
      {
        label: "Critical Cases",
        value: criticalPatients.toString(),
        change: "+2%",
        changeType: criticalPatients > 0 ? "increase" : "decrease",
        icon: AlertTriangle,
        color: "bg-red-500",
        description: "Requiring immediate attention",
        view: "critical",
      },
      {
        label: "Available Beds",
        value: "24",
        change: "-5%",
        changeType: "decrease",
        icon: Bed,
        color: "bg-purple-500",
        description: "Out of 120 total beds",
        view: "beds",
      },
    ];
  };

  // Enhanced Action Handlers
  const handleAddPatient = async (patientData) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newPatient = {
      id: patients.length + 1,
      ...patientData,
      condition: "Stable",
      room: `30${patients.length + 1}`,
      doctor: "Dr. Michael Adamson",
      admissionDate: new Date().toISOString().split("T")[0],
      lastVisit: new Date().toISOString().split("T")[0],
      avatar: patientData.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      allergies: patientData.allergies
        ? patientData.allergies.split(",").map((a) => a.trim())
        : [],
    };

    setPatients((prev) => [...prev, newPatient]);
    setActiveModal(null);
    setLoading(false);
    showToast("Patient added successfully!", "success", {
      label: "View Patient",
      onClick: () => setSelectedPatient(newPatient),
    });
  };

  const handleScheduleAppointment = async (appointmentData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const patient = patients.find(
      (p) => p.id === parseInt(appointmentData.patientId)
    );
    const doctor = doctors.find(
      (d) => d.id === parseInt(appointmentData.doctorId)
    );

    const newAppointment = {
      id: appointments.length + 1,
      patientName: patient?.name || "Unknown Patient",
      doctor: doctor?.name || "Unknown Doctor",
      time: appointmentData.time,
      date: appointmentData.date,
      type: appointmentData.type,
      status: "confirmed",
      duration: "30 min",
      department: doctor?.specialty || "General",
    };

    setAppointments((prev) => [...prev, newAppointment]);
    setActiveModal(null);
    setLoading(false);
    showToast("Appointment scheduled successfully!", "success");
  };

  const handleCreateBill = async (billData) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setActiveModal(null);
    setLoading(false);
    showToast(
      `Bill generated for $${billData.finalAmount.toFixed(2)}!`,
      "success"
    );
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "add-patient":
        setActiveModal("addPatient");
        break;
      case "schedule-appointment":
        setActiveModal("scheduleAppointment");
        break;
      case "create-bill":
        setActiveModal("createBill");
        break;
      case "view-reports":
        setActiveModal("reports");
        break;
      case "lab-orders":
        showToast("Lab orders module opening...", "info");
        break;
      case "prescriptions":
        showToast("Prescriptions management opening...", "info");
        break;
      default:
        showToast("Action not implemented yet", "warning");
    }
  };

  const handleNotificationClick = (notification) => {
    const updatedNotifications = notifications.map((n) =>
      n.id === notification.id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    setUnreadNotifications((prev) => Math.max(0, prev - 1));
    setShowNotifications(false);

    // Handle notification actions
    switch (notification.action) {
      case "view_appointment":
        setActiveModal("scheduleAppointment");
        break;
      case "view_patient":
        showToast("Opening patient details...", "info");
        break;
      case "view_lab_results":
        showToast("Showing lab results...", "info");
        break;
      default:
        showToast(notification.message, "info");
    }
  };

  const handleStatClick = (stat) => {
    showToast(`Viewing ${stat.label} details`, "info");
    // You can implement navigation to detailed views here
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = getStats();

  const recentActivities = [
    {
      type: "appointment",
      message: "New appointment scheduled for John Christ with Dr. Adamson",
      time: "5 min ago",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      type: "patient",
      message: "Patient Sarah Johnson discharged successfully",
      time: "15 min ago",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      type: "billing",
      message: "Payment received from Michael Brown - $2,500",
      time: "23 min ago",
      icon: CreditCard,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      type: "lab",
      message: "Lab results ready for Robert Davis",
      time: "1 hour ago",
      icon: Microscope,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

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

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white flex-1 w-full">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {user.name}!
              </h2>
              <p className="opacity-90 mb-2">
                {user.role === "admin" &&
                  "Here's what's happening at the hospital today."}
                {user.role === "doctor" &&
                  "You have 12 appointments scheduled for today."}
                {user.role === "nurse" &&
                  "You have 23 patients under your care today."}
              </p>
              <p className="text-sm opacity-75">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
                >
                  <Bell className="w-6 h-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900">
                        Notifications
                      </h4>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span
                              className={`text-sm font-medium ${
                                notification.read
                                  ? "text-gray-700"
                                  : "text-blue-700"
                              }`}
                            >
                              {notification.title}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients, appointments, doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button
              onClick={() => setActiveModal("addPatient")}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add New</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const ChangeIcon =
            stat.changeType === "increase" ? ArrowUpRight : ArrowDownRight;

          return (
            <button
              key={index}
              onClick={() => handleStatClick(stat)}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 text-left w-full group"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
                    stat.changeType === "increase"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <ChangeIcon className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>

              <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {stat.label}
              </p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </button>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <QuickActions onAction={handleQuickAction} />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Recent Patients */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Patients
              </h3>
              <span className="text-sm text-gray-500">
                {filteredPatients.length} patients
              </span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPatients.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    onViewDetails={setSelectedPatient}
                  />
                ))}
              </div>
              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No patients found</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activities
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all cursor-pointer group"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bgColor} flex-shrink-0 mt-1`}
                      >
                        <Icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="text-sm text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Today's Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Today's Appointments
              </h3>
              <span className="text-sm text-blue-600 font-medium">
                {appointments.length} total
              </span>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onEdit={() => showToast("Edit appointment feature", "info")}
                    onCancel={() =>
                      showToast("Cancel appointment feature", "info")
                    }
                  />
                ))}
                {appointments.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No appointments today</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                System Status
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Server Status
                    </span>
                  </div>
                  <span className="text-sm text-gray-900">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Database
                    </span>
                  </div>
                  <span className="text-sm text-gray-900">Healthy</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Last Backup
                    </span>
                  </div>
                  <span className="text-sm text-gray-900">2 hours ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Response Time
                    </span>
                  </div>
                  <span className="text-sm text-gray-900">128ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === "addPatient"}
        onClose={() => setActiveModal(null)}
        title="Add New Patient"
        size="lg"
      >
        <AddPatientForm
          onSave={handleAddPatient}
          onClose={() => setActiveModal(null)}
        />
      </Modal>

      <Modal
        isOpen={activeModal === "scheduleAppointment"}
        onClose={() => setActiveModal(null)}
        title="Schedule Appointment"
        size="lg"
      >
        <ScheduleAppointmentForm
          onSave={handleScheduleAppointment}
          onClose={() => setActiveModal(null)}
          patients={patients}
          doctors={doctors}
        />
      </Modal>

      <Modal
        isOpen={activeModal === "createBill"}
        onClose={() => setActiveModal(null)}
        title="Create Bill"
        size="lg"
      >
        <BillingForm
          onSave={handleCreateBill}
          onClose={() => setActiveModal(null)}
          patients={patients}
        />
      </Modal>

      <Modal
        isOpen={activeModal === "reports"}
        onClose={() => setActiveModal(null)}
        title="Reports Dashboard"
        size="xl"
      >
        <ReportsDashboard
          onClose={() => setActiveModal(null)}
          patients={patients}
          appointments={appointments}
        />
      </Modal>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <Modal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          title="Patient Details"
          size="lg"
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold text-blue-600">
                  {selectedPatient.avatar}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  {selectedPatient.name}
                </h4>
                <p className="text-gray-600">
                  {selectedPatient.age} years • {selectedPatient.gender} •{" "}
                  {selectedPatient.bloodGroup}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900">
                  Contact Information
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Room:</span>
                    <span className="font-medium">{selectedPatient.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Doctor:</span>
                    <span className="font-medium text-blue-600">
                      {selectedPatient.doctor}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Admission Date:</span>
                    <span className="font-medium">
                      {new Date(
                        selectedPatient.admissionDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900">
                  Medical Information
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Condition:</span>
                    <span
                      className={`font-medium capitalize ${
                        selectedPatient.condition.toLowerCase() === "critical"
                          ? "text-red-600"
                          : selectedPatient.condition.toLowerCase() ===
                            "serious"
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {selectedPatient.condition}
                    </span>
                  </div>
                  {selectedPatient.allergies &&
                    selectedPatient.allergies.length > 0 && (
                      <div>
                        <span className="text-gray-500">Allergies:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs"
                            >
                              {allergy}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Edit Profile
              </button>
              <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                View Medical History
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DashboardHome;
