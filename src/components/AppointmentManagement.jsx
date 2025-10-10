import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Search,
  Plus,
  Filter,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  MapPin,
  Stethoscope,
  AlertTriangle,
  Video,
  Phone,
  MoreVertical,
  Download,
  Share2,
  Bell,
  User,
  ChevronDown,
  BarChart3,
} from "lucide-react";

// Enhanced mock data with more realistic information
const initialAppointments = [
  {
    id: "1",
    patientId: "1",
    patientName: "John Alexandre",
    patientAvatar: "JA",
    patientAge: 45,
    patientGender: "Male",
    doctorId: "2",
    doctorName: "Dr. Ogundipe Sunday",
    doctorSpecialty: "Cardiology",
    department: "Cardiology",
    date: "2024-01-25",
    time: "09:00",
    duration: 30,
    type: "Consultation",
    status: "Scheduled",
    priority: "Routine",
    symptoms: "Chest pain, shortness of breath",
    notes: "Follow-up for cardiac evaluation",
    room: "Room 201",
    videoLink: "https://meet.healthcare.com/john-alexandre",
    previousVisits: 3,
    insurance: "Blue Cross",
    createdAt: "2024-01-20",
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Micheal Johnson",
    patientAvatar: "MJ",
    patientAge: 28,
    patientGender: "Male",
    doctorId: "3",
    doctorName: "Dr. Sarah Akinsanya",
    doctorSpecialty: "Obstetrics",
    department: "Maternity",
    date: "2024-01-25",
    time: "10:30",
    duration: 45,
    type: "Follow-up",
    status: "In Progress",
    priority: "High",
    symptoms: "Prenatal checkup - 32 weeks",
    notes: "Regular pregnancy monitoring, ultrasound scheduled",
    room: "Room 105",
    videoLink: "",
    previousVisits: 5,
    insurance: "Aetna",
    createdAt: "2024-01-18",
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Robert Alumiasunya",
    patientAvatar: "RA",
    patientAge: 62,
    patientGender: "Male",
    doctorId: "2",
    doctorName: "Dr. Boniface Okafor",
    doctorSpecialty: "Cardiology",
    department: "Emergency",
    date: "2024-01-25",
    time: "14:00",
    duration: 60,
    type: "Emergency",
    status: "Completed",
    priority: "Critical",
    symptoms: "Severe chest pain, dizziness",
    notes: "Emergency cardiac consultation completed, prescribed medication",
    room: "ER-2",
    videoLink: "",
    previousVisits: 1,
    insurance: "Medicare",
    createdAt: "2024-01-25",
  },
  {
    id: "4",
    patientId: "4",
    patientName: "Dupeoluwa Adebayo",
    patientAvatar: "DA",
    patientAge: 52,
    patientGender: "Female",
    doctorId: "4",
    doctorName: "Dr. Michael Adedimeji",
    doctorSpecialty: "Surgery",
    department: "Surgery",
    date: "2024-01-26",
    time: "11:00",
    duration: 120,
    type: "Surgery",
    status: "Scheduled",
    priority: "High",
    symptoms: "Cardiac surgery preparation - CABG",
    notes: "Pre-operative consultation and clearance",
    room: "OR-3",
    videoLink: "",
    previousVisits: 2,
    insurance: "United Healthcare",
    createdAt: "2024-01-22",
  },
];

