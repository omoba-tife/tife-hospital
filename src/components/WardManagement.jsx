import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Building,
  Bed,
  Users,
  AlertTriangle,
  MapPin,
  X,
  ChevronDown,
} from "lucide-react";

const WardManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("wards");
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const [wards, setWards] = useState([
    {
      id: "1",
      name: "General Ward A",
      type: "General",
      totalBeds: 30,
      occupiedBeds: 25,
      availableBeds: 5,
      supervisor: "Nurse Adebola",
      location: "Floor 2, Wing A",
    },
    {
      id: "2",
      name: "ICU",
      type: "ICU",
      totalBeds: 12,
      occupiedBeds: 10,
      availableBeds: 2,
      supervisor: "Dr. James",
      location: "Floor 3, Wing B",
    },
    {
      id: "3",
      name: "Emergency Ward",
      type: "Emergency",
      totalBeds: 20,
      occupiedBeds: 8,
      availableBeds: 12,
      supervisor: "Dr. Lisa",
      location: "Ground Floor, Wing C",
    },
    {
      id: "4",
      name: "Pediatric Ward",
      type: "Pediatric",
      totalBeds: 15,
      occupiedBeds: 12,
      availableBeds: 3,
      supervisor: "Nurse Sarah",
      location: "Floor 4, Wing A",
    },
    {
      id: "5",
      name: "Maternity Ward",
      type: "Maternity",
      totalBeds: 18,
      occupiedBeds: 14,
      availableBeds: 4,
      supervisor: "Dr. Maria",
      location: "Floor 2, Wing B",
    },
  ]);

  const [rooms, setRooms] = useState([
    {
      id: "1",
      number: "A101",
      wardId: "1",
      wardName: "General Ward A",
      type: "Single",
      status: "Occupied",
      patientId: "1",
      patientName: "John Alexandre",
      dailyRate: 200,
      amenities: ["Private Bathroom", "TV", "AC"],
    },
    {
      id: "2",
      number: "A102",
      wardId: "1",
      wardName: "General Ward A",
      type: "Double",
      status: "Available",
      dailyRate: 150,
      amenities: ["Shared Bathroom", "TV"],
    },
    {
      id: "3",
      number: "ICU-01",
      wardId: "2",
      wardName: "ICU",
      type: "ICU",
      status: "Occupied",
      patientId: "3",
      patientName: "Robert Alumiasunya",
      dailyRate: 800,
      amenities: ["Life Support", "Monitoring", "Private Bathroom"],
    },
    {
      id: "4",
      number: "ICU-02",
      wardId: "2",
      wardName: "ICU",
      type: "ICU",
      status: "Available",
      dailyRate: 800,
      amenities: ["Life Support", "Monitoring", "Private Bathroom"],
    },
    {
      id: "5",
      number: "OT-1",
      wardId: "6",
      wardName: "Surgery",
      type: "Operation Theater",
      status: "Reserved",
      dailyRate: 1500,
      amenities: ["Surgical Equipment", "Anesthesia", "Sterile Environment"],
    },
  ]);

  const getWardTypeColor = (type) => {
    switch (type) {
      case "General":
        return "bg-blue-100 text-blue-700";
      case "ICU":
        return "bg-red-100 text-red-700";
      case "Emergency":
        return "bg-yellow-100 text-yellow-700";
      case "Pediatric":
        return "bg-green-100 text-green-700";
      case "Maternity":
        return "bg-pink-100 text-pink-700";
      case "Surgery":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRoomStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Occupied":
        return "bg-red-100 text-red-700";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-700";
      case "Reserved":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getOccupancyColor = (occupancy) => {
    if (occupancy >= 90) return "text-red-600";
    if (occupancy >= 75) return "text-yellow-600";
    return "text-green-600";
  };

  const filteredWards = wards
    .filter(
      (ward) =>
        ward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ward.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ward.supervisor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((ward) => filterType === "all" || ward.type === filterType);

  const filteredRooms = rooms
    .filter(
      (room) =>
        room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.wardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (room.patientName &&
          room.patientName.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(
      (room) =>
        (filterType === "all" || room.type === filterType) &&
        (filterStatus === "all" || room.status === filterStatus)
    );

  const wardStats = {
    totalBeds: wards.reduce((sum, ward) => sum + ward.totalBeds, 0),
    occupiedBeds: wards.reduce((sum, ward) => sum + ward.occupiedBeds, 0),
    availableBeds: wards.reduce((sum, ward) => sum + ward.availableBeds, 0),
    occupancyRate: Math.round(
      (wards.reduce((sum, ward) => sum + ward.occupiedBeds, 0) /
        wards.reduce((sum, ward) => sum + ward.totalBeds, 0)) *
        100
    ),
  };

  const handleAssignPatient = (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      const patientName = prompt(`Enter patient name for room ${room.number}:`);
      if (patientName) {
        setRooms((prev) =>
          prev.map((r) =>
            r.id === roomId
              ? {
                  ...r,
                  status: "Occupied",
                  patientName,
                  patientId: `PAT-${Date.now()}`,
                }
              : r
          )
        );
        alert(`Patient ${patientName} assigned to room ${room.number}`);
      }
    }
  };

  const handleDischarge = (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    if (room && window.confirm(`Discharge patient from room ${room.number}?`)) {
      setRooms((prev) =>
        prev.map((r) =>
          r.id === roomId
            ? { ...r, status: "Available", patientName: "", patientId: "" }
            : r
        )
      );
      alert(`Patient discharged from room ${room.number}`);
    }
  };

  const handleViewDetails = (ward) => {
    alert(
      `Ward Details:\nName: ${ward.name}\nType: ${ward.type}\nBeds: ${ward.totalBeds}\nAvailable: ${ward.availableBeds}`
    );
  };

  const handleManageRooms = (ward) => {
    const wardRooms = rooms.filter((room) => room.wardId === ward.id);
    alert(
      `Managing rooms for ${ward.name}\nTotal rooms: ${
        wardRooms.length
      }\nAvailable: ${wardRooms.filter((r) => r.status === "Available").length}`
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterType("all");
    setFilterStatus("all");
  };

  const handleAddWard = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newWard = {
      id: (wards.length + 1).toString(),
      name: formData.get("name"),
      type: formData.get("type"),
      totalBeds: parseInt(formData.get("totalBeds")),
      occupiedBeds: 0,
      availableBeds: parseInt(formData.get("totalBeds")),
      supervisor: formData.get("supervisor"),
      location: formData.get("location"),
    };

    setWards((prev) => [...prev, newWard]);
    setShowAddModal(false);
    alert("Ward added successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Ward & Room Management
          </h1>
          <p className="text-gray-600">
            Manage hospital wards and room assignments
          </p>
        </div>
        {user.role === "admin" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Ward/Room</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Beds</p>
              <p className="text-2xl font-bold text-gray-900">
                {wardStats.totalBeds}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Bed className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-red-600">
                {wardStats.occupiedBeds}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-green-600">
                {wardStats.availableBeds}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Bed className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Occupancy Rate
              </p>
              <p
                className={`text-2xl font-bold ${getOccupancyColor(
                  wardStats.occupancyRate
                )}`}
              >
                {wardStats.occupancyRate}%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-100">
          <nav className="flex space-x-8 p-6">
            <button
              onClick={() => setActiveTab("wards")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "wards"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Wards ({wards.length})
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "rooms"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Rooms ({rooms.length})
            </button>
          </nav>
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="General">General</option>
                  <option value="ICU">ICU</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Pediatric">Pediatric</option>
                  <option value="Maternity">Maternity</option>
                  <option value="Surgery">Surgery</option>
                </select>
              </div>
              {activeTab === "rooms" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>
              )}
              <div className="md:col-span-2">
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

        <div className="p-6">
          {activeTab === "wards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWards.map((ward) => {
                const occupancyRate = Math.round(
                  (ward.occupiedBeds / ward.totalBeds) * 100
                );

                return (
                  <div
                    key={ward.id}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {ward.name}
                        </h3>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getWardTypeColor(
                            ward.type
                          )}`}
                        >
                          {ward.type}
                        </span>
                      </div>
                      {occupancyRate >= 90 && (
                        <AlertTriangle
                          className="w-5 h-5 text-red-500"
                          title="High Occupancy"
                        />
                      )}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Total Beds:
                        </span>
                        <span className="font-medium">{ward.totalBeds}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Occupied:</span>
                        <span className="font-medium text-red-600">
                          {ward.occupiedBeds}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Available:
                        </span>
                        <span className="font-medium text-green-600">
                          {ward.availableBeds}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Occupancy:
                        </span>
                        <span
                          className={`font-medium ${getOccupancyColor(
                            occupancyRate
                          )}`}
                        >
                          {occupancyRate}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full ${
                          occupancyRate >= 90
                            ? "bg-red-500"
                            : occupancyRate >= 75
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${occupancyRate}%` }}
                      ></div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {ward.supervisor}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {ward.location}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(ward)}
                        className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleManageRooms(ward)}
                        className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                      >
                        Manage Rooms
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Room
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Ward
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Patient
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Daily Rate
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room) => (
                    <tr
                      key={room.id}
                      className="border-b border-gray-50 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {room.number}
                          </p>
                          <p className="text-sm text-gray-500">
                            {room.amenities.slice(0, 2).join(", ")}
                            {room.amenities.length > 2 &&
                              ` +${room.amenities.length - 2} more`}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900">{room.wardName}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getWardTypeColor(
                            room.type
                          )}`}
                        >
                          {room.type}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoomStatusColor(
                            room.status
                          )}`}
                        >
                          {room.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {room.patientName ? (
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {room.patientName}
                            </p>
                            <p className="text-sm text-gray-500">
                              ID: {room.patientId}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">
                            No patient
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm font-medium text-gray-900">
                          ${room.dailyRate}
                        </p>
                        <p className="text-sm text-gray-500">per day</p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {room.status === "Available" && (
                            <button
                              onClick={() => handleAssignPatient(room.id)}
                              className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Assign Patient
                            </button>
                          )}
                          {room.status === "Occupied" && (
                            <button
                              onClick={() => handleDischarge(room.id)}
                              className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                              Discharge
                            </button>
                          )}
                          <button className="px-3 py-1 text-xs border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Ward Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add New Ward
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleAddWard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ward Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>
                  <select
                    name="type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="General">General</option>
                    <option value="ICU">ICU</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Pediatric">Pediatric</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Surgery">Surgery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Beds *
                  </label>
                  <input
                    type="number"
                    name="totalBeds"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supervisor
                  </label>
                  <input
                    type="text"
                    name="supervisor"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Ward
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

export default WardManagement;
