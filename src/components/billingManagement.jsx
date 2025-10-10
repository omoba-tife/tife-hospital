import {
  Plus,
  X,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  CreditCard,
  Calendar,
  User,
  FileText,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Printer,
} from "lucide-react";
import { useState, useMemo } from "react";

const BillingManagement = ({ user }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedBill, setSelectedBill] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filterInsurance, setFilterInsurance] = useState("all");

  // Mock data for bills
  const [bills, setBills] = useState([
    {
      id: "BIL-001",
      patientId: "PAT-001",
      patientName: "John Alexandre",
      patientEmail: "john.alexandre@email.com",
      patientContact: "+1-555-0101",
      serviceDate: "2024-01-25",
      dueDate: "2024-02-25",
      services: [
        {
          description: "Cardiology Consultation",
          quantity: 1,
          unitPrice: 150,
          tax: 0,
        },
        { description: "ECG Test", quantity: 1, unitPrice: 75, tax: 5 },
        { description: "Blood Tests", quantity: 1, unitPrice: 45, tax: 5 },
      ],
      totalAmount: 285.75,
      paidAmount: 150,
      status: "partial",
      insurance: "Blue Cross",
      insuranceCoverage: 80,
      createdAt: "2024-01-25T10:00:00Z",
      lastReminder: "2024-01-28",
    },
    {
      id: "BIL-002",
      patientId: "PAT-002",
      patientName: "Micheal Johnson",
      patientEmail: "micheal.johnson@email.com",
      patientContact: "+1-555-0102",
      serviceDate: "2024-01-26",
      dueDate: "2024-02-26",
      services: [
        {
          description: "Prenatal Checkup",
          quantity: 1,
          unitPrice: 120,
          tax: 0,
        },
        { description: "Ultrasound", quantity: 1, unitPrice: 200, tax: 5 },
      ],
      totalAmount: 330,
      paidAmount: 330,
      status: "paid",
      insurance: "Aetna",
      insuranceCoverage: 90,
      createdAt: "2024-01-26T14:30:00Z",
    },
    {
      id: "BIL-003",
      patientId: "PAT-003",
      patientName: "Robert Alumiasunya",
      patientEmail: "robert.a@email.com",
      patientContact: "+1-555-0103",
      serviceDate: "2024-01-25",
      dueDate: "2024-02-25",
      services: [
        {
          description: "Emergency Consultation",
          quantity: 1,
          unitPrice: 200,
          tax: 0,
        },
        { description: "CT Scan", quantity: 1, unitPrice: 450, tax: 5 },
        { description: "Medications", quantity: 1, unitPrice: 85, tax: 5 },
      ],
      totalAmount: 771.75,
      paidAmount: 0,
      status: "pending",
      insurance: "Medicare",
      insuranceCoverage: 65,
      createdAt: "2024-01-25T16:45:00Z",
      lastReminder: "2024-01-29",
    },
  ]);

  // Statistics calculation
  const billingStats = useMemo(() => {
    const total = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);
    const paid = bills.reduce((sum, bill) => sum + bill.paidAmount, 0);
    const pending = total - paid;

    return {
      totalBills: bills.length,
      totalAmount: total,
      paidAmount: paid,
      pendingAmount: pending,
      paidCount: bills.filter((bill) => bill.status === "paid").length,
      partialCount: bills.filter((bill) => bill.status === "partial").length,
      pendingCount: bills.filter((bill) => bill.status === "pending").length,
    };
  }, [bills]);

  // Filter bills
  const filteredBills = useMemo(() => {
    return bills.filter((bill) => {
      const matchesSearch =
        bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.patientId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || bill.status === filterStatus;
      const matchesDate = !filterDate || bill.serviceDate === filterDate;
      const matchesInsurance =
        filterInsurance === "all" || bill.insurance === filterInsurance;

      return matchesSearch && matchesStatus && matchesDate && matchesInsurance;
    });
  }, [bills, searchTerm, filterStatus, filterDate, filterInsurance]);

  // Status colors and labels
  const getStatusInfo = (status) => {
    switch (status) {
      case "paid":
        return {
          color: "bg-green-100 text-green-700",
          label: "Paid",
          icon: CheckCircle,
        };
      case "partial":
        return {
          color: "bg-yellow-100 text-yellow-700",
          label: "Partial",
          icon: Clock,
        };
      case "pending":
        return {
          color: "bg-red-100 text-red-700",
          label: "Pending",
          icon: AlertCircle,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700",
          label: "Unknown",
          icon: AlertCircle,
        };
    }
  };

  // Calculate service totals
  const calculateServiceTotal = (service) => {
    const subtotal = service.quantity * service.unitPrice;
    const taxAmount = subtotal * (service.tax / 100);
    return subtotal + taxAmount;
  };

  // Handle bill actions
  const handleDeleteBill = (billId) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      setBills(bills.filter((bill) => bill.id !== billId));
    }
  };

  const handleSendReminder = (bill) => {
    alert(`Reminder sent to ${bill.patientName} for bill ${bill.id}`);
  };

  const handlePrintBill = (bill) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Bill ${bill.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .bill-details { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .total { font-weight: bold; font-size: 1.2em; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>HOSPITAL BILL</h1>
            <h2>Bill No: ${bill.id}</h2>
          </div>
          <div class="bill-details">
            <p><strong>Patient:</strong> ${bill.patientName}</p>
            <p><strong>Service Date:</strong> ${bill.serviceDate}</p>
            <p><strong>Due Date:</strong> ${bill.dueDate}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Tax</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${bill.services
                .map(
                  (service) => `
                <tr>
                  <td>${service.description}</td>
                  <td>${service.quantity}</td>
                  <td>$${service.unitPrice.toFixed(2)}</td>
                  <td>${service.tax}%</td>
                  <td>$${calculateServiceTotal(service).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <div class="total">
            <p>Total Amount: $${bill.totalAmount.toFixed(2)}</p>
            <p>Paid Amount: $${bill.paidAmount.toFixed(2)}</p>
            <p>Balance Due: $${(bill.totalAmount - bill.paidAmount).toFixed(
              2
            )}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Bill ID,Patient Name,Service Date,Total Amount,Paid Amount,Status,Insurance\n" +
      bills
        .map(
          (bill) =>
            `${bill.id},${bill.patientName},${bill.serviceDate},${bill.totalAmount},${bill.paidAmount},${bill.status},${bill.insurance}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bills.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleViewDetails = (bill) => {
    setSelectedBill(bill);
    // You can implement a modal for detailed view here
    alert(
      `Viewing details for bill ${bill.id}\nPatient: ${bill.patientName}\nTotal: $${bill.totalAmount}`
    );
  };

  const handleEditBill = (bill) => {
    // You can implement edit functionality here
    alert(`Editing bill ${bill.id}`);
  };

  const handleCreateBill = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBill = {
      id: `BIL-${String(bills.length + 1).padStart(3, "0")}`,
      patientId: formData.get("patientId"),
      patientName: formData.get("patientName"),
      patientEmail: formData.get("patientEmail"),
      patientContact: formData.get("patientContact"),
      serviceDate: formData.get("serviceDate"),
      dueDate: formData.get("dueDate"),
      services: [
        {
          description: formData.get("serviceDescription"),
          quantity: parseInt(formData.get("quantity")),
          unitPrice: parseFloat(formData.get("unitPrice")),
          tax: parseFloat(formData.get("tax")),
        },
      ],
      totalAmount:
        parseFloat(formData.get("unitPrice")) *
        parseInt(formData.get("quantity")) *
        (1 + parseFloat(formData.get("tax")) / 100),
      paidAmount: 0,
      status: "pending",
      insurance: formData.get("insurance"),
      insuranceCoverage: 80,
      createdAt: new Date().toISOString(),
    };

    setBills((prev) => [...prev, newBill]);
    setIsCreateModalOpen(false);
    alert("Bill created successfully!");
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterDate("");
    setFilterInsurance("all");
  };

  // Stat Card Component
  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div
              className={`flex items-center text-xs mt-1 ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp
                className={`w-3 h-3 mr-1 ${trend < 0 ? "rotate-180" : ""}`}
              />
              {Math.abs(trend)}% from last month
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            color.includes("green")
              ? "bg-green-500"
              : color.includes("blue")
              ? "bg-blue-500"
              : color.includes("red")
              ? "bg-red-500"
              : "bg-purple-500"
          }`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // Bill Card Component
  const BillCard = ({ bill }) => {
    const statusInfo = getStatusInfo(bill.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">{bill.patientName}</h3>
            <p className="text-sm text-gray-600">Bill ID: {bill.id}</p>
          </div>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full flex items-center space-x-1 ${statusInfo.color}`}
          >
            <StatusIcon className="w-4 h-4" />
            <span>{statusInfo.label}</span>
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Service Date:</span>
            <span className="font-medium">
              {new Date(bill.serviceDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Due Date:</span>
            <span className="font-medium">
              {new Date(bill.dueDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Insurance:</span>
            <span className="font-medium">
              {bill.insurance} ({bill.insuranceCoverage}%)
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Amount:</span>
            <span className="font-semibold text-lg">
              ${bill.totalAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Paid Amount:</span>
            <span className="font-medium">${bill.paidAmount.toFixed(2)}</span>
          </div>
          {bill.status !== "paid" && (
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600">Balance Due:</span>
              <span className="font-medium text-red-600">
                ${(bill.totalAmount - bill.paidAmount).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewDetails(bill)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            {(user.role === "admin" || user.role === "nurse") && (
              <>
                <button
                  onClick={() => handleEditBill(bill)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  title="Edit Bill"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSendReminder(bill)}
                  className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg"
                  title="Send Reminder"
                >
                  <Send className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handlePrintBill(bill)}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              title="Print Bill"
            >
              <Printer className="w-4 h-4" />
            </button>
            {user.role === "admin" && (
              <button
                onClick={() => handleDeleteBill(bill.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                title="Delete Bill"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Billing Management
          </h1>
          <p className="text-gray-600">
            Manage patient bills, payments, and invoices
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          {(user.role === "admin" || user.role === "nurse") && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Bill</span>
            </button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${billingStats.totalAmount.toFixed(2)}`}
          subtitle="All time"
          icon={DollarSign}
          color="text-green-600"
          trend={12.5}
        />
        <StatCard
          title="Pending Payments"
          value={`$${billingStats.pendingAmount.toFixed(2)}`}
          subtitle="To be collected"
          icon={CreditCard}
          color="text-red-600"
          trend={-3.2}
        />
        <StatCard
          title="Total Bills"
          value={billingStats.totalBills.toString()}
          subtitle="This month"
          icon={FileText}
          color="text-blue-600"
          trend={8.1}
        />
        <StatCard
          title="Paid Bills"
          value={billingStats.paidCount.toString()}
          subtitle={`of ${billingStats.totalBills}`}
          icon={CheckCircle}
          color="text-green-600"
          trend={5.7}
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bills, patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Service Date"
            />
          </div>

          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>

        {/* Extended Filters */}
        {showMoreFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Insurance Provider
              </label>
              <select
                value={filterInsurance}
                onChange={(e) => setFilterInsurance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Insurance</option>
                <option value="Blue Cross">Blue Cross</option>
                <option value="Aetna">Aetna</option>
                <option value="United Healthcare">United Healthcare</option>
                <option value="Medicare">Medicare</option>
                <option value="Self-pay">Self-pay</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bills List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {filteredBills.length} Bills Found
            </h3>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <button
                onClick={() => setViewMode("overview")}
                className={`px-3 py-1 text-sm rounded-lg ${
                  viewMode === "overview"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 text-sm rounded-lg ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                List View
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {filteredBills.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No bills found</p>
              <p className="text-gray-400 mt-2">
                Try adjusting your search criteria
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBills.map((bill) => (
                <BillCard key={bill.id} bill={bill} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Bill Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create New Bill
                </h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleCreateBill} className="space-y-6">
                {/* Patient Information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">
                    Patient Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Patient Name *
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        placeholder="Enter patient name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Patient ID *
                      </label>
                      <input
                        type="text"
                        name="patientId"
                        placeholder="Enter patient ID"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="patientContact"
                        placeholder="Patient contact number"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="patientEmail"
                        placeholder="Patient email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Information */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Service Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Description *
                      </label>
                      <textarea
                        name="serviceDescription"
                        placeholder="Describe the medical service provided..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          defaultValue="1"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unit Price ($)
                        </label>
                        <input
                          type="number"
                          name="unitPrice"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tax (%)
                        </label>
                        <input
                          type="number"
                          name="tax"
                          min="0"
                          max="100"
                          defaultValue="0"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Insurance Provider
                        </label>
                        <select
                          name="insurance"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="Blue Cross">Blue Cross</option>
                          <option value="Aetna">Aetna</option>
                          <option value="United Healthcare">
                            United Healthcare
                          </option>
                          <option value="Medicare">Medicare</option>
                          <option value="Self-pay">Self-pay</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Date
                    </label>
                    <input
                      type="date"
                      name="serviceDate"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Bill
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingManagement;
