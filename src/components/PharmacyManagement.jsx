import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Pill,
  Edit,
  Eye,
  CheckCircle,
  AlertTriangle,
  TrendingDown,
  Package,
  X,
  Download,
  Upload,
  Calendar,
  ChevronDown,
  Trash2,
  Save,
  Clock,
  BarChart3,
} from "lucide-react";

const PharmacyManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("medications");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [medications, setMedications] = useState([
    {
      id: "1",
      name: "Aspirin",
      genericName: "Acetylsalicylic Acid",
      dosage: "100mg",
      form: "Tablet",
      manufacturer: "PharmaCorp",
      stock: 500,
      unitPrice: 2.5,
      expiryDate: "2025-12-31",
      category: "Pain Relief",
      minStockLevel: 100,
      supplier: "MedSupply Inc.",
      supplierContact: "supply@medsupply.com",
      reorderLevel: 150,
      batchNumber: "BATCH-001",
      storageConditions: "Room Temperature",
      sideEffects: ["Stomach irritation", "Bleeding risk"],
      contraindications: ["Peptic ulcer", "Bleeding disorders"],
      status: "Active",
    },
    {
      id: "2",
      name: "Metformin",
      genericName: "Metformin HCl",
      dosage: "500mg",
      form: "Tablet",
      manufacturer: "DiabetesCare",
      stock: 25,
      unitPrice: 8.75,
      expiryDate: "2024-08-15",
      category: "Diabetes",
      minStockLevel: 50,
      supplier: "HealthDistrib Ltd.",
      supplierContact: "orders@healthdistrib.com",
      reorderLevel: 75,
      batchNumber: "BATCH-002",
      storageConditions: "Room Temperature",
      sideEffects: ["Nausea", "Diarrhea"],
      contraindications: ["Renal impairment"],
      status: "Active",
    },
    {
      id: "3",
      name: "Lisinopril",
      genericName: "Lisinopril",
      dosage: "10mg",
      form: "Tablet",
      manufacturer: "CardioMeds",
      stock: 180,
      unitPrice: 12.3,
      expiryDate: "2024-11-20",
      category: "Cardiovascular",
      minStockLevel: 75,
      supplier: "MedSupply Inc.",
      supplierContact: "supply@medsupply.com",
      reorderLevel: 100,
      batchNumber: "BATCH-003",
      storageConditions: "Room Temperature",
      sideEffects: ["Cough", "Dizziness"],
      contraindications: ["Pregnancy", "Angioedema"],
      status: "Active",
    },
    {
      id: "4",
      name: "Amoxicillin",
      genericName: "Amoxicillin Trihydrate",
      dosage: "500mg",
      form: "Capsule",
      manufacturer: "AntibioTech",
      stock: 0,
      unitPrice: 15.2,
      expiryDate: "2024-06-30",
      category: "Antibiotic",
      minStockLevel: 100,
      supplier: "PharmaDistrib",
      supplierContact: "orders@pharmadistrib.com",
      reorderLevel: 150,
      batchNumber: "BATCH-004",
      storageConditions: "Room Temperature",
      sideEffects: ["Diarrhea", "Rash"],
      contraindications: ["Penicillin allergy"],
      status: "Inactive",
    },
  ]);

  const [prescriptions, setPrescriptions] = useState([
    {
      id: "P001",
      patientId: "1",
      patientName: "John Smith",
      patientAge: 45,
      patientGender: "Male",
      doctorId: "2",
      doctorName: "Dr. Michael Chen",
      medications: [
        {
          medicationId: "1",
          name: "Aspirin",
          dosage: "100mg",
          frequency: "Once daily",
          duration: "30 days",
          quantity: 30,
          instructions: "Take with food",
          unitPrice: 2.5,
          totalPrice: 75,
        },
      ],
      date: "2024-01-23",
      status: "Pending",
      notes: "For cardiac health maintenance",
      totalAmount: 75,
      insuranceCoverage: 80,
      patientPayable: 15,
    },
    {
      id: "P002",
      patientId: "2",
      patientName: "Emily Johnson",
      patientAge: 28,
      patientGender: "Female",
      doctorId: "3",
      doctorName: "Dr. Sarah Wilson",
      medications: [
        {
          medicationId: "4",
          name: "Prenatal Vitamins",
          dosage: "1 tablet",
          frequency: "Once daily",
          duration: "90 days",
          quantity: 90,
          instructions: "Take with morning meal",
          unitPrice: 12.5,
          totalPrice: 1125,
        },
      ],
      date: "2024-01-22",
      status: "Dispensed",
      notes: "Prenatal care supplement",
      totalAmount: 1125,
      insuranceCoverage: 90,
      patientPayable: 112.5,
      dispensedBy: "Pharmacist James",
      dispensedDate: "2024-01-22",
    },
    {
      id: "P003",
      patientId: "3",
      patientName: "Robert Davis",
      patientAge: 62,
      patientGender: "Male",
      doctorId: "2",
      doctorName: "Dr. Michael Chen",
      medications: [
        {
          medicationId: "2",
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          duration: "30 days",
          quantity: 60,
          instructions: "Take with meals",
          unitPrice: 8.75,
          totalPrice: 525,
        },
        {
          medicationId: "3",
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "30 days",
          quantity: 30,
          instructions: "Take in the morning",
          unitPrice: 12.3,
          totalPrice: 369,
        },
      ],
      date: "2024-01-24",
      status: "Partial",
      notes: "Diabetes and hypertension management",
      totalAmount: 894,
      insuranceCoverage: 85,
      patientPayable: 134.1,
    },
  ]);

  const categories = [
    "All",
    "Pain Relief",
    "Diabetes",
    "Cardiovascular",
    "Antibiotic",
    "Vitamins",
    "Other",
  ];
  const prescriptionStatuses = [
    "All",
    "Pending",
    "Dispensed",
    "Partial",
    "Cancelled",
  ];

  const getStockStatus = (medication) => {
    if (medication.stock === 0) {
      return {
        status: "Out of Stock",
        color: "bg-red-100 text-red-700",
        icon: AlertTriangle,
      };
    } else if (medication.stock <= medication.minStockLevel) {
      return {
        status: "Low Stock",
        color: "bg-yellow-100 text-yellow-700",
        icon: TrendingDown,
      };
    } else {
      return {
        status: "In Stock",
        color: "bg-green-100 text-green-700",
        icon: CheckCircle,
      };
    }
  };

  const getPrescriptionStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return { color: "bg-yellow-100 text-yellow-700", icon: Clock };
      case "Dispensed":
        return { color: "bg-green-100 text-green-700", icon: CheckCircle };
      case "Partial":
        return { color: "bg-blue-100 text-blue-700", icon: Package };
      case "Cancelled":
        return { color: "bg-red-100 text-red-700", icon: X };
      default:
        return { color: "bg-gray-100 text-gray-700", icon: Clock };
    }
  };

  const filteredMedications = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || med.category === filterCategory;
    const matchesStatus = filterStatus === "all" || med.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredPrescriptions = prescriptions.filter((pres) => {
    const matchesSearch =
      pres.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pres.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pres.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || pres.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const medicationStats = {
    totalMedications: medications.length,
    lowStock: medications.filter(
      (m) => m.stock <= m.minStockLevel && m.stock > 0
    ).length,
    outOfStock: medications.filter((m) => m.stock === 0).length,
    totalValue: medications.reduce((sum, m) => sum + m.stock * m.unitPrice, 0),
    nearExpiry: medications.filter((m) => {
      const expiryDate = new Date(m.expiryDate);
      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    }).length,
  };

  const handleAddMedication = () => {
    setSelectedMedication(null);
    setModalMode("add");
    setShowMedicationModal(true);
  };

  const handleEditMedication = (medication) => {
    setSelectedMedication(medication);
    setModalMode("edit");
    setShowMedicationModal(true);
  };

  const handleViewMedication = (medication) => {
    setSelectedMedication(medication);
    setModalMode("view");
    setShowMedicationModal(true);
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
  };

  const handleDispensePrescription = (prescriptionId) => {
    setPrescriptions((prev) =>
      prev.map((pres) =>
        pres.id === prescriptionId
          ? {
              ...pres,
              status: "Dispensed",
              dispensedBy: user.name,
              dispensedDate: new Date().toISOString().split("T")[0],
            }
          : pres
      )
    );
    alert(`Prescription ${prescriptionId} dispensed successfully!`);
  };

  const handleReorder = (medicationId) => {
    const medication = medications.find((m) => m.id === medicationId);
    if (medication) {
      alert(
        `Reorder request sent for ${medication.name} to ${medication.supplier}`
      );
    }
  };

  const handleExportData = () => {
    const data = activeTab === "medications" ? medications : prescriptions;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      (activeTab === "medications"
        ? "ID,Name,Generic Name,Stock,Unit Price,Category,Status\n"
        : "ID,Patient,Doctor,Status,Total Amount,Date\n") +
      data
        .map((item) =>
          activeTab === "medications"
            ? `${item.id},${item.name},${item.genericName},${item.stock},${item.unitPrice},${item.category},${item.status}`
            : `${item.id},${item.patientName},${item.doctorName},${item.status},${item.totalAmount},${item.date}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${activeTab}_data.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const handleSaveMedication = (medicationData) => {
    if (modalMode === "add") {
      const newMedication = {
        ...medicationData,
        id: (medications.length + 1).toString(),
        stock: parseInt(medicationData.stock),
        unitPrice: parseFloat(medicationData.unitPrice),
        minStockLevel: parseInt(medicationData.minStockLevel),
        reorderLevel: parseInt(medicationData.reorderLevel),
      };
      setMedications((prev) => [...prev, newMedication]);
    } else {
      setMedications((prev) =>
        prev.map((med) =>
          med.id === selectedMedication.id ? { ...med, ...medicationData } : med
        )
      );
    }
    setShowMedicationModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Pharmacy Management
          </h1>
          <p className="text-gray-600">
            Manage medications, prescriptions, and inventory
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportData}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          {(user.role === "admin" || user.role === "pharmacist") && (
            <button
              onClick={handleAddMedication}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Medication</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Medications
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {medicationStats.totalMedications}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Low Stock Items
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {medicationStats.lowStock}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {medicationStats.outOfStock}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Inventory Value
              </p>
              <p className="text-2xl font-bold text-green-600">
                ${medicationStats.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <nav className="flex space-x-8 p-6">
            <button
              onClick={() => setActiveTab("medications")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "medications"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Medications ({medications.length})
            </button>
            <button
              onClick={() => setActiveTab("prescriptions")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "prescriptions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Prescriptions ({prescriptions.length})
            </button>
          </nav>
        </div>

        {/* Search and filters */}
        <div className="p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
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
              {activeTab === "medications" ? (
                <>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </>
              ) : (
                prescriptionStatuses.slice(1).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))
              )}
            </select>

            {activeTab === "medications" && (
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
            )}

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
              {activeTab === "medications" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Level
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="all">All Stock Levels</option>
                      <option value="low">Low Stock</option>
                      <option value="out">Out of Stock</option>
                      <option value="adequate">Adequate Stock</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="all">All Dates</option>
                      <option value="30">Expiring in 30 days</option>
                      <option value="60">Expiring in 60 days</option>
                      <option value="90">Expiring in 90 days</option>
                    </select>
                  </div>
                </>
              ) : (
                <div className="md:col-span-2">
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
              )}
              <div className="flex items-end">
                <button className="w-full px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "medications" ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Medication
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Stock
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Expiry
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMedications.map((medication) => {
                    const stockStatus = getStockStatus(medication);
                    const StatusIcon = stockStatus.icon;

                    return (
                      <tr
                        key={medication.id}
                        className="border-b border-gray-50 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {medication.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {medication.genericName}
                            </p>
                            <p className="text-sm text-blue-600">
                              {medication.dosage} - {medication.category}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {medication.stock} units
                            </p>
                            <p className="text-sm text-gray-500">
                              Min: {medication.minStockLevel}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-gray-900">
                            ${medication.unitPrice}
                          </p>
                          <p className="text-sm text-gray-500">per unit</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-sm text-gray-900">
                            {medication.expiryDate}
                          </p>
                          {new Date(medication.expiryDate) - new Date() <
                            30 * 24 * 60 * 60 * 1000 && (
                            <p className="text-xs text-red-600">
                              Expiring soon
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {stockStatus.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleViewMedication(medication)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {(user.role === "admin" ||
                              user.role === "pharmacist") && (
                              <>
                                <button
                                  onClick={() =>
                                    handleEditMedication(medication)
                                  }
                                  className="text-indigo-600 hover:text-indigo-900 p-1"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                {stockStatus.status === "Low Stock" && (
                                  <button
                                    onClick={() => handleReorder(medication.id)}
                                    className="px-3 py-1 text-xs bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                                  >
                                    Reorder
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrescriptions.map((prescription) => {
                const statusInfo = getPrescriptionStatusColor(
                  prescription.status
                );
                const StatusIcon = statusInfo.icon;

                return (
                  <div
                    key={prescription.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            Prescription #{prescription.id}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {prescription.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Patient:</p>
                            <p className="font-medium text-gray-900">
                              {prescription.patientName}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Doctor:</p>
                            <p className="font-medium text-gray-900">
                              {prescription.doctorName}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Date:</p>
                            <p className="font-medium text-gray-900">
                              {prescription.date}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Total Amount:</p>
                            <p className="font-medium text-gray-900">
                              ${prescription.totalAmount}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewPrescription(prescription)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {prescription.status === "Pending" &&
                          (user.role === "pharmacist" ||
                            user.role === "admin") && (
                            <button
                              onClick={() =>
                                handleDispensePrescription(prescription.id)
                              }
                              className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              Dispense
                            </button>
                          )}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Medications:
                      </h4>
                      <div className="space-y-2">
                        {prescription.medications.map((med, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-3"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  {med.name} ({med.dosage})
                                </p>
                                <p className="text-sm text-gray-600">
                                  {med.frequency} for {med.duration} - Quantity:{" "}
                                  {med.quantity}
                                </p>
                                <p className="text-sm text-blue-600">
                                  {med.instructions}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                  ${med.totalPrice}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ${med.unitPrice} per unit
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {prescription.notes && (
                      <div className="border-t border-gray-100 pt-4 mt-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Notes:</span>{" "}
                          {prescription.notes}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Empty State */}
      {(activeTab === "medications" && filteredMedications.length === 0) ||
      (activeTab === "prescriptions" && filteredPrescriptions.length === 0) ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No {activeTab} found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or filters
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Clear Filters
          </button>
        </div>
      ) : null}

      {/* Medication Modal */}
      {showMedicationModal && (
        <MedicationModal
          medication={selectedMedication}
          mode={modalMode}
          onClose={() => setShowMedicationModal(false)}
          onSave={handleSaveMedication}
        />
      )}

      {/* Prescription Modal */}
      {showPrescriptionModal && selectedPrescription && (
        <PrescriptionModal
          prescription={selectedPrescription}
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}
    </div>
  );
};

// Medication Modal Component
const MedicationModal = ({ medication, mode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    dosage: "",
    form: "Tablet",
    manufacturer: "",
    stock: 0,
    unitPrice: 0,
    expiryDate: "",
    category: "Pain Relief",
    minStockLevel: 0,
    supplier: "",
    supplierContact: "",
    reorderLevel: 0,
    batchNumber: "",
    storageConditions: "Room Temperature",
    sideEffects: [],
    contraindications: [],
    status: "Active",
  });

  const [newSideEffect, setNewSideEffect] = useState("");
  const [newContraindication, setNewContraindication] = useState("");

  React.useEffect(() => {
    if (medication) {
      setFormData(medication);
    }
  }, [medication]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSideEffect = () => {
    if (newSideEffect.trim()) {
      setFormData((prev) => ({
        ...prev,
        sideEffects: [...prev.sideEffects, newSideEffect.trim()],
      }));
      setNewSideEffect("");
    }
  };

  const handleRemoveSideEffect = (index) => {
    setFormData((prev) => ({
      ...prev,
      sideEffects: prev.sideEffects.filter((_, i) => i !== index),
    }));
  };

  const handleAddContraindication = () => {
    if (newContraindication.trim()) {
      setFormData((prev) => ({
        ...prev,
        contraindications: [
          ...prev.contraindications,
          newContraindication.trim(),
        ],
      }));
      setNewContraindication("");
    }
  };

  const handleRemoveContraindication = (index) => {
    setFormData((prev) => ({
      ...prev,
      contraindications: prev.contraindications.filter((_, i) => i !== index),
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
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Pill className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === "add"
                  ? "Add New Medication"
                  : mode === "edit"
                  ? "Edit Medication"
                  : "Medication Details"}
              </h2>
              <p className="text-sm text-gray-600">
                {mode === "add"
                  ? "Enter medication information"
                  : mode === "edit"
                  ? "Update medication information"
                  : "View medication details"}
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
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Generic Name *
              </label>
              <input
                type="text"
                value={formData.genericName}
                onChange={(e) =>
                  handleInputChange("genericName", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dosage *
              </label>
              <input
                type="text"
                value={formData.dosage}
                onChange={(e) => handleInputChange("dosage", e.target.value)}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form
              </label>
              <select
                value={formData.form}
                onChange={(e) => handleInputChange("form", e.target.value)}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              >
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Liquid">Liquid</option>
                <option value="Injection">Injection</option>
                <option value="Cream">Cream</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Inventory Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock *
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", e.target.value)}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date *
              </label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  handleInputChange("expiryDate", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              >
                <option value="Pain Relief">Pain Relief</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) =>
                  handleInputChange("manufacturer", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Stock Management */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Stock Level
              </label>
              <input
                type="number"
                value={formData.minStockLevel}
                onChange={(e) =>
                  handleInputChange("minStockLevel", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reorder Level
              </label>
              <input
                type="number"
                value={formData.reorderLevel}
                onChange={(e) =>
                  handleInputChange("reorderLevel", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch Number
              </label>
              <input
                type="text"
                value={formData.batchNumber}
                onChange={(e) =>
                  handleInputChange("batchNumber", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Supplier Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => handleInputChange("supplier", e.target.value)}
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Contact
              </label>
              <input
                type="text"
                value={formData.supplierContact}
                onChange={(e) =>
                  handleInputChange("supplierContact", e.target.value)
                }
                disabled={isReadOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Side Effects */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Side Effects
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.sideEffects.map((effect, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                  >
                    {effect}
                    {!isReadOnly && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSideEffect(index)}
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
                    value={newSideEffect}
                    onChange={(e) => setNewSideEffect(e.target.value)}
                    placeholder="Add side effect"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSideEffect}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Contraindications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraindications
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.contraindications.map((contra, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
                  >
                    {contra}
                    {!isReadOnly && (
                      <button
                        type="button"
                        onClick={() => handleRemoveContraindication(index)}
                        className="ml-2 text-yellow-500 hover:text-yellow-700"
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
                    value={newContraindication}
                    onChange={(e) => setNewContraindication(e.target.value)}
                    placeholder="Add contraindication"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddContraindication}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              {isReadOnly ? "Close" : "Cancel"}
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>
                  {mode === "add" ? "Add Medication" : "Update Medication"}
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// Prescription Modal Component
const PrescriptionModal = ({ prescription, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Prescription Details
              </h2>
              <p className="text-sm text-gray-600">
                Prescription #{prescription.id}
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

        <div className="p-6 space-y-6">
          {/* Patient and Doctor Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                Patient Information
              </h3>
              <p>
                <strong>Name:</strong> {prescription.patientName}
              </p>
              <p>
                <strong>Age:</strong> {prescription.patientAge}
              </p>
              <p>
                <strong>Gender:</strong> {prescription.patientGender}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                Doctor Information
              </h3>
              <p>
                <strong>Name:</strong> {prescription.doctorName}
              </p>
              <p>
                <strong>Date:</strong> {prescription.date}
              </p>
              <p>
                <strong>Status:</strong> {prescription.status}
              </p>
            </div>
          </div>

          {/* Medications */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Prescribed Medications
            </h3>
            <div className="space-y-4">
              {prescription.medications.map((med, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {med.name} ({med.dosage})
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Frequency:</strong> {med.frequency} |{" "}
                        <strong>Duration:</strong> {med.duration}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Quantity:</strong> {med.quantity} |{" "}
                        <strong>Instructions:</strong> {med.instructions}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${med.totalPrice}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${med.unitPrice} per unit
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">
              Financial Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${prescription.totalAmount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Insurance Coverage</p>
                <p className="text-lg font-semibold text-green-600">
                  {prescription.insuranceCoverage}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Patient Payable</p>
                <p className="text-lg font-semibold text-blue-600">
                  ${prescription.patientPayable}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Insurance Pays</p>
                <p className="text-lg font-semibold text-purple-600">
                  ${prescription.totalAmount - prescription.patientPayable}
                </p>
              </div>
            </div>
          </div>

          {prescription.notes && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Additional Notes
              </h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                {prescription.notes}
              </p>
            </div>
          )}

          {prescription.dispensedBy && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">
                Dispensing Information
              </h3>
              <p>
                <strong>Dispensed By:</strong> {prescription.dispensedBy}
              </p>
              <p>
                <strong>Dispensed Date:</strong> {prescription.dispensedDate}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-4 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyManagement;
