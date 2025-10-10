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
  X,
  Edit,
  BarChart3,
  Calendar,
  User,
  ChevronDown,
  FileText,
  Send,
  FileDown,
} from "lucide-react";

const LabManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [downloadMenu, setDownloadMenu] = useState(null);

  const [labTests, setLabTests] = useState([
    {
      id: "L001",
      patientId: "1",
      patientName: "John Alexander",
      patientAge: 45,
      patientGender: "Male",
      testType: "Complete Blood Count",
      category: "Hematology",
      status: "Completed",
      orderedBy: "Dr. Michael Johnson",
      orderedDate: "2024-01-20",
      completedDate: "2024-01-21",
      technician: "Lisa Chen",
      cost: 85,
      priority: "Routine",
      specimenType: "Blood",
      collectionDate: "2024-01-20",
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
      notes: "Results within normal limits",
      interpretation: "No significant abnormalities detected",
      criticalValues: false,
    },
    {
      id: "L002",
      patientId: "2",
      patientName: "Pearl Akinsanya",
      patientAge: 28,
      patientGender: "Female",
      testType: "Prenatal Panel",
      category: "Obstetrics",
      status: "In Progress",
      orderedBy: "Dr. Sarah Akinsanya",
      orderedDate: "2024-01-23",
      technician: "Noble James",
      cost: 150,
      priority: "Routine",
      specimenType: "Blood",
      collectionDate: "2024-01-23",
      results: [],
      notes: "Sample processing in biochemistry department",
    },
    {
      id: "L003",
      patientId: "3",
      patientName: "Robert Alumiasunya",
      patientAge: 62,
      patientGender: "Male",
      testType: "Cardiac Enzymes",
      category: "Cardiology",
      status: "Completed",
      orderedBy: "Dr. Michael Johnson",
      orderedDate: "2024-01-19",
      completedDate: "2024-01-20",
      technician: "Lisa Chen",
      cost: 120,
      priority: "Urgent",
      specimenType: "Blood",
      collectionDate: "2024-01-19",
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
      notes: "Elevated cardiac enzymes suggestive of myocardial injury",
      interpretation: "Consistent with acute coronary syndrome",
      criticalValues: true,
    },
    {
      id: "L004",
      patientId: "1",
      patientName: "John Alexander",
      patientAge: 45,
      patientGender: "Male",
      testType: "Lipid Panel",
      category: "Chemistry",
      status: "Pending",
      orderedBy: "Dr. Michael Johnson",
      orderedDate: "2024-01-24",
      cost: 95,
      priority: "Routine",
      specimenType: "Blood",
      collectionDate: "2024-01-24",
      results: [],
    },
  ]);

  const categories = [
    "All",
    "Hematology",
    "Biochemistry",
    "Microbiology",
    "Immunology",
    "Pathology",
    "Other",
  ];
  const statuses = ["All", "Pending", "In Progress", "Completed", "Cancelled"];
  const priorities = ["Routine", "Urgent", "STAT"];

  const filteredTests = labTests.filter((test) => {
    const matchesSearch =
      test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || test.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || test.category === filterCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return { color: "bg-green-100 text-green-700", icon: CheckCircle };
      case "In Progress":
        return { color: "bg-blue-100 text-blue-700", icon: Clock };
      case "Pending":
        return { color: "bg-yellow-100 text-yellow-700", icon: Clock };
      case "Cancelled":
        return { color: "bg-red-100 text-red-700", icon: X };
      default:
        return { color: "bg-gray-100 text-gray-700", icon: Clock };
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-100 text-red-700";
      case "STAT":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const labStats = {
    totalTests: labTests.length,
    pending: labTests.filter((t) => t.status === "Pending").length,
    inProgress: labTests.filter((t) => t.status === "In Progress").length,
    completed: labTests.filter((t) => t.status === "Completed").length,
    revenue: labTests
      .filter((t) => t.status === "Completed")
      .reduce((sum, t) => sum + t.cost, 0),
  };

  const handleViewTest = (test) => {
    setSelectedTest(test);
    setShowTestModal(true);
  };

  const handleStartTest = (testId) => {
    setLabTests((prev) =>
      prev.map((test) =>
        test.id === testId ? { ...test, status: "In Progress" } : test
      )
    );
    alert(`Test ${testId} started!`);
  };

  const handleCompleteTest = (testId) => {
    setLabTests((prev) =>
      prev.map((test) =>
        test.id === testId
          ? {
              ...test,
              status: "Completed",
              completedDate: new Date().toISOString().split("T")[0],
            }
          : test
      )
    );
    alert(`Test ${testId} completed!`);
  };

  const handleOrderTest = () => {
    setShowOrderModal(true);
  };

  const handleExportReport = (test, format) => {
    switch (format) {
      case "txt":
        exportAsTXT(test);
        break;
      case "pdf":
        exportAsPDF(test);
        break;
      case "csv":
        exportAsCSV(test);
        break;
      case "json":
        exportAsJSON(test);
        break;
      default:
        exportAsTXT(test);
    }
    setDownloadMenu(null);
  };

  const exportAsTXT = (test) => {
    const reportContent = `
LABORATORY TEST REPORT
=====================

Test ID: ${test.id}
Patient: ${test.patientName}
Age: ${test.patientAge} years
Gender: ${test.patientGender}
Test Type: ${test.testType}
Category: ${test.category}
Ordered By: ${test.orderedBy}
Order Date: ${test.orderedDate}
Completed Date: ${test.completedDate || "N/A"}
Priority: ${test.priority}
Specimen Type: ${test.specimenType}
Collection Date: ${test.collectionDate}
Technician: ${test.technician || "N/A"}
Cost: $${test.cost}

RESULTS:
${
  test.results && test.results.length > 0
    ? test.results
        .map(
          (r) =>
            `${r.parameter}: ${r.value} ${r.unit} (Reference: ${r.referenceRange}) - ${r.status}`
        )
        .join("\n")
    : "No results available"
}

Interpretation: ${test.interpretation || "N/A"}
Notes: ${test.notes || "N/A"}
Critical Values: ${test.criticalValues ? "YES" : "No"}

Report Generated: ${new Date().toLocaleString()}
    `;

    downloadFile(reportContent, `Lab_Report_${test.id}.txt`, "text/plain");
  };

  const exportAsPDF = (test) => {
    // In a real application, you would use a PDF generation library like jsPDF
    // This is a simplified version that creates a styled HTML content
    const pdfContent = `
      <html>
        <head>
          <title>Lab Report - ${test.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .section { margin-bottom: 15px; }
            .section-title { font-weight: bold; background: #f0f0f0; padding: 5px; }
            table { width: 100%; border-collapse: collapse; margin: 10px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .critical { color: red; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>LABORATORY TEST REPORT</h1>
            <h2>${test.testType}</h2>
          </div>
          
          <div class="section">
            <div class="section-title">Patient Information</div>
            <p><strong>Name:</strong> ${test.patientName}</p>
            <p><strong>Age/Gender:</strong> ${test.patientAge} years, ${
      test.patientGender
    }</p>
            <p><strong>Patient ID:</strong> ${test.patientId}</p>
          </div>

          <div class="section">
            <div class="section-title">Test Information</div>
            <p><strong>Test ID:</strong> ${test.id}</p>
            <p><strong>Category:</strong> ${test.category}</p>
            <p><strong>Status:</strong> ${test.status}</p>
            <p><strong>Ordered By:</strong> ${test.orderedBy}</p>
            <p><strong>Order Date:</strong> ${test.orderedDate}</p>
            <p><strong>Completed Date:</strong> ${
              test.completedDate || "N/A"
            }</p>
          </div>

          ${
            test.results && test.results.length > 0
              ? `
          <div class="section">
            <div class="section-title">Test Results</div>
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Reference Range</th>
                  <th>Unit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${test.results
                  .map(
                    (result) => `
                  <tr>
                    <td>${result.parameter}</td>
                    <td>${result.value}</td>
                    <td>${result.referenceRange}</td>
                    <td>${result.unit}</td>
                    <td class="${
                      result.status === "High" || result.status === "Critical"
                        ? "critical"
                        : ""
                    }">
                      ${result.status}
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          `
              : ""
          }

          ${
            test.interpretation
              ? `
          <div class="section">
            <div class="section-title">Interpretation</div>
            <p>${test.interpretation}</p>
          </div>
          `
              : ""
          }

          ${
            test.notes
              ? `
          <div class="section">
            <div class="section-title">Notes</div>
            <p>${test.notes}</p>
          </div>
          `
              : ""
          }

          ${
            test.criticalValues
              ? `
          <div class="section">
            <div class="section-title critical">CRITICAL VALUES ALERT</div>
            <p class="critical">Critical values detected. Immediate physician review required.</p>
          </div>
          `
              : ""
          }

          <div class="section">
            <p><em>Report generated on: ${new Date().toLocaleString()}</em></p>
          </div>
        </body>
      </html>
    `;

    // For PDF, we'll create a printable HTML page
    const printWindow = window.open("", "_blank");
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    printWindow.print();
  };

  const exportAsCSV = (test) => {
    const headers = [
      "Test ID",
      "Patient Name",
      "Age",
      "Gender",
      "Test Type",
      "Category",
      "Status",
      "Ordered By",
      "Order Date",
      "Completed Date",
      "Priority",
      "Specimen Type",
      "Collection Date",
      "Technician",
      "Cost",
    ].join(",");

    const mainData = [
      test.id,
      `"${test.patientName}"`,
      test.patientAge,
      test.patientGender,
      `"${test.testType}"`,
      test.category,
      test.status,
      `"${test.orderedBy}"`,
      test.orderedDate,
      test.completedDate || "N/A",
      test.priority,
      test.specimenType,
      test.collectionDate,
      test.technician || "N/A",
      test.cost,
    ].join(",");

    let csvContent = headers + "\n" + mainData + "\n\n";

    if (test.results && test.results.length > 0) {
      const resultHeaders = [
        "Parameter",
        "Value",
        "Reference Range",
        "Unit",
        "Status",
      ].join(",");
      const resultsData = test.results
        .map((result) =>
          [
            `"${result.parameter}"`,
            result.value,
            `"${result.referenceRange}"`,
            result.unit,
            result.status,
          ].join(",")
        )
        .join("\n");

      csvContent += "RESULTS\n" + resultHeaders + "\n" + resultsData + "\n\n";
    }

    csvContent += `Interpretation,"${test.interpretation || "N/A"}"\n`;
    csvContent += `Notes,"${test.notes || "N/A"}"\n`;
    csvContent += `Critical Values,${test.criticalValues ? "YES" : "No"}\n`;
    csvContent += `Report Generated,${new Date().toLocaleString()}`;

    downloadFile(csvContent, `Lab_Report_${test.id}.csv`, "text/csv");
  };

  const exportAsJSON = (test) => {
    const reportData = {
      reportId: test.id,
      generated: new Date().toISOString(),
      patient: {
        name: test.patientName,
        age: test.patientAge,
        gender: test.patientGender,
        patientId: test.patientId,
      },
      test: {
        type: test.testType,
        category: test.category,
        status: test.status,
        orderedBy: test.orderedBy,
        orderedDate: test.orderedDate,
        completedDate: test.completedDate,
        priority: test.priority,
        specimenType: test.specimenType,
        collectionDate: test.collectionDate,
        technician: test.technician,
        cost: test.cost,
      },
      results: test.results,
      interpretation: test.interpretation,
      notes: test.notes,
      criticalValues: test.criticalValues,
    };

    const jsonContent = JSON.stringify(reportData, null, 2);
    downloadFile(jsonContent, `Lab_Report_${test.id}.json`, "application/json");
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleDownloadMenu = (testId) => {
    setDownloadMenu(downloadMenu === testId ? null : testId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Laboratory Management
          </h1>
          <p className="text-gray-600">
            Manage lab tests, results, and reports
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export All</span>
          </button>
          {(user.role === "admin" ||
            user.role === "doctor" ||
            user.role === "lab_tech") && (
            <button
              onClick={handleOrderTest}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Order Test</span>
            </button>
          )}
        </div>
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
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                ${labStats.revenue}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="relative">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            {statuses.slice(1).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
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
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="date"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Priorities</option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50">
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredTests.map((test) => {
          const statusInfo = getStatusColor(test.status);
          const StatusIcon = statusInfo.icon;

          return (
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
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {test.status}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                      {test.category}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        test.priority
                      )}`}
                    >
                      {test.priority}
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
                    onClick={() => handleViewTest(test)}
                    className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Download Dropdown */}
                  {test.status === "Completed" && (
                    <div className="relative">
                      <button
                        onClick={() => toggleDownloadMenu(test.id)}
                        className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50"
                        title="Download Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      {downloadMenu === test.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleExportReport(test, "pdf")}
                              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FileText className="w-4 h-4" />
                              <span>Download as PDF</span>
                            </button>
                            <button
                              onClick={() => handleExportReport(test, "txt")}
                              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FileText className="w-4 h-4" />
                              <span>Download as TXT</span>
                            </button>
                            <button
                              onClick={() => handleExportReport(test, "csv")}
                              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FileDown className="w-4 h-4" />
                              <span>Download as CSV</span>
                            </button>
                            <button
                              onClick={() => handleExportReport(test, "json")}
                              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <FileDown className="w-4 h-4" />
                              <span>Download as JSON</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {test.status === "Pending" &&
                    (user.role === "lab_tech" || user.role === "admin") && (
                      <button
                        onClick={() => handleStartTest(test.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Start Test
                      </button>
                    )}
                  {test.status === "In Progress" &&
                    (user.role === "lab_tech" || user.role === "admin") && (
                      <button
                        onClick={() => handleCompleteTest(test.id)}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
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
                            <td className="py-2 text-gray-900">
                              {result.value}
                            </td>
                            <td className="py-2 text-gray-600">
                              {result.referenceRange}
                            </td>
                            <td className="py-2 text-gray-600">
                              {result.unit}
                            </td>
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

                  {test.interpretation && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-medium text-blue-900 mb-1">
                        Interpretation:
                      </h5>
                      <p className="text-sm text-blue-800">
                        {test.interpretation}
                      </p>
                    </div>
                  )}

                  {test.criticalValues && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <p className="text-sm font-medium text-red-800">
                          Critical values detected. Immediate physician review
                          required.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredTests.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FlaskConical className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No lab tests found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or filters
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Clear Filters
          </button>
        </div>
      )}

      {/* Test Details Modal */}
      {showTestModal && selectedTest && (
        <TestDetailsModal
          test={selectedTest}
          onClose={() => setShowTestModal(false)}
          onExport={(format) => handleExportReport(selectedTest, format)}
        />
      )}

      {/* Order Test Modal */}
      {showOrderModal && (
        <OrderTestModal onClose={() => setShowOrderModal(false)} />
      )}
    </div>
  );
};

// Test Details Modal Component
const TestDetailsModal = ({ test, onClose, onExport }) => {
  const statusInfo = getStatusColor(test.status);
  const StatusIcon = statusInfo.icon;
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Test Details
              </h2>
              <p className="text-sm text-gray-600">Test ID: {test.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient and Test Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Patient Information
              </h3>
              <p>
                <strong>Name:</strong> {test.patientName}
              </p>
              <p>
                <strong>Age/Gender:</strong> {test.patientAge} years,{" "}
                {test.patientGender}
              </p>
              <p>
                <strong>Patient ID:</strong> {test.patientId}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                Test Information
              </h3>
              <p>
                <strong>Test Type:</strong> {test.testType}
              </p>
              <p>
                <strong>Category:</strong> {test.category}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`inline-flex items-center ml-2 px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}
                >
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {test.status}
                </span>
              </p>
            </div>
          </div>

          {/* Ordering Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">
                Ordering Information
              </h3>
              <p>
                <strong>Ordered By:</strong> {test.orderedBy}
              </p>
              <p>
                <strong>Order Date:</strong> {test.orderedDate}
              </p>
              <p>
                <strong>Priority:</strong>
                <span
                  className={`inline-flex ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                    test.priority
                  )}`}
                >
                  {test.priority}
                </span>
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">
                Specimen Information
              </h3>
              <p>
                <strong>Specimen Type:</strong> {test.specimenType}
              </p>
              <p>
                <strong>Collection Date:</strong> {test.collectionDate}
              </p>
              {test.technician && (
                <p>
                  <strong>Technician:</strong> {test.technician}
                </p>
              )}
            </div>
          </div>

          {/* Results */}
          {test.results && test.results.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Test Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Parameter
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Value
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Reference Range
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Unit
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {test.results.map((result, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {result.parameter}
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          {result.value}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {result.referenceRange}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {result.unit}
                        </td>
                        <td className="py-3 px-4">
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

              {test.interpretation && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-1">
                    Interpretation:
                  </h5>
                  <p className="text-sm text-blue-800">{test.interpretation}</p>
                </div>
              )}

              {test.notes && (
                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-1">Notes:</h5>
                  <p className="text-sm text-gray-700">{test.notes}</p>
                </div>
              )}

              {test.criticalValues && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    <p className="text-sm font-medium text-red-800">
                      Critical values detected. Immediate physician review
                      required.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {(!test.results || test.results.length === 0) && (
            <div className="text-center py-8">
              <FlaskConical className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No results available yet</p>
              <p className="text-sm text-gray-400 mt-1">
                {test.status === "Pending"
                  ? "Test is pending processing"
                  : test.status === "In Progress"
                  ? "Test is currently being processed"
                  : "Results will be available once completed"}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="text-sm text-gray-600">
            Last updated: {test.completedDate || test.orderedDate}
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            {test.status === "Completed" && (
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onExport("pdf");
                          setShowExportMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Export as PDF</span>
                      </button>
                      <button
                        onClick={() => {
                          onExport("txt");
                          setShowExportMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Export as TXT</span>
                      </button>
                      <button
                        onClick={() => {
                          onExport("csv");
                          setShowExportMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Export as CSV</span>
                      </button>
                      <button
                        onClick={() => {
                          onExport("json");
                          setShowExportMenu(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Export as JSON</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Test Modal Component
const OrderTestModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    patientAge: "",
    patientGender: "",
    testType: "",
    category: "",
    priority: "Routine",
    specimenType: "Blood",
    notes: "",
    cost: "",
  });

  const categories = [
    "Hematology",
    "Biochemistry",
    "Microbiology",
    "Immunology",
    "Pathology",
    "Other",
  ];
  const priorities = ["Routine", "Urgent", "STAT"];
  const specimenTypes = ["Blood", "Urine", "Tissue", "Saliva", "CSF", "Other"];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a new test ID
    const newTestId = `L${String(Math.floor(Math.random() * 1000)).padStart(
      3,
      "0"
    )}`;

    const newTest = {
      id: newTestId,
      patientId: formData.patientId,
      patientName: formData.patientName,
      patientAge: parseInt(formData.patientAge),
      patientGender: formData.patientGender,
      testType: formData.testType,
      category: formData.category,
      status: "Pending",
      orderedBy: "Current User", // This would come from actual user context
      orderedDate: new Date().toISOString().split("T")[0],
      cost: parseInt(formData.cost) || 0,
      priority: formData.priority,
      specimenType: formData.specimenType,
      collectionDate: new Date().toISOString().split("T")[0],
      results: [],
      notes: formData.notes,
    };

    // In a real app, you would make an API call here
    console.log("New test order:", newTest);
    alert(`Test ${newTestId} ordered successfully!`);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order New Test
              </h2>
              <p className="text-sm text-gray-600">
                Create a new laboratory test order
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient ID *
                </label>
                <input
                  type="text"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name *
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>
                <input
                  type="number"
                  name="patientAge"
                  value={formData.patientAge}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="patientGender"
                  value={formData.patientGender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Test Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Test Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Type *
                </label>
                <input
                  type="text"
                  name="testType"
                  value={formData.testType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority *
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost ($)
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Specimen Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Specimen Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specimen Type *
                </label>
                <select
                  name="specimenType"
                  value={formData.specimenType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {specimenTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Date *
                </label>
                <input
                  type="date"
                  name="collectionDate"
                  value={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any special instructions or notes..."
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Order Test</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper functions that need to be defined outside the components
const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return { color: "bg-green-100 text-green-700", icon: CheckCircle };
    case "In Progress":
      return { color: "bg-blue-100 text-blue-700", icon: Clock };
    case "Pending":
      return { color: "bg-yellow-100 text-yellow-700", icon: Clock };
    case "Cancelled":
      return { color: "bg-red-100 text-red-700", icon: X };
    default:
      return { color: "bg-gray-100 text-gray-700", icon: Clock };
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

const getPriorityColor = (priority) => {
  switch (priority) {
    case "Urgent":
      return "bg-red-100 text-red-700";
    case "STAT":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default LabManagement;
