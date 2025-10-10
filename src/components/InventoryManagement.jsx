import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Eye,
  Edit,
  Download,
  MoreVertical,
  ChevronDown,
  X,
  BarChart3,
  Calendar,
  Truck,
  ShoppingCart,
  FileText,
  RefreshCw,
  Archive,
  History,
} from "lucide-react";

const InventoryManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSupplier, setFilterSupplier] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedItemForActions, setSelectedItemForActions] = useState(null);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [restockQuantity, setRestockQuantity] = useState("");

  const [inventory, setInventory] = useState([
    {
      id: "1",
      name: "Surgical Gloves (Box)",
      category: "Medical Equipment",
      quantity: 150,
      unitPrice: 25.5,
      supplier: "MedSupply Co.",
      lastRestocked: "2024-01-15",
      nextRestockDate: "2024-02-15",
      minStockLevel: 50,
      maxStockLevel: 200,
      location: "Storage Room A",
      shelf: "A1-02",
      status: "In Stock",
      barcode: "8901234567890",
      expiryDate: "2025-12-31",
      reorderPoint: 75,
      totalValue: 3825,
      usageRate: "45/month",
      critical: false,
    },
    {
      id: "2",
      name: "Disposable Syringes (100 pack)",
      category: "Consumables",
      quantity: 25,
      unitPrice: 45.0,
      supplier: "HealthCare Supplies",
      lastRestocked: "2024-01-10",
      nextRestockDate: "2024-01-25",
      minStockLevel: 30,
      maxStockLevel: 100,
      location: "Storage Room B",
      shelf: "B2-04",
      status: "Low Stock",
      barcode: "8901234567891",
      expiryDate: "2025-06-30",
      reorderPoint: 40,
      totalValue: 1125,
      usageRate: "60/month",
      critical: true,
    },
    {
      id: "3",
      name: "Blood Pressure Monitor",
      category: "Medical Equipment",
      quantity: 8,
      unitPrice: 120.0,
      supplier: "MedTech Solutions",
      lastRestocked: "2023-12-20",
      nextRestockDate: "2024-03-20",
      minStockLevel: 5,
      maxStockLevel: 15,
      location: "Equipment Room",
      shelf: "EQ-01",
      status: "In Stock",
      barcode: "8901234567892",
      expiryDate: "2026-12-31",
      reorderPoint: 6,
      totalValue: 960,
      usageRate: "2/month",
      critical: false,
    },
    {
      id: "4",
      name: "Bandages (Sterile)",
      category: "Consumables",
      quantity: 0,
      unitPrice: 15.75,
      supplier: "MedSupply Co.",
      lastRestocked: "2024-01-05",
      nextRestockDate: "2024-01-30",
      minStockLevel: 100,
      maxStockLevel: 300,
      location: "Storage Room A",
      shelf: "A1-05",
      status: "Out of Stock",
      barcode: "8901234567893",
      expiryDate: "2025-09-30",
      reorderPoint: 150,
      totalValue: 0,
      usageRate: "120/month",
      critical: true,
    },
    {
      id: "5",
      name: "Office Paper (Ream)",
      category: "Office Supplies",
      quantity: 75,
      unitPrice: 8.99,
      supplier: "Office Depot",
      lastRestocked: "2024-01-12",
      nextRestockDate: "2024-02-12",
      minStockLevel: 20,
      maxStockLevel: 100,
      location: "Office Supply Room",
      shelf: "OS-03",
      status: "In Stock",
      barcode: "8901234567894",
      expiryDate: null,
      reorderPoint: 30,
      totalValue: 674.25,
      usageRate: "25/month",
      critical: false,
    },
    {
      id: "6",
      name: "Paracetamol 500mg (100 tablets)",
      category: "Medicines",
      quantity: 12,
      unitPrice: 12.5,
      supplier: "PharmaCorp",
      lastRestocked: "2024-01-18",
      nextRestockDate: "2024-02-01",
      minStockLevel: 20,
      maxStockLevel: 50,
      location: "Pharmacy Store",
      shelf: "PH-02",
      status: "Low Stock",
      barcode: "8901234567895",
      expiryDate: "2024-08-15",
      reorderPoint: 25,
      totalValue: 150,
      usageRate: "80/month",
      critical: true,
    },
    {
      id: "7",
      name: "IV Saline Solution 500ml",
      category: "Medicines",
      quantity: 45,
      unitPrice: 3.25,
      supplier: "MedSupply Co.",
      lastRestocked: "2024-01-22",
      nextRestockDate: "2024-02-22",
      minStockLevel: 30,
      maxStockLevel: 80,
      location: "Storage Room C",
      shelf: "C1-01",
      status: "In Stock",
      barcode: "8901234567896",
      expiryDate: "2024-07-20",
      reorderPoint: 40,
      totalValue: 146.25,
      usageRate: "65/month",
      critical: false,
    },
    {
      id: "8",
      name: "Protective Face Masks (Box of 50)",
      category: "PPE",
      quantity: 180,
      unitPrice: 18.75,
      supplier: "Safety First Inc.",
      lastRestocked: "2024-01-14",
      nextRestockDate: "2024-02-28",
      minStockLevel: 50,
      maxStockLevel: 250,
      location: "Storage Room B",
      shelf: "B1-03",
      status: "In Stock",
      barcode: "8901234567897",
      expiryDate: "2025-05-31",
      reorderPoint: 80,
      totalValue: 3375,
      usageRate: "90/month",
      critical: false,
    },
  ]);

  const categories = [
    "All",
    "Medical Equipment",
    "Consumables",
    "Medicines",
    "Office Supplies",
    "PPE",
  ];
  const statuses = ["All", "In Stock", "Low Stock", "Out of Stock"];
  const suppliers = [
    "All",
    "MedSupply Co.",
    "HealthCare Supplies",
    "MedTech Solutions",
    "Office Depot",
    "PharmaCorp",
    "Safety First Inc.",
  ];

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm);

    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;
    const matchesSupplier =
      filterSupplier === "all" || item.supplier === filterSupplier;

    return matchesSearch && matchesCategory && matchesStatus && matchesSupplier;
  });

  const inventoryStats = {
    totalItems: inventory.length,
    lowStock: inventory.filter((i) => i.status === "Low Stock").length,
    outOfStock: inventory.filter((i) => i.status === "Out of Stock").length,
    criticalItems: inventory.filter((i) => i.critical).length,
    totalValue: inventory.reduce((sum, i) => sum + i.totalValue, 0),
    itemsToReorder: inventory.filter((i) => i.quantity <= i.reorderPoint)
      .length,
    nearExpiry: inventory.filter((i) => {
      if (!i.expiryDate) return false;
      const expiry = new Date(i.expiryDate);
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
      return expiry <= threeMonthsFromNow;
    }).length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700 border-green-200";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Out of Stock":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Medical Equipment":
        return "bg-blue-100 text-blue-700";
      case "Consumables":
        return "bg-purple-100 text-purple-700";
      case "Medicines":
        return "bg-green-100 text-green-700";
      case "Office Supplies":
        return "bg-orange-100 text-orange-700";
      case "PPE":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    setModalMode("add");
    setShowItemModal(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setModalMode("edit");
    setShowItemModal(true);
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setModalMode("view");
    setShowItemModal(true);
  };

  const handleRestock = (item) => {
    setSelectedItem(item);
    setRestockQuantity("");
    setShowRestockModal(true);
  };

  const executeRestock = () => {
    if (
      !restockQuantity ||
      isNaN(restockQuantity) ||
      parseInt(restockQuantity) <= 0
    ) {
      alert("Please enter a valid quantity");
      return;
    }

    setInventory((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              quantity: item.quantity + parseInt(restockQuantity),
              status:
                item.quantity + parseInt(restockQuantity) <= item.minStockLevel
                  ? "Low Stock"
                  : "In Stock",
              lastRestocked: new Date().toISOString().split("T")[0],
              totalValue:
                (item.quantity + parseInt(restockQuantity)) * item.unitPrice,
              critical: false,
            }
          : item
      )
    );

    setShowRestockModal(false);
    setSelectedItem(null);
    setRestockQuantity("");
    alert(
      `Successfully restocked ${restockQuantity} units of ${selectedItem.name}`
    );
  };

  const handleUseItem = (itemId, quantityUsed) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: Math.max(0, item.quantity - quantityUsed),
              status:
                item.quantity - quantityUsed <= item.minStockLevel
                  ? "Low Stock"
                  : item.quantity - quantityUsed === 0
                  ? "Out of Stock"
                  : "In Stock",
              totalValue:
                Math.max(0, item.quantity - quantityUsed) * item.unitPrice,
              critical: item.quantity - quantityUsed <= item.reorderPoint,
            }
          : item
      )
    );
  };

  const exportInventory = (format = "csv") => {
    let content, filename, mimeType;

    if (format === "csv") {
      const headers = [
        "ID",
        "Name",
        "Category",
        "Quantity",
        "Unit Price",
        "Total Value",
        "Status",
        "Location",
        "Supplier",
      ];
      const data = inventory.map((item) => [
        item.id,
        `"${item.name}"`,
        item.category,
        item.quantity,
        item.unitPrice,
        item.totalValue,
        item.status,
        item.location,
        `"${item.supplier}"`,
      ]);
      content = [headers, ...data].map((row) => row.join(",")).join("\n");
      filename = "inventory_export.csv";
      mimeType = "text/csv";
    } else {
      content = JSON.stringify(inventory, null, 2);
      filename = "inventory_export.json";
      mimeType = "application/json";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateReorderReport = () => {
    const reorderItems = inventory.filter(
      (item) => item.quantity <= item.reorderPoint
    );
    const reportContent = `
INVENTORY REORDER REPORT
Generated: ${new Date().toLocaleDateString()}

ITEMS NEEDING REORDER:
${reorderItems
  .map(
    (item) => `
${item.name}
- Current Stock: ${item.quantity}
- Reorder Point: ${item.reorderPoint}
- Supplier: ${item.supplier}
- Last Restocked: ${item.lastRestocked}
- Suggested Order: ${item.maxStockLevel - item.quantity} units
`
  )
  .join("\n")}

TOTAL ITEMS NEEDING REORDER: ${reorderItems.length}
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reorder_report_${
      new Date().toISOString().split("T")[0]
    }.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600">
            Manage hospital supplies, equipment, and stock levels
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => exportInventory("csv")}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          {(user.role === "admin" || user.role === "nurse") && (
            <button
              onClick={handleAddItem}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {inventoryStats.totalItems}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">
                {inventoryStats.lowStock}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">
                {inventoryStats.outOfStock}
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
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">
                ${inventoryStats.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">To Reorder</p>
              <p className="text-2xl font-bold text-orange-600">
                {inventoryStats.itemsToReorder}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Near Expiry</p>
              <p className="text-2xl font-bold text-purple-600">
                {inventoryStats.nearExpiry}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
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
              placeholder="Search by name, supplier, location, or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
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
            value={filterSupplier}
            onChange={(e) => setFilterSupplier(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Suppliers</option>
            {suppliers.slice(1).map((supplier) => (
              <option key={supplier} value={supplier}>
                {supplier}
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
                Stock Range
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min $"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max $"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Clear Filters
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alerts Section */}
      {(inventoryStats.lowStock > 0 ||
        inventoryStats.outOfStock > 0 ||
        inventoryStats.nearExpiry > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">
                Inventory Alerts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-yellow-700">
                {inventoryStats.outOfStock > 0 && (
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span>
                      {inventoryStats.outOfStock} item(s) out of stock
                    </span>
                  </div>
                )}
                {inventoryStats.lowStock > 0 && (
                  <div className="flex items-center">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    <span>{inventoryStats.lowStock} item(s) running low</span>
                  </div>
                )}
                {inventoryStats.nearExpiry > 0 && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{inventoryStats.nearExpiry} item(s) near expiry</span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <button
                  onClick={generateReorderReport}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                >
                  Generate Reorder Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Quick Restock</span>
            </button>
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FileText className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Stock Take</span>
            </button>
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Truck className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">Supplier Orders</span>
            </button>
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Usage Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Inventory Items
          </h2>
          <span className="text-sm text-gray-500">
            Showing {filteredInventory.length} of {inventory.length} items
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Information
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Financials
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Location
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </span>
                        {item.critical && (
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Supplier: {item.supplier}
                      </p>
                      <p className="text-xs text-gray-400">
                        Barcode: {item.barcode}
                      </p>
                      {item.expiryDate && (
                        <p className="text-xs text-gray-400">
                          Expires: {item.expiryDate}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.quantity} units
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            item.quantity === 0
                              ? "bg-red-500"
                              : item.quantity <= item.minStockLevel
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (item.quantity / item.maxStockLevel) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Min: {item.minStockLevel}</span>
                        <span>Max: {item.maxStockLevel}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Usage: {item.usageRate}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-900">
                        ${item.unitPrice.toFixed(2)}/unit
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        ${item.totalValue.toFixed(2)} total
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Last restocked: {item.lastRestocked}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                      <div>
                        <p className="text-sm text-gray-900">{item.location}</p>
                        <p className="text-xs text-gray-500">
                          Shelf: {item.shelf}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleViewItem(item)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {(user.role === "admin" || user.role === "nurse") && (
                        <>
                          <button
                            onClick={() => handleEditItem(item)}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50"
                            title="Edit Item"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* More Actions Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() =>
                                setSelectedItemForActions(
                                  selectedItemForActions === item.id
                                    ? null
                                    : item.id
                                )
                              }
                              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50"
                              title="More Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {selectedItemForActions === item.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <div className="py-1">
                                  <button
                                    onClick={() => handleRestock(item)}
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                                  >
                                    <Truck className="w-4 h-4" />
                                    <span>Restock Item</span>
                                  </button>
                                  <button
                                    onClick={() => handleUseItem(item.id, 1)}
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                                  >
                                    <Package className="w-4 h-4" />
                                    <span>Use 1 Unit</span>
                                  </button>
                                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                                    <History className="w-4 h-4" />
                                    <span>View History</span>
                                  </button>
                                  {user.role === "admin" && (
                                    <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                      <Archive className="w-4 h-4" />
                                      <span>Archive Item</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No inventory items found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={handleAddItem}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Add New Item
            </button>
          </div>
        )}
      </div>

      {/* Restock Modal */}
      {showRestockModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Restock Item
                  </h2>
                  <p className="text-sm text-gray-600">{selectedItem.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowRestockModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Current Stock</p>
                  <p className="font-medium">{selectedItem.quantity} units</p>
                </div>
                <div>
                  <p className="text-gray-500">Max Capacity</p>
                  <p className="font-medium">
                    {selectedItem.maxStockLevel} units
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity to Add
                </label>
                <input
                  type="number"
                  value={restockQuantity}
                  onChange={(e) => setRestockQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter quantity..."
                  min="1"
                  max={selectedItem.maxStockLevel - selectedItem.quantity}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum: {selectedItem.maxStockLevel - selectedItem.quantity}{" "}
                  units
                </p>
              </div>

              {restockQuantity && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    New stock level:{" "}
                    {selectedItem.quantity + parseInt(restockQuantity)} units
                  </p>
                  <p className="text-sm text-blue-700">
                    Total cost: $
                    {(
                      selectedItem.unitPrice * parseInt(restockQuantity)
                    ).toFixed(2)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowRestockModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={executeRestock}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
