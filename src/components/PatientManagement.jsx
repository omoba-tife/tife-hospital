import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Edit,
  Eye,
  FileText,
  Activity,
} from "lucide-react";

import PatientModal from "./PatientModal";

const PatientManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [patients] = useState([
    {
      id: "1",
      name: "Fola okunuga",
      age: 45,
      gender: "Male",
      phone: "+1 234-567-8900",
      email: "Fola.okunuga@email.com",
      address: "123 Main St, City, State 12345",
      emergencyContact: "Jane Okunuga - +1 234-567-8901",
      bloodGroup: "A+",
      allergies: ["Penicillin", "Nuts"],
      medicalHistory: ["Hypertension", "Diabetes Type 2"],
      insurance: {
        provider: "HealthCare Plus",
        policyNumber: "HCP123456789",
        coverage: 80,
        expiryDate: "2024-12-31",
      },
      admissionDate: "2024-01-15",
      status: "Active",
      assignedDoctor: "Dr. Similoluwa",
      assignedWard: "General Ward A",
    },
    {
      id: "2",
      name: "Tolu ",
      age: 32,
      gender: "Female",
      phone: "+1 234-567-8902",
      email: "emily.johnson@email.com",
      address: "456 Oak Ave, City, State 12345",
      emergencyContact: "Robert Johnson - +1 234-567-8903",
      bloodGroup: "O-",
      allergies: ["Latex"],
      medicalHistory: ["Asthma"],
      insurance: {
        provider: "MediCover",
        policyNumber: "MC987654321",
        coverage: 90,
        expiryDate: "2024-11-30",
      },
      status: "Active",
      assignedDoctor: "Dr. Sarah Wilson",
      assignedWard: "Maternity Ward",
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
      medicalHistory: ["Heart Disease", "High Cholesterol"],
      insurance: {
        provider: "Senior Care",
        policyNumber: "SC456789123",
        coverage: 95,
        expiryDate: "2024-10-15",
      },
      admissionDate: "2024-01-20",
      status: "Critical",
      assignedDoctor: "Dr. Michael",
      assignedWard: "ICU",
    },
  ]);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Critical":
        return "bg-red-100 text-red-700";
      case "Discharged":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Patient Management
          </h1>
          <p className="text-gray-600">
            Manage patient records and information
          </p>
        </div>
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

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Patients
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {patients.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Patients
              </p>
              <p className="text-2xl font-bold text-green-600">
                {patients.filter((p) => p.status === "Active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Critical Patients
              </p>
              <p className="text-2xl font-bold text-red-600">
                {patients.filter((p) => p.status === "Critical").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Discharged Today
              </p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Patient Records
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medical Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned Doctor
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {patient.age} years, {patient.gender}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-900">{patient.phone}</p>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-900">
                        Blood: {patient.bloodGroup}
                      </p>
                      <p className="text-sm text-gray-500">
                        {patient.allergies.length > 0
                          ? `Allergies: ${patient.allergies.join(", ")}`
                          : "No known allergies"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm text-gray-900">
                        {patient.assignedDoctor}
                      </p>
                      <p className="text-sm text-gray-500">
                        {patient.assignedWard}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewPatient(patient)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {(user.role === "admin" ||
                        user.role === "doctor" ||
                        user.role === "nurse") && (
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="Edit Patient"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Medical Records"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <PatientModal
          patient={selectedPatient}
          mode={modalMode}
          onClose={() => setIsModalOpen(false)}
          onSave={(patient) => {
            console.log("Saving patient:", patient);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default PatientManagement;
