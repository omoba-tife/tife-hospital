import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  FlaskConical,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
} from "lucide-react";

const LabManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [labTests] = useState([
    {
      id: "L001",
      patientId: "1",
      patientName: "John Alexander",
      testType: "Complete Blood Count",
      category: "Hematology",
      status: "Completed",
      orderedBy: "Dr. Michael Johnson",
      orderedDate: "2024-01-20",
      completedDate: "2024-01-21",
      technician: "Lisa ",
      cost: 85,
      results: [
        {
          parameter: "Hemoglobin",
          value: "14.5",
          referenceRange: "12.0-16.0",
          unit: "g/dL",
          status: "Normal",
        },
        {
          parameter: "White Blood Cells",
          value: "7.2",
          referenceRange: "4.0-10.0",
          unit: "K/uL",
          status: "Normal",
        },
        {
          parameter: "Platelets",
          value: "250",
          referenceRange: "150-400",
          unit: "K/uL",
          status: "Normal",
        },
      ],
    },
    {
      id: "L002",
      patientId: "2",
      patientName: "Pearl Akinsanya",
      testType: "Prenatal Panel",
      category: "Obstetrics",
      status: "In Progress",
      orderedBy: "Dr. Sarah Akinsanya",
      orderedDate: "2024-01-23",
      technician: "Noble",
      cost: 150,
      results: [],
    },
    {
      id: "L003",
      patientId: "3",
      patientName: "Robert Alumiasunya",
      testType: "Cardiac Enzymes",
      category: "Cardiology",
      status: "Completed",
      orderedBy: "Dr. Michael Johnson",
      orderedDate: "2024-01-19",
      completedDate: "2024-01-20",
      technician: "Lisa",
      cost: 120,
      results: [
        {
          parameter: "Troponin I",
          value: "0.8",
          referenceRange: "0.0-0.4",
          unit: "ng/mL",
          status: "High",
        },
        {
          parameter: "CK-MB",
          value: "12",
          referenceRange: "0-6",
          unit: "ng/mL",
          status: "High",
        },
        {
          parameter: "LDH",
          value: "450",
          referenceRange: "140-280",
          unit: "U/L",
          status: "High",
        },
      ],
    },
    {
      id: "L004",
      patientId: "1",
      patientName: "John Alexander",
      testType: "Lipid Panel",
      category: "Chemistry",
      status: "Pending",
      orderedBy: "Dr. Michael Johnson",
      orderedDate: "2024-01-24",
      cost: 95,
      results: [],
    },
  ]);

  const filteredTests = labTests.filter((test) => {
    const matchesSearch =
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || test.status.toLowerCase() === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getResultStatusColor = (status) => {
    switch (status) {
      case "Normal":
        return "text-green-600";
      case "High":
        return "text-red-600";
      case "Low":
        return "text-yellow-600";
      case "Critical":
        return "text-red-700 font-bold";
      default:
        return "text-gray-600";
    }
  };

  const labStats = {
    totalTests: labTests.length,
    pending: labTests.filter((t) => t.status === "Pending").length,
    inProgress: labTests.filter((t) => t.status === "In Progress").length,
    completed: labTests.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Laboratory Management
          </h1>
          <p className="text-gray-600">Manage lab tests and results</p>
        </div>
        {(user.role === "admin" ||
          user.role === "doctor" ||
          user.role === "lab_tech") && (
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Order Test</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">
                {labStats.totalTests}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {labStats.pending}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">
                {labStats.inProgress}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {labStats.completed}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient name, test type, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {test.testType}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      test.status
                    )}`}
                  >
                    {test.status}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    {test.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Patient:</p>
                    <p className="font-medium text-gray-900">
                      {test.patientName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Test ID:</p>
                    <p className="font-medium text-blue-600">{test.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ordered By:</p>
                    <p className="font-medium text-gray-900">
                      {test.orderedBy}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Cost:</p>
                    <p className="font-medium text-gray-900">${test.cost}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
                  <div>
                    <p className="text-gray-500">Ordered Date:</p>
                    <p className="font-medium text-gray-900">
                      {test.orderedDate}
                    </p>
                  </div>
                  {test.completedDate && (
                    <div>
                      <p className="text-gray-500">Completed Date:</p>
                      <p className="font-medium text-gray-900">
                        {test.completedDate}
                      </p>
                    </div>
                  )}
                  {test.technician && (
                    <div>
                      <p className="text-gray-500">Technician:</p>
                      <p className="font-medium text-gray-900">
                        {test.technician}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {test.status === "Completed" && (
                  <button
                    className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50"
                    title="Download Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
                {test.status === "Pending" &&
                  (user.role === "lab_tech" || user.role === "admin") && (
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Start Test
                    </button>
                  )}
                {test.status === "In Progress" &&
                  (user.role === "lab_tech" || user.role === "admin") && (
                    <button className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Complete
                    </button>
                  )}
              </div>
            </div> 
            {test.results && test.results.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Test Results:
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 font-medium text-gray-700">
                          Parameter
                        </th>
                        <th className="text-left py-2 font-medium text-gray-700">
                          Value
                        </th>
                        <th className="text-left py-2 font-medium text-gray-700">
                          Reference Range
                        </th>
                        <th className="text-left py-2 font-medium text-gray-700">
                          Unit
                        </th>
                        <th className="text-left py-2 font-medium text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {test.results.map((result, index) => (
                        <tr key={index} className="border-b border-gray-50">
                          <td className="py-2 font-medium text-gray-900">
                            {result.parameter}
                          </td>
                          <td className="py-2 text-gray-900">{result.value}</td>
                          <td className="py-2 text-gray-600">
                            {result.referenceRange}
                          </td>
                          <td className="py-2 text-gray-600">{result.unit}</td>
                          <td className="py-2">
                            <span
                              className={`font-medium ${getResultStatusColor(
                                result.status
                              )}`}
                            >
                              {result.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>   
                
                {test.results.some(
                  (r) => r.status === "Critical" || r.status === "High"
                ) && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      <p className="text-sm font-medium text-red-800">
                        Abnormal results detected. Please review immediately.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTests.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <FlaskConical className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            No lab tests found for the selected criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default LabManagement;
