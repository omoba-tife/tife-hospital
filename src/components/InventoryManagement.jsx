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
} from "lucide-react";

const InventoryManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [inventory] = useState([
    {
      id: "1",
      name: "Surgical Gloves (Box)",
      category: "Medical Equipment",
      quantity: 150,
      unitPrice: 25.5,
      supplier: "MedSupply Co.",
      lastRestocked: "2024-01-15",
      minStockLevel: 50,
      location: "Storage Room A",
      status: "In Stock",
    },
    {
      id: "2",
      name: "Disposable Syringes (100 pack)",
      category: "Consumables",
      quantity: 25,
      unitPrice: 45.0,
      supplier: "HealthCare Supplies",
      lastRestocked: "2024-01-10",
      minStockLevel: 30,
      location: "Storage Room B",
      status: "Low Stock",
    },
    {
      id: "3",
      name: "Blood Pressure Monitor",
      category: "Medical Equipment",
      quantity: 8,
      unitPrice: 120.0,
      supplier: "MedTech Solutions",
      lastRestocked: "2023-12-20",
      minStockLevel: 5,
      location: "Equipment Room",
      status: "In Stock",
    },
    {
      id: "4",
      name: "Bandages (Sterile)",
      category: "Consumables",
      quantity: 0,
      unitPrice: 15.75,
      supplier: "MedSupply Co.",
      lastRestocked: "2024-01-05",
      minStockLevel: 100,
      location: "Storage Room A",
      status: "Out of Stock",
    },
    {
      id: "5",
      name: "Office Paper (Ream)",
      category: "Office Supplies",
      quantity: 75,
      unitPrice: 8.99,
      supplier: "Office Depot",
      lastRestocked: "2024-01-12",
      minStockLevel: 20,
      location: "Office Supply Room",
      status: "In Stock",
    },
    {
      id: "6",
      name: "Paracetamol 500mg (100 tablets)",
      category: "Medicines",
      quantity: 12,
      unitPrice: 12.5,
      supplier: "PharmaCorp",
      lastRestocked: "2024-01-18",
      minStockLevel: 20,
      location: "Pharmacy Store",
      status: "Low Stock",
    },
  ]);

  const categories = [
    "Medical Equipment",
    "Consumables",
    "Medicines",
    "Office Supplies",
  ];

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      item.status.toLowerCase().replace(" ", "_") === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
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
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const inventoryStats = {
    totalItems: inventory.length,
    lowStock: inventory.filter((i) => i.status === "Low Stock").length,
    outOfStock: inventory.filter((i) => i.status === "Out of Stock").length,
    totalValue: inventory.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600">
            Manage hospital supplies and equipment
          </p>
        </div>
        {(user.role === "admin" || user.role === "nurse") && (
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {inventoryStats.totalItems}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">
                {inventoryStats.lowStock}
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
                {inventoryStats.outOfStock}
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
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-green-600">
                ${inventoryStats.totalValue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {(inventoryStats.lowStock > 0 || inventoryStats.outOfStock > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-medium text-yellow-800 mb-2">
                Inventory Alerts
              </h3>
              <div className="space-y-1 text-sm text-yellow-700">
                {inventoryStats.outOfStock > 0 && (
                  <p>
                    • {inventoryStats.outOfStock} item(s) are out of stock and
                    need immediate restocking
                  </p>
                )}
                {inventoryStats.lowStock > 0 && (
                  <p>
                    • {inventoryStats.lowStock} item(s) are running low and
                    should be restocked soon
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Inventory Items
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Supplier: {item.supplier}
                      </p>
                      <p className="text-sm text-gray-500">
                        Last restocked: {item.lastRestocked}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.quantity} units
                      </p>
                      <p className="text-sm text-gray-500">
                        Min: {item.minStockLevel}
                      </p>
                      {item.quantity <= item.minStockLevel && (
                        <div className="flex items-center mt-1">
                          <AlertTriangle className="w-3 h-3 text-red-500 mr-1" />
                          <span className="text-xs text-red-600">
                            Below minimum
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">
                      ${item.unitPrice.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{item.location}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {(user.role === "admin" || user.role === "nurse") && (
                        <button
                          className="text-indigo-600 hover:text-indigo-900 p-1"
                          title="Edit Item"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {(item.status === "Low Stock" ||
                        item.status === "Out of Stock") && (
                        <button className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700">
                          Restock
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

  
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Inventory by Category
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const categoryItems = inventory.filter(
                (i) => i.category === category
              );
              const categoryValue = categoryItems.reduce(
                (sum, i) => sum + i.quantity * i.unitPrice,
                0
              );
              const lowStockItems = categoryItems.filter(
                (i) => i.status === "Low Stock" || i.status === "Out of Stock"
              ).length;

              return (
                <div
                  key={category}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-blue-600">
                      {categoryItems.length}
                    </p>
                    <p className="text-sm text-gray-500">items</p>
                    <p className="text-sm font-medium text-green-600">
                      ${categoryValue.toLocaleString()}
                    </p>
                    {lowStockItems > 0 && (
                      <p className="text-sm text-red-600">
                        {lowStockItems} need attention
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {filteredInventory.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            No inventory items found for the selected criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
