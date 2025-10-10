import React, { useState } from "react";
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
} from "lucide-react";

import PatientModal from "./PatientModal";

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

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.assignedDoctor.toLowerCase().includes(searchTerm.toLowerCase());

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
    ), // Assuming 50 bed capacity
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

  const handleDischargePatient = (patientId) => {
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
    alert("Patient discharged successfully!");
  };

  const handleTransferPatient = (patientId, newWard) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === patientId
          ? { ...patient, assignedWard: newWard }
          : patient
      )
    );
    setSelectedPatientForActions(null);
    alert(`Patient transferred to ${newWard}`);
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

  const exportPatientData = (patient, format = "json") => {
    let content, filename, mimeType;

    switch (format) {
      case "json":
        content = JSON.stringify(patient, null, 2);
        filename = `patient_${patient.id}_data.json`;
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
        ];
        content = [headers, ...data].map((row) => row.join(",")).join("\n");
        filename = `patient_${patient.id}_data.csv`;
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
  };

  return (
    <div className="space-y-6">
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
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export</span>
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
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
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
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
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
                <tr key={patient.id} className="hover:bg-gray-50">
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
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {(user.role === "admin" ||
                        user.role === "doctor" ||
                        user.role === "nurse") && (
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50"
                          title="Edit Patient"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50"
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
                          className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50"
                          title="More Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {selectedPatientForActions === patient.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={() =>
                                  exportPatientData(patient, "json")
                                }
                                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                <Download className="w-4 h-4" />
                                <span>Export Data</span>
                              </button>
                              {patient.status !== "Discharged" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleDischargePatient(patient.id)
                                    }
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                                  >
                                    <Bed className="w-4 h-4" />
                                    <span>Discharge</span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleTransferPatient(
                                        patient.id,
                                        "General Ward B"
                                      )
                                    }
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                                  >
                                    <Stethoscope className="w-4 h-4" />
                                    <span>Transfer Ward</span>
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
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
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
          onSave={(patientData) => {
            if (modalMode === "add") {
              // Add new patient
              const newPatient = {
                ...patientData,
                id: String(patients.length + 1),
                admissionDate: new Date().toISOString().split("T")[0],
                status: "Active",
                condition: "Stable",
              };
              setPatients((prev) => [...prev, newPatient]);
            } else {
              // Update existing patient
              setPatients((prev) =>
                prev.map((p) =>
                  p.id === selectedPatient.id ? { ...p, ...patientData } : p
                )
              );
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default PatientManagement;