const AppointmentManagement = ({ user }) => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterDuration, setFilterDuration] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "Male",
    doctorName: "",
    doctorSpecialty: "",
    department: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    duration: "30",
    type: "Consultation",
    status: "Scheduled",
    priority: "Routine",
    symptoms: "",
    notes: "",
    room: "",
    videoLink: "https://meet.healthcare.com/",
  });

  // Statistics calculation
  const appointmentStats = useMemo(
    () => ({
      total: appointments.length,
      scheduled: appointments.filter((a) => a.status === "Scheduled").length,
      inProgress: appointments.filter((a) => a.status === "In Progress").length,
      completed: appointments.filter((a) => a.status === "Completed").length,
      cancelled: appointments.filter((a) => a.status === "Cancelled").length,
      today: appointments.filter(
        (a) => a.date === new Date().toISOString().split("T")[0]
      ).length,
    }),
    [appointments]
  );

  // Departments for filtering
  const departments = useMemo(
    () => [...new Set(appointments.map((app) => app.department))],
    [appointments]
  );

  // Enhanced filtering
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesSearch =
        searchTerm === "" ||
        appointment.patientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.doctorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDate = appointment.date === selectedDate;
      const matchesStatus =
        filterStatus === "all" || appointment.status === filterStatus;
      const matchesDepartment =
        filterDepartment === "all" ||
        appointment.department === filterDepartment;
      const matchesPriority =
        filterPriority === "all" || appointment.priority === filterPriority;
      const matchesType =
        filterType === "all" || appointment.type === filterType;
      const matchesDuration =
        filterDuration === "all" ||
        (filterDuration === "30" && parseInt(appointment.duration) <= 30) ||
        (filterDuration === "45" && parseInt(appointment.duration) <= 45) ||
        (filterDuration === "60" && parseInt(appointment.duration) <= 60) ||
        (filterDuration === "120" && parseInt(appointment.duration) >= 120);

      return (
        matchesSearch &&
        matchesDate &&
        matchesStatus &&
        matchesDepartment &&
        matchesPriority &&
        matchesType &&
        matchesDuration
      );
    });
  }, [
    appointments,
    searchTerm,
    selectedDate,
    filterStatus,
    filterDepartment,
    filterPriority,
    filterType,
    filterDuration,
  ]);

  // Status and type styling functions
  const getStatusColor = (status) => {
    const colors = {
      Scheduled: "bg-blue-100 text-blue-700 border-blue-200",
      "In Progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
      Completed: "bg-green-100 text-green-700 border-green-200",
      Cancelled: "bg-red-100 text-red-700 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getTypeColor = (type) => {
    const colors = {
      Consultation: "bg-blue-50 text-blue-600 border-blue-200",
      "Follow-up": "bg-green-50 text-green-600 border-green-200",
      Emergency: "bg-red-50 text-red-600 border-red-200",
      Surgery: "bg-purple-50 text-purple-600 border-purple-200",
    };
    return colors[type] || "bg-gray-50 text-gray-600 border-gray-200";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      Routine: "bg-gray-100 text-gray-700",
      High: "bg-orange-100 text-orange-700",
      Critical: "bg-red-100 text-red-700",
    };
    return colors[priority] || "bg-gray-100 text-gray-700";
  };

  // Action handlers
  const handleStartAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, status: "In Progress" } : app
      )
    );
  };

  const handleCompleteAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, status: "Completed" } : app
      )
    );
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, status: "Cancelled" } : app
      )
    );
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleNewAppointment = () => {
    setShowNewAppointmentModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateAppointment = () => {
    const newAppointmentData = {
      ...newAppointment,
      id: (appointments.length + 1).toString(),
      patientId: (appointments.length + 1).toString(),
      patientAvatar: newAppointment.patientName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      doctorId: (appointments.length + 2).toString(),
      previousVisits: 0,
      insurance: "Unknown",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setAppointments((prev) => [...prev, newAppointmentData]);
    setShowNewAppointmentModal(false);
    setNewAppointment({
      patientName: "",
      patientAge: "",
      patientGender: "Male",
      doctorName: "",
      doctorSpecialty: "",
      department: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      duration: "30",
      type: "Consultation",
      status: "Scheduled",
      priority: "Routine",
      symptoms: "",
      notes: "",
      room: "",
      videoLink: "",
    });
  };

  const handleExport = () => {
    alert("Exporting appointments data...");
    // In a real app, this would generate and download a CSV/PDF file
  };

  const handleShare = () => {
    alert("Sharing appointments data...");
    // In a real app, this would open a sharing dialog
  };

  const handleJoinCall = (videoLink) => {
    window.open(videoLink, "_blank");
  };

  const handleRemind = (appointmentId) => {
    alert(`Reminder sent for appointment #${appointmentId}`);
    // In a real app, this would send a notification to the patient
  };

  // Enhanced statistics cards with more details
  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div
          className={`w-12 h-12 ${
            color.replace("text", "bg").split("-")[0] === "text"
              ? "bg-blue-500"
              : `bg-${color.split("-")[1]}-500`
          } rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // Appointment card component for better reusability
  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600">
              {appointment.patientAvatar}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {appointment.patientName}
            </h4>
            <p className="text-sm text-gray-600">
              {appointment.patientAge} yrs • {appointment.patientGender}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
              appointment.status
            )}`}
          >
            {appointment.status}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
              appointment.priority
            )}`}
          >
            {appointment.priority}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Stethoscope className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{appointment.doctorName}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              {appointment.department} • {appointment.room}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="font-medium">{appointment.time}</span>
            <span className="text-gray-600">({appointment.duration} min)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span
              className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(
                appointment.type
              )}`}
            >
              {appointment.type}
            </span>
          </div>
        </div>
      </div>

      {appointment.symptoms && (
        <div className="mb-3 p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">
              Symptoms
            </span>
          </div>
          <p className="text-sm text-orange-600">{appointment.symptoms}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          {appointment.videoLink && (
            <button
              onClick={() => handleJoinCall(appointment.videoLink)}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
            >
              <Video className="w-4 h-4" />
              <span>Join Call</span>
            </button>
          )}
          <button
            onClick={() => handleRemind(appointment.id)}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            <Bell className="w-4 h-4" />
            <span>Remind</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewDetails(appointment)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          {(user.role === "admin" ||
            user.role === "doctor" ||
            user.role === "nurse") && (
            <>
              {appointment.status === "Scheduled" && (
                <button
                  onClick={() => handleStartAppointment(appointment.id)}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Start
                </button>
              )}
              {appointment.status === "In Progress" && (
                <button
                  onClick={() => handleCompleteAppointment(appointment.id)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Complete
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Appointment Management
          </h1>
          <p className="text-gray-600">
            Manage patient appointments, schedules, and consultations
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
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          {(user?.role === "admin" ||
            user?.role === "doctor" ||
            user?.role === "nurse") && (
            <button
              onClick={handleNewAppointment}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Appointment</span>
            </button>
          )}
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total"
          value={appointmentStats.total}
          icon={BarChart3}
          color="text-gray-900"
          subtitle="All appointments"
        />
        <StatCard
          title="Today"
          value={appointmentStats.today}
          icon={Calendar}
          color="text-blue-600"
          subtitle="Scheduled today"
        />
        <StatCard
          title="Scheduled"
          value={appointmentStats.scheduled}
          icon={Clock}
          color="text-blue-600"
        />
        <StatCard
          title="In Progress"
          value={appointmentStats.inProgress}
          icon={User}
          color="text-yellow-600"
        />
        <StatCard
          title="Completed"
          value={appointmentStats.completed}
          icon={CheckCircle}
          color="text-green-600"
        />
        <StatCard
          title="Cancelled"
          value={appointmentStats.cancelled}
          icon={XCircle}
          color="text-red-600"
        />
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients, doctors, departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
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
          </div>

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
                Priority
              </label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                <option value="Routine">Routine</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
                <option value="Surgery">Surgery</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={filterDuration}
                onChange={(e) => setFilterDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Any Duration</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="120">120+ minutes</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {filteredAppointments.length} Appointments for{" "}
          {new Date(selectedDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              viewMode === "calendar"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredAppointments.length === 0 ? (
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500 mb-6">
              No appointments match your current filters. Try adjusting your
              search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
                setFilterDepartment("all");
                setFilterPriority("all");
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        )}
      </div>

      {/* Appointment Detail Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Appointment Details
                </h3>
                <button
                  onClick={() => setShowAppointmentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-blue-600">
                    {selectedAppointment.patientAvatar}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    {selectedAppointment.patientName}
                  </h4>
                  <p className="text-gray-600">
                    {selectedAppointment.patientAge} years •{" "}
                    {selectedAppointment.patientGender}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        selectedAppointment.status
                      )}`}
                    >
                      {selectedAppointment.status}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                        selectedAppointment.priority
                      )}`}
                    >
                      {selectedAppointment.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-2">
                    Appointment Info
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(
                            selectedAppointment.date
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedAppointment.time} (
                          {selectedAppointment.duration} min)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedAppointment.room}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedAppointment.department}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Stethoscope className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedAppointment.doctorName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedAppointment.doctorSpecialty}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-500 mb-2">
                    Medical Details
                  </h5>
                  <div className="space-y-4">
                    {selectedAppointment.symptoms && (
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium text-orange-700">
                            Symptoms
                          </span>
                        </div>
                        <p className="text-sm text-orange-600">
                          {selectedAppointment.symptoms}
                        </p>
                      </div>
                    )}

                    {selectedAppointment.notes && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h6 className="text-sm font-medium text-blue-700 mb-1">
                          Notes
                        </h6>
                        <p className="text-sm text-blue-600">
                          {selectedAppointment.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-xs text-gray-500">Previous Visits</p>
                        <p className="font-medium">
                          {selectedAppointment.previousVisits}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Insurance</p>
                        <p className="font-medium">
                          {selectedAppointment.insurance}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 flex justify-between">
                <div className="flex space-x-2">
                  {selectedAppointment.videoLink && (
                    <button
                      onClick={() =>
                        handleJoinCall(selectedAppointment.videoLink)
                      }
                      className="flex items-center space-x-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Video Call</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleRemind(selectedAppointment.id)}
                    className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Send Reminder</span>
                  </button>
                </div>

                {(user?.role === "admin" ||
                  user?.role === "doctor" ||
                  user?.role === "nurse") && (
                  <div className="flex space-x-2">
                    {selectedAppointment.status === "Scheduled" && (
                      <button
                        onClick={() => {
                          handleStartAppointment(selectedAppointment.id);
                          setShowAppointmentModal(false);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Start Appointment
                      </button>
                    )}
                    {selectedAppointment.status === "In Progress" && (
                      <button
                        onClick={() => {
                          handleCompleteAppointment(selectedAppointment.id);
                          setShowAppointmentModal(false);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Complete Appointment
                      </button>
                    )}
                    {(selectedAppointment.status === "Scheduled" ||
                      selectedAppointment.status === "In Progress") && (
                      <button
                        onClick={() => {
                          handleCancelAppointment(selectedAppointment.id);
                          setShowAppointmentModal(false);
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Create New Appointment
                </h3>
                <button
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">
                    Patient Information
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={newAppointment.patientName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="patientAge"
                      value={newAppointment.patientAge}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      name="patientGender"
                      value={newAppointment.patientGender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">
                    Doctor Information
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      name="doctorName"
                      value={newAppointment.doctorName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialty
                    </label>
                    <input
                      type="text"
                      name="doctorSpecialty"
                      value={newAppointment.doctorSpecialty}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={newAppointment.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">
                    Appointment Details
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={newAppointment.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={newAppointment.time}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes)
                    </label>
                    <select
                      name="duration"
                      value={newAppointment.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="120">120 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room
                    </label>
                    <input
                      type="text"
                      name="room"
                      value={newAppointment.room}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">
                    Additional Information
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      name="type"
                      value={newAppointment.type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Consultation">Consultation</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Surgery">Surgery</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={newAppointment.priority}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Routine">Routine</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Video Link (optional)
                    </label>
                    <input
                      type="text"
                      name="videoLink"
                      value={newAppointment.videoLink}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://meet.example.com/..."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Symptoms
                  </label>
                  <textarea
                    name="symptoms"
                    value={newAppointment.symptoms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowNewAppointmentModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAppointment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  disabled={
                    !newAppointment.patientName ||
                    !newAppointment.doctorName ||
                    !newAppointment.date ||
                    !newAppointment.time
                  }
                >
                  Create Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;
