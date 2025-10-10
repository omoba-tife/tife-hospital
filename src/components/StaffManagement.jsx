import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Users,
  Calendar,
  DollarSign,
  UserCheck,
  Eye,
  Edit,
  Phone,
  Mail,
  Trash2,
  Download,
  Upload,
  MoreVertical,
  X,
  Clock,
  Award,
  Star,
  Shield,
  GraduationCap,
  MapPin,
  Badge,
  ChevronDown,
  Save,
  Camera,
  Briefcase,
  Heart,
  Stethoscope,
  BookOpen,
  Languages,
} from "lucide-react";

const StaffManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterShift, setFilterShift] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [editingStaff, setEditingStaff] = useState(null);

  const [staff, setStaff] = useState([
    {
      id: "1",
      name: "Dr. Michael Ogunbiyi",
      role: "Senior Cardiologist",
      department: "Cardiology",
      phone: "+1 234-567-8910",
      email: "michael.ogunbiyi@hospital.com",
      joiningDate: "2018-03-15",
      salary: 180000,
      status: "Active",
      shift: "Morning",
      supervisor: "Dr. Sarah Johnson",
      qualifications: ["MD", "Board Certified Cardiology", "FACC"],
      experience: "12 years",
      specialization: "Interventional Cardiology",
      address: "123 Medical Ave, City, State 12345",
      emergencyContact: "+1 234-567-8999",
      emergencyContactName: "Sarah Ogunbiyi",
      employeeId: "EMP-001",
      performance: 4.8,
      attendance: 98,
      lastEvaluation: "2024-01-15",
      notes:
        "Excellent patient care, strong leadership skills. Specializes in complex cardiac procedures.",

      // Additional Details
      personalInfo: {
        dateOfBirth: "1980-05-15",
        gender: "Male",
        bloodGroup: "O+",
        maritalStatus: "Married",
        nationality: "American",
      },
      education: [
        {
          degree: "MD",
          institution: "Harvard Medical School",
          year: "2008",
          specialization: "Medicine",
        },
        {
          degree: "BS Biology",
          institution: "Stanford University",
          year: "2004",
          specialization: "Biological Sciences",
        },
      ],
      certifications: [
        "Board Certified Cardiology",
        "Advanced Cardiac Life Support (ACLS)",
        "Basic Life Support (BLS)",
        "Fellow of American College of Cardiology (FACC)",
      ],
      languages: ["English", "Spanish", "French"],
      skills: [
        "Cardiac Catheterization",
        "Echocardiography",
        "Pacemaker Implantation",
        "Clinical Research",
        "Team Leadership",
      ],
      workSchedule: {
        monday: "9:00 AM - 5:00 PM",
        tuesday: "9:00 AM - 5:00 PM",
        wednesday: "9:00 AM - 5:00 PM",
        thursday: "9:00 AM - 5:00 PM",
        friday: "9:00 AM - 3:00 PM",
        saturday: "Off",
        sunday: "Off",
      },
      benefits: {
        healthInsurance: true,
        dentalInsurance: true,
        retirementPlan: true,
        paidTimeOff: 25,
        sickDays: 12,
      },
    },
    {
      id: "2",
      name: "Adebanjo Demilade",
      role: "Head Nurse",
      department: "Emergency",
      phone: "+1 234-567-8911",
      email: "adebanjo.demilade@hospital.com",
      joiningDate: "2019-07-20",
      salary: 75000,
      status: "Active",
      shift: "Night",
      supervisor: "Dr. James Wilson",
      qualifications: ["BSN", "RN", "ACLS Certified", "PALS Certified"],
      experience: "8 years",
      specialization: "Emergency Care",
      address: "456 Care St, City, State 12345",
      emergencyContact: "+1 234-567-8998",
      emergencyContactName: "John Demilade",
      employeeId: "EMP-002",
      performance: 4.6,
      attendance: 96,
      lastEvaluation: "2024-01-10",
      notes:
        "Exceptional in high-pressure situations. Excellent triage skills.",

      // Additional Details
      personalInfo: {
        dateOfBirth: "1988-12-10",
        gender: "Female",
        bloodGroup: "A+",
        maritalStatus: "Married",
        nationality: "American",
      },
      education: [
        {
          degree: "BSN",
          institution: "Johns Hopkins University",
          year: "2014",
          specialization: "Nursing",
        },
      ],
      certifications: [
        "Registered Nurse (RN)",
        "Advanced Cardiac Life Support (ACLS)",
        "Pediatric Advanced Life Support (PALS)",
        "Trauma Nursing Core Course (TNCC)",
      ],
      languages: ["English", "Yoruba"],
      skills: [
        "Emergency Triage",
        "IV Therapy",
        "Patient Assessment",
        "Critical Care",
        "Team Coordination",
      ],
      workSchedule: {
        monday: "7:00 PM - 7:00 AM",
        tuesday: "Off",
        wednesday: "7:00 PM - 7:00 AM",
        thursday: "Off",
        friday: "7:00 PM - 7:00 AM",
        saturday: "Off",
        sunday: "7:00 PM - 7:00 AM",
      },
      benefits: {
        healthInsurance: true,
        dentalInsurance: true,
        retirementPlan: true,
        paidTimeOff: 20,
        sickDays: 10,
      },
    },
  ]);

  const departments = [
    "Cardiology",
    "Emergency",
    "Pharmacy",
    "Laboratory",
    "Security",
    "Administration",
    "Surgery",
    "Pediatrics",
    "Radiology",
    "ICU",
    "Oncology",
    "Neurology",
  ];

  const shifts = ["Morning", "Evening", "Night", "Rotating"];
  const statusOptions = ["Active", "On Leave", "Inactive", "Suspended"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Arabic",
    "Hindi",
    "Yoruba",
    "Igbo",
    "Hausa",
  ];

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      filterDepartment === "all" || member.department === filterDepartment;

    const matchesStatus =
      filterStatus === "all" || member.status.toLowerCase() === filterStatus;

    const matchesShift = filterShift === "all" || member.shift === filterShift;

    return matchesSearch && matchesDepartment && matchesStatus && matchesShift;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Inactive":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "On Leave":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Suspended":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getShiftColor = (shift) => {
    switch (shift) {
      case "Morning":
        return "bg-blue-100 text-blue-700";
      case "Evening":
        return "bg-orange-100 text-orange-700";
      case "Night":
        return "bg-purple-100 text-purple-700";
      case "Rotating":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPerformanceColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-yellow-600";
    if (rating >= 3.0) return "text-orange-600";
    return "text-red-600";
  };

  const staffStats = {
    totalStaff: staff.length,
    activeStaff: staff.filter((s) => s.status === "Active").length,
    onLeave: staff.filter((s) => s.status === "On Leave").length,
    totalSalary: staff.reduce((sum, s) => sum + s.salary, 0),
    avgPerformance: (
      staff.reduce((sum, s) => sum + s.performance, 0) / staff.length
    ).toFixed(1),
    avgAttendance: Math.round(
      staff.reduce((sum, s) => sum + s.attendance, 0) / staff.length
    ),
  };

  const handleViewDetails = (member) => {
    setSelectedStaff(member);
    setShowStaffModal(true);
  };

  const handleEditStaff = (member) => {
    setEditingStaff(JSON.parse(JSON.stringify(member))); // Deep copy
    setShowEditModal(true);
  };

  const handleSaveStaff = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedStaff = {
      ...editingStaff,
      name: formData.get("name"),
      role: formData.get("role"),
      department: formData.get("department"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      joiningDate: formData.get("joiningDate"),
      salary: parseFloat(formData.get("salary")),
      status: formData.get("status"),
      shift: formData.get("shift"),
      supervisor: formData.get("supervisor"),
      experience: formData.get("experience"),
      specialization: formData.get("specialization"),
      address: formData.get("address"),
      emergencyContact: formData.get("emergencyContact"),
      emergencyContactName: formData.get("emergencyContactName"),
      notes: formData.get("notes"),
      personalInfo: {
        dateOfBirth: formData.get("dateOfBirth"),
        gender: formData.get("gender"),
        bloodGroup: formData.get("bloodGroup"),
        maritalStatus: formData.get("maritalStatus"),
        nationality: formData.get("nationality"),
      },
    };

    setStaff((prev) =>
      prev.map((member) =>
        member.id === updatedStaff.id ? updatedStaff : member
      )
    );

    setShowEditModal(false);
    setEditingStaff(null);
    alert("Staff information updated successfully!");
  };

  const handleDeleteStaff = (memberId) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaff(staff.filter((member) => member.id !== memberId));
    }
  };

  const handleExportData = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Employee ID,Name,Role,Department,Status,Shift,Salary,Performance\n" +
      staff
        .map(
          (member) =>
            `${member.employeeId},${member.name},${member.role},${member.department},${member.status},${member.shift},${member.salary},${member.performance}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "staff_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStaff = {
      id: (staff.length + 1).toString(),
      name: formData.get("name"),
      role: formData.get("role"),
      department: formData.get("department"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      joiningDate: formData.get("joiningDate"),
      salary: parseFloat(formData.get("salary")),
      status: formData.get("status"),
      shift: formData.get("shift"),
      supervisor: formData.get("supervisor"),
      qualifications: [],
      experience: formData.get("experience"),
      specialization: formData.get("specialization"),
      address: formData.get("address"),
      emergencyContact: formData.get("emergencyContact"),
      emergencyContactName: formData.get("emergencyContactName"),
      employeeId: `EMP-${String(staff.length + 1).padStart(3, "0")}`,
      performance: 4.0,
      attendance: 95,
      lastEvaluation: new Date().toISOString().split("T")[0],
      notes: formData.get("notes"),
      personalInfo: {
        dateOfBirth: formData.get("dateOfBirth"),
        gender: formData.get("gender"),
        bloodGroup: formData.get("bloodGroup"),
        maritalStatus: formData.get("maritalStatus"),
        nationality: formData.get("nationality"),
      },
      education: [],
      certifications: [],
      languages: [],
      skills: [],
      workSchedule: {},
      benefits: {},
    };

    setStaff((prev) => [...prev, newStaff]);
    setShowAddModal(false);
    alert("Staff member added successfully!");
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterDepartment("all");
    setFilterStatus("all");
    setFilterShift("all");
  };

  // Staff Card Component
  const StaffCard = ({ member }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-blue-600 font-medium text-sm">{member.role}</p>
            <p className="text-sm text-gray-500">{member.department}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
              member.status
            )}`}
          >
            {member.status}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getShiftColor(
              member.shift
            )}`}
          >
            {member.shift}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Badge className="w-4 h-4 mr-2" />
          <span>{member.employeeId}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span className="truncate">{member.email}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-gray-500">Experience</p>
          <p className="font-medium text-gray-900">{member.experience}</p>
        </div>
        <div>
          <p className="text-gray-500">Salary</p>
          <p className="font-medium text-gray-900">
            ${member.salary.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star
              className={`w-4 h-4 ${getPerformanceColor(member.performance)}`}
            />
            <span
              className={`text-sm font-medium ml-1 ${getPerformanceColor(
                member.performance
              )}`}
            >
              {member.performance}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 ml-1">
              {member.attendance}%
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Joined</p>
          <p className="text-xs font-medium text-gray-900">
            {member.joiningDate}
          </p>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => handleViewDetails(member)}
          className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
        {user.role === "admin" && (
          <>
            <button
              onClick={() => handleEditStaff(member)}
              className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleDeleteStaff(member.id)}
              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">
            Manage hospital staff, performance, and payroll
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
          {user.role === "admin" && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Staff</span>
            </button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">
                {staffStats.totalStaff}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Staff</p>
              <p className="text-2xl font-bold text-green-600">
                {staffStats.activeStaff}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600">
                {staffStats.onLeave}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Performance
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {staffStats.avgPerformance}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Attendance
              </p>
              <p className="text-2xl font-bold text-blue-600">
                {staffStats.avgAttendance}%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Monthly Payroll
              </p>
              <p className="text-2xl font-bold text-green-600">
                ${Math.round(staffStats.totalSalary / 12).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search staff by name, role, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on leave">On Leave</option>
            <option value="suspended">Suspended</option>
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

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Extended Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift
              </label>
              <select
                value={filterShift}
                onChange={(e) => setFilterShift(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Shifts</option>
                {shifts.map((shift) => (
                  <option key={shift} value={shift}>
                    {shift}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Performance
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
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

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <StaffCard key={member.id} member={member} />
        ))}
      </div>

      {/* Empty State */}
      {filteredStaff.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No staff members found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={handleClearFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Department Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Department Overview
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {departments.map((dept) => {
              const deptStaff = staff.filter((s) => s.department === dept);
              const activeCount = deptStaff.filter(
                (s) => s.status === "Active"
              ).length;
              const avgSalary =
                deptStaff.length > 0
                  ? Math.round(
                      deptStaff.reduce((sum, s) => sum + s.salary, 0) /
                        deptStaff.length
                    )
                  : 0;

              return (
                <div
                  key={dept}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <h4 className="font-medium text-gray-900 mb-2">{dept}</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {deptStaff.length}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {activeCount} active
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    ${avgSalary.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Staff Detail Modal */}
      {showStaffModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Staff Details - {selectedStaff.name}
                </h3>
                <button
                  onClick={() => setShowStaffModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold text-2xl">
                      {selectedStaff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-center text-gray-900">
                    {selectedStaff.name}
                  </h4>
                  <p className="text-blue-600 text-center font-medium">
                    {selectedStaff.role}
                  </p>
                  <div className="mt-4 space-y-2">
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
                        selectedStaff.status
                      )}`}
                    >
                      {selectedStaff.status}
                    </span>
                    <span
                      className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getShiftColor(
                        selectedStaff.shift
                      )}`}
                    >
                      {selectedStaff.shift} Shift
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Employee ID
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedStaff.employeeId}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedStaff.department}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Experience
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedStaff.experience}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Specialization
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedStaff.specialization}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-900 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Information
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm font-medium">
                        {selectedStaff.phone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="text-sm font-medium">
                        {selectedStaff.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Address:</span>
                      <span className="text-sm font-medium text-right">
                        {selectedStaff.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-900 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Emergency Contact
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="text-sm font-medium">
                        {selectedStaff.emergencyContactName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Phone:</span>
                      <span className="text-sm font-medium">
                        {selectedStaff.emergencyContact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2" />
                  Personal Information
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">
                      Date of Birth
                    </label>
                    <p className="text-sm font-medium">
                      {selectedStaff.personalInfo?.dateOfBirth}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Gender
                    </label>
                    <p className="text-sm font-medium">
                      {selectedStaff.personalInfo?.gender}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Blood Group
                    </label>
                    <p className="text-sm font-medium">
                      {selectedStaff.personalInfo?.bloodGroup}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Marital Status
                    </label>
                    <p className="text-sm font-medium">
                      {selectedStaff.personalInfo?.maritalStatus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Qualifications & Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-900 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Qualifications & Certifications
                  </h5>
                  <div className="space-y-2">
                    {selectedStaff.qualifications?.map((qual, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Award className="w-4 h-4 text-green-500 mr-2" />
                        <span>{qual}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-semibold text-gray-900 flex items-center">
                    <Languages className="w-5 h-5 mr-2" />
                    Languages & Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedStaff.languages?.map((lang, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Performance Metrics
                </h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedStaff.performance}
                    </p>
                    <p className="text-sm text-gray-600">Performance Rating</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {selectedStaff.attendance}%
                    </p>
                    <p className="text-sm text-gray-600">Attendance</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">
                      ${selectedStaff.salary.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Annual Salary</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">
                      {selectedStaff.joiningDate}
                    </p>
                    <p className="text-sm text-gray-600">Joining Date</p>
                  </div>
                </div>
              </div>

              {selectedStaff.notes && (
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Additional Notes
                  </h5>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedStaff.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && editingStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Staff Member
                </h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleSaveStaff} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2" />
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={editingStaff.name}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role *
                      </label>
                      <input
                        type="text"
                        name="role"
                        defaultValue={editingStaff.role}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department *
                      </label>
                      <select
                        name="department"
                        defaultValue={editingStaff.department}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        value={editingStaff.employeeId}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        defaultValue={editingStaff.phone}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={editingStaff.email}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        defaultValue={editingStaff.address}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Employment Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status *
                      </label>
                      <select
                        name="status"
                        defaultValue={editingStaff.status}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shift *
                      </label>
                      <select
                        name="shift"
                        defaultValue={editingStaff.shift}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {shifts.map((shift) => (
                          <option key={shift} value={shift}>
                            {shift}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary *
                      </label>
                      <input
                        type="number"
                        name="salary"
                        defaultValue={editingStaff.salary}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Joining Date
                      </label>
                      <input
                        type="date"
                        name="joiningDate"
                        defaultValue={editingStaff.joiningDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Supervisor
                      </label>
                      <input
                        type="text"
                        name="supervisor"
                        defaultValue={editingStaff.supervisor}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experience
                      </label>
                      <input
                        type="text"
                        name="experience"
                        defaultValue={editingStaff.experience}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        defaultValue={editingStaff.specialization}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Personal Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        defaultValue={editingStaff.personalInfo?.dateOfBirth}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        name="gender"
                        defaultValue={editingStaff.personalInfo?.gender}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        defaultValue={editingStaff.personalInfo?.bloodGroup}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {bloodGroups.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Marital Status
                      </label>
                      <select
                        name="maritalStatus"
                        defaultValue={editingStaff.personalInfo?.maritalStatus}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {maritalStatusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        defaultValue={editingStaff.personalInfo?.nationality}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Emergency Contact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Name
                      </label>
                      <input
                        type="text"
                        name="emergencyContactName"
                        defaultValue={editingStaff.emergencyContactName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="emergencyContact"
                        defaultValue={editingStaff.emergencyContact}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    defaultValue={editingStaff.notes}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Additional notes about the staff member..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add New Staff Member
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
              <form onSubmit={handleAddStaff} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role *
                      </label>
                      <input
                        type="text"
                        name="role"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department *
                      </label>
                      <select
                        name="department"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Salary *
                      </label>
                      <input
                        type="number"
                        name="salary"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Staff
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

export default StaffManagement;
