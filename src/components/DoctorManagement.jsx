import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Stethoscope,
  Star,
  Calendar,
  Clock,
  Mail,
  Phone,
  MapPin,
  Edit,
  Eye,
  MoreVertical,
  Download,
  ChevronDown,
  X,
  User,
  Award,
  TrendingUp,
  Users,
  FileText,
  MessageCircle,
  Video,
} from "lucide-react";

const DoctorManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedDoctorForActions, setSelectedDoctorForActions] =
    useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  // Move the function to the top to avoid reference errors
  const getAvailabilityStatus = (doctor) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const currentTime = new Date().getHours() * 100 + new Date().getMinutes();

    const todaySchedule = doctor.availability.find(
      (schedule) => schedule.day === today
    );

    if (!todaySchedule || !todaySchedule.isAvailable) {
      return {
        status: "Not Available",
        color: "bg-red-100 text-red-700 border-red-200",
      };
    }

    const startTime = parseInt(todaySchedule.startTime.replace(":", ""));
    const endTime = parseInt(todaySchedule.endTime.replace(":", ""));

    if (currentTime >= startTime && currentTime <= endTime) {
      return {
        status: "Available Now",
        color: "bg-green-100 text-green-700 border-green-200",
      };
    } else {
      return {
        status: "Off Duty",
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      };
    }
  };

  const [doctors, setDoctors] = useState([
    {
      id: "1",
      name: "Dr. Michael Adamson",
      specialization: "Cardiology",
      department: "Cardiology",
      phone: "+1 234-567-8915",
      email: "michael.adamson@hospital.com",
      office: "Room 301, Floor 3",
      qualifications: ["MD", "FACC", "Board Certified Cardiologist"],
      experience: 15,
      education: "Harvard Medical School",
      languages: ["English", "Spanish"],
      bio: "Senior cardiologist with 15 years of experience in interventional cardiology and heart disease prevention.",
      consultationFee: 200,
      rating: 4.8,
      totalReviews: 124,
      patientsThisMonth: 45,
      availability: [
        {
          day: "Monday",
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: true,
        },
        {
          day: "Tuesday",
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: true,
        },
        {
          day: "Wednesday",
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: true,
        },
        {
          day: "Thursday",
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: true,
        },
        {
          day: "Friday",
          startTime: "09:00",
          endTime: "15:00",
          isAvailable: true,
        },
        { day: "Saturday", startTime: "", endTime: "", isAvailable: false },
        { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
      ],
      upcomingAppointments: 12,
      status: "active",
      joinDate: "2018-03-15",
      performance: {
        satisfaction: 95,
        onTimeRate: 88,
        patientRetention: 92,
      },
    },
    {
      id: "2",
      name: "Dr. Sarah Johnson",
      specialization: "Obstetrics & Gynecology",
      department: "Women's Health",
      phone: "+1 234-567-8911",
      email: "sarah.johnson@hospital.com",
      office: "Room 205, Floor 2",
      qualifications: ["MD", "FACOG", "Board Certified OB/GYN"],
      experience: 12,
      education: "Johns Hopkins University",
      languages: ["English", "French"],
      bio: "Dedicated OB/GYN with expertise in high-risk pregnancies and minimally invasive surgeries.",
      consultationFee: 180,
      rating: 4.9,
      totalReviews: 98,
      patientsThisMonth: 52,
      availability: [
        {
          day: "Monday",
          startTime: "08:00",
          endTime: "16:00",
          isAvailable: true,
        },
        {
          day: "Tuesday",
          startTime: "08:00",
          endTime: "16:00",
          isAvailable: true,
        },
        {
          day: "Wednesday",
          startTime: "10:00",
          endTime: "18:00",
          isAvailable: true,
        },
        {
          day: "Thursday",
          startTime: "08:00",
          endTime: "16:00",
          isAvailable: true,
        },
        {
          day: "Friday",
          startTime: "08:00",
          endTime: "14:00",
          isAvailable: true,
        },
        {
          day: "Saturday",
          startTime: "09:00",
          endTime: "12:00",
          isAvailable: true,
        },
        { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
      ],
      upcomingAppointments: 18,
      status: "active",
      joinDate: "2019-07-22",
      performance: {
        satisfaction: 98,
        onTimeRate: 92,
        patientRetention: 95,
      },
    },
    {
      id: "3",
      name: "Dr. James Odion",
      specialization: "Emergency Medicine",
      department: "Emergency",
      phone: "+1 234-567-8912",
      email: "james.odion@hospital.com",
      office: "ER Station 3",
      qualifications: ["MD", "FACEP", "Board Certified Emergency Medicine"],
      experience: 8,
      education: "Mayo Medical School",
      languages: ["English", "Portuguese"],
      bio: "Emergency medicine specialist with trauma care expertise and disaster response training.",
      consultationFee: 150,
      rating: 4.7,
      totalReviews: 67,
      patientsThisMonth: 38,
      availability: [
        {
          day: "Monday",
          startTime: "00:00",
          endTime: "08:00",
          isAvailable: true,
        },
        {
          day: "Tuesday",
          startTime: "16:00",
          endTime: "00:00",
          isAvailable: true,
        },
        {
          day: "Wednesday",
          startTime: "08:00",
          endTime: "16:00",
          isAvailable: true,
        },
        {
          day: "Thursday",
          startTime: "00:00",
          endTime: "08:00",
          isAvailable: true,
        },
        {
          day: "Friday",
          startTime: "16:00",
          endTime: "00:00",
          isAvailable: true,
        },
        { day: "Saturday", startTime: "", endTime: "", isAvailable: false },
        { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
      ],
      upcomingAppointments: 8,
      status: "active",
      joinDate: "2020-11-10",
      performance: {
        satisfaction: 91,
        onTimeRate: 85,
        patientRetention: 88,
      },
    },
    {
      id: "4",
      name: "Dr. Maria Rodriguez",
      specialization: "Pediatrics",
      department: "Pediatrics",
      phone: "+1 234-567-8913",
      email: "maria.rodriguez@hospital.com",
      office: "Room 102, Floor 1",
      qualifications: ["MD", "FAAP", "Board Certified Pediatrician"],
      experience: 10,
      education: "Stanford University",
      languages: ["English", "Spanish", "Italian"],
      bio: "Pediatric specialist focused on child development and preventive care for all age groups.",
      consultationFee: 160,
      rating: 4.9,
      totalReviews: 156,
      patientsThisMonth: 68,
      availability: [
        {
          day: "Monday",
          startTime: "08:30",
          endTime: "17:30",
          isAvailable: true,
        },
        {
          day: "Tuesday",
          startTime: "08:30",
          endTime: "17:30",
          isAvailable: true,
        },
        {
          day: "Wednesday",
          startTime: "09:00",
          endTime: "18:00",
          isAvailable: true,
        },
        {
          day: "Thursday",
          startTime: "08:30",
          endTime: "17:30",
          isAvailable: true,
        },
        {
          day: "Friday",
          startTime: "08:30",
          endTime: "16:00",
          isAvailable: true,
        },
        {
          day: "Saturday",
          startTime: "09:00",
          endTime: "13:00",
          isAvailable: true,
        },
        { day: "Sunday", startTime: "", endTime: "", isAvailable: false },
      ],
      upcomingAppointments: 22,
      status: "active",
      joinDate: "2017-05-18",
      performance: {
        satisfaction: 97,
        onTimeRate: 90,
        patientRetention: 94,
      },
    },
  ]);

  const specializations = [
    "All",
    "Cardiology",
    "Obstetrics & Gynecology",
    "Emergency Medicine",
    "Pediatrics",
    "Neurology",
    "Orthopedics",
  ];
  const departments = [
    "All",
    "Cardiology",
    "Women's Health",
    "Emergency",
    "Pediatrics",
    "Surgery",
    "Internal Medicine",
  ];
  const availabilityOptions = [
    "All",
    "Available Now",
    "Off Duty",
    "Not Available",
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialization =
      filterSpecialization === "all" ||
      doctor.specialization === filterSpecialization;
    const matchesDepartment =
      filterDepartment === "all" || doctor.department === filterDepartment;

    const availabilityStatus = getAvailabilityStatus(doctor).status;
    const matchesAvailability =
      filterAvailability === "all" || availabilityStatus === filterAvailability;

    return (
      matchesSearch &&
      matchesSpecialization &&
      matchesDepartment &&
      matchesAvailability
    );
  });

  const doctorStats = {
    totalDoctors: doctors.length,
    availableNow: doctors.filter(
      (d) => getAvailabilityStatus(d).status === "Available Now"
    ).length,
    specializations: new Set(doctors.map((d) => d.specialization)).size,
    avgExperience: Math.round(
      doctors.reduce((sum, d) => sum + d.experience, 0) / doctors.length
    ),
    totalPatientsThisMonth: doctors.reduce(
      (sum, d) => sum + d.patientsThisMonth,
      0
    ),
    avgRating: (
      doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length
    ).toFixed(1),
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setModalMode("add");
    setShowDoctorModal(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setModalMode("edit");
    setShowDoctorModal(true);
  };

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setModalMode("view");
    setShowDoctorModal(true);
  };

  const exportDoctorData = (doctor, format = "json") => {
    let content, filename, mimeType;

    if (format === "csv") {
      const headers = [
        "Name",
        "Specialization",
        "Department",
        "Phone",
        "Email",
        "Experience",
        "Rating",
        "Status",
      ];
      const data = [
        doctor.name,
        doctor.specialization,
        doctor.department,
        doctor.phone,
        doctor.email,
        doctor.experience,
        doctor.rating,
        getAvailabilityStatus(doctor).status,
      ];
      content = [headers, data].map((row) => row.join(",")).join("\n");
      filename = `doctor_${doctor.id}_data.csv`;
      mimeType = "text/csv";
    } else {
      content = JSON.stringify(doctor, null, 2);
      filename = `doctor_${doctor.id}_data.json`;
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

  const generateScheduleReport = () => {
    const reportContent = `
DOCTOR SCHEDULE REPORT
Generated: ${new Date().toLocaleDateString()}

WEEKLY SCHEDULE OVERVIEW:
${doctors
  .map(
    (doctor) => `
${doctor.name} - ${doctor.specialization}
${doctor.availability
  .map(
    (schedule) =>
      `${schedule.day}: ${
        schedule.isAvailable
          ? `${schedule.startTime} - ${schedule.endTime}`
          : "Not Available"
      }`
  )
  .join("\n")}
`
  )
  .join("\n\n")}

TOTAL DOCTORS: ${doctors.length}
AVAILABLE TODAY: ${
      doctors.filter((d) => getAvailabilityStatus(d).status === "Available Now")
        .length
    }
    `;

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `doctor_schedule_report_${
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
            Doctor Management
          </h1>
          <p className="text-gray-600">
            Manage doctors, schedules, and appointments
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={generateScheduleReport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              List
            </button>
          </div>
          {user.role === "admin" && (
            <button
              onClick={handleAddDoctor}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Doctor</span>
            </button>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">
                {doctorStats.totalDoctors}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Now</p>
              <p className="text-2xl font-bold text-green-600">
                {doctorStats.availableNow}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Specializations
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {doctorStats.specializations}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Experience
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {doctorStats.avgExperience}
                <span className="text-sm text-gray-500"> yrs</span>
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-indigo-600">
                {doctorStats.totalPatientsThisMonth}
              </p>
            </div>
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-600">
                {doctorStats.avgRating}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
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
              placeholder="Search doctors by name, specialization, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Specializations</option>
            {specializations.slice(1).map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.slice(1).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Availability</option>
            {availabilityOptions.slice(1).map((avail) => (
              <option key={avail} value={avail}>
                {avail}
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
                Experience Range
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
                Rating
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="all">All Ratings</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
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

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Schedule Management</span>
            </button>
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FileText className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Performance Reports</span>
            </button>
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Users className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">Team Coordination</span>
            </button>
            <button className="flex items-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Video className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Telemedicine Setup</span>
            </button>
          </div>
        </div>
      </div>

      {/* Doctors Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => {
            const availability = getAvailabilityStatus(doctor);

            return (
              <div
                key={doctor.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {doctor.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {doctor.specialization}
                        </p>
                        <p className="text-sm text-gray-500">
                          {doctor.department}
                        </p>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${availability.color}`}
                  >
                    {availability.status}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(doctor.rating)}
                    <span className="text-sm font-medium text-gray-600 ml-1">
                      {doctor.rating} ({doctor.totalReviews})
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {doctor.experience} years exp.
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{doctor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.office}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Today's Schedule:
                  </h4>
                  {(() => {
                    const today = new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                    });
                    const todaySchedule = doctor.availability.find(
                      (schedule) => schedule.day === today
                    );

                    if (!todaySchedule || !todaySchedule.isAvailable) {
                      return (
                        <p className="text-sm text-red-600">
                          Not available today
                        </p>
                      );
                    }

                    return (
                      <p className="text-sm text-gray-600">
                        {todaySchedule.startTime} - {todaySchedule.endTime}
                      </p>
                    );
                  })()}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">
                      {doctor.upcomingAppointments}
                    </p>
                    <p className="text-xs text-gray-500">Appointments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">
                      {doctor.patientsThisMonth}
                    </p>
                    <p className="text-xs text-gray-500">This Month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">
                      ${doctor.consultationFee}
                    </p>
                    <p className="text-xs text-gray-500">Consultation</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewDoctor(doctor)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    View Profile
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                    Book Appointment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Doctors List
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => {
                  const availability = getAvailabilityStatus(doctor);

                  return (
                    <tr key={doctor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {doctor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {doctor.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {doctor.department}
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                              {renderStars(doctor.rating)}
                              <span className="text-xs text-gray-500">
                                ({doctor.totalReviews})
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {doctor.specialization}
                        </p>
                        <p className="text-sm text-gray-500">
                          {doctor.experience} years experience
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{doctor.phone}</p>
                        <p className="text-sm text-gray-500">{doctor.email}</p>
                        <p className="text-xs text-gray-400">{doctor.office}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Satisfaction:</span>
                            <span className="font-medium">
                              {doctor.performance.satisfaction}%
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>On Time:</span>
                            <span className="font-medium">
                              {doctor.performance.onTimeRate}%
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Retention:</span>
                            <span className="font-medium">
                              {doctor.performance.patientRetention}%
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${availability.color}`}
                        >
                          {availability.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {doctor.upcomingAppointments} upcoming appointments
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewDoctor(doctor)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {(user.role === "admin" ||
                            user.role === "doctor") && (
                            <button
                              onClick={() => handleEditDoctor(doctor)}
                              className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50"
                              title="Edit Doctor"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50"
                            title="Send Message"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>

                          {/* More Actions Dropdown */}
                          <div className="relative">
                            <button
                              onClick={() =>
                                setSelectedDoctorForActions(
                                  selectedDoctorForActions === doctor.id
                                    ? null
                                    : doctor.id
                                )
                              }
                              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50"
                              title="More Actions"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {selectedDoctorForActions === doctor.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <div className="py-1">
                                  <button
                                    onClick={() =>
                                      exportDoctorData(doctor, "csv")
                                    }
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    <Download className="w-4 h-4" />
                                    <span>Export Data</span>
                                  </button>
                                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">
                                    <Calendar className="w-4 h-4" />
                                    <span>View Schedule</span>
                                  </button>
                                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50">
                                    <FileText className="w-4 h-4" />
                                    <span>Performance Report</span>
                                  </button>
                                  {user.role === "admin" && (
                                    <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                      <X className="w-4 h-4" />
                                      <span>Deactivate</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Weekly Schedule Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Weekly Schedule Overview
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View Full Schedule
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-8 gap-4 text-sm min-w-max">
              <div className="font-medium text-gray-700">Doctor</div>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="font-medium text-gray-700 text-center"
                >
                  {day}
                </div>
              ))}

              {filteredDoctors.map((doctor) => (
                <React.Fragment key={doctor.id}>
                  <div className="font-medium text-gray-900 py-2">
                    <div className="text-sm">
                      {doctor.name.replace("Dr. ", "")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {doctor.specialization}
                    </div>
                  </div>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => {
                    const schedule = doctor.availability.find(
                      (s) => s.day === day
                    );
                    return (
                      <div key={day} className="text-center py-2">
                        {schedule && schedule.isAvailable ? (
                          <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200">
                            {schedule.startTime}-{schedule.endTime}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                            Off
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredDoctors.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Stethoscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No doctors found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search criteria or filters
          </p>
          {user.role === "admin" && (
            <button
              onClick={handleAddDoctor}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Add New Doctor
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;
