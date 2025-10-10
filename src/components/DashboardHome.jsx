import React from "react";
// import { toast } from "../utils/toast";
import {
  Users,
  Calendar,
  CreditCard,
  TrendingUp,
  Activity,
  Heart,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const DashboardHome = ({ user }) => {
  const getStats = () => {
    const baseStats = [
      {
        label: "Total Patients",
        value: "2,847",
        change: "+12%",
        icon: Users,
        color: "bg-blue-500",
      },
      {
        label: "Today's Appointments",
        value: "127",
        change: "+8%",
        icon: Calendar,
        color: "bg-green-500",
      },
      {
        label: "Revenue This Month",
        value: "$124K",
        change: "+15%",
        icon: CreditCard,
        color: "bg-purple-500",
      },
      {
        label: "Bed Occupancy",
        value: "89%",
        change: "+3%",
        icon: Activity,
        color: "bg-orange-500",
      },
    ];

    if (user.role === "doctor") {
      return [
        {
          label: "My Patients",
          value: "45",
          change: "+2%",
          icon: Users,
          color: "bg-blue-500",
        },
        {
          label: "Today's Appointments",
          value: "12",
          change: "+1%",
          icon: Calendar,
          color: "bg-green-500",
        },
        {
          label: "Surgeries This Week",
          value: "8",
          change: "+25%",
          icon: Activity,
          color: "bg-red-500",
        },
        {
          label: "Patient Rating",
          value: "4.9",
          change: "+0.1",
          icon: Heart,
          color: "bg-pink-500",
        },
      ];
    }

    if (user.role === "nurse") {
      return [
        {
          label: "Assigned Patients",
          value: "23",
          change: "+1%",
          icon: Users,
          color: "bg-blue-500",
        },
        {
          label: "Medications Due",
          value: "8",
          change: "-2",
          icon: AlertTriangle,
          color: "bg-yellow-500",
        },
        {
          label: "Tasks Completed",
          value: "34/38",
          change: "+89%",
          icon: CheckCircle,
          color: "bg-green-500",
        },
        {
          label: "Critical Alerts",
          value: "2",
          change: "-1",
          icon: Activity,
          color: "bg-red-500",
        },
      ];
    }

    return baseStats;
  };

  const handleAddPatient = () => {
    toast({
      title: "Add Patient",
      description: "Opening patient registration form...",
    });

    console.log("Add Patient clicked");

  };

  const handleSchedule = () => {
    toast({
      title: "Schedule Appointment",
      description: "Opening appointment scheduler...",
    });

    console.log("Schedule clicked");
  };

  const handleCreateBill = () => {
    toast({
      title: "Create Bill",
      description: "Opening billing interface...",
    });

    console.log("Create Bill clicked");

  };

  const handleViewReports = () => {
    toast({
      title: "View Reports",
      description: "Loading reports dashboard...",
    });
  
    console.log("View Reports clicked");
  };

 
  const handleStatClick = (statLabel) => {
    toast({
      title: "Detailed View",
      description: `Loading detailed ${statLabel.toLowerCase()} information...`,
    });
    console.log(`Stat clicked: ${statLabel}`);
  };

  const stats = getStats();

  const recentActivities = [
    {
      type: "appointment",
      message: "New appointment scheduled for John christ",
      time: "5 min ago",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      type: "patient",
      message: "Patient Sarah Johnson discharged",
      time: "15 min ago",
      icon: Users,
      color: "text-green-500",
    },
    {
      type: "billing",
      message: "Payment received from Michael Brown",
      time: "23 min ago",
      icon: CreditCard,
      color: "text-purple-500",
    },
    {
      type: "alert",
      message: "ICU bed availability low",
      time: "1 hour ago",
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
        <p className="opacity-90">
          {user.role === "admin" &&
            "Here's what's happening at the hospital today."}
          {user.role === "doctor" &&
            "You have 12 appointments scheduled for today."}
          {user.role === "nurse" &&
            "You have 23 patients under your care today."}
          {user.role === "pharmacist" &&
            "There are 5 new prescriptions to process."}
          {user.role === "lab_tech" &&
            "You have 8 lab tests pending completion."}
          {user.role === "patient" &&
            "Your next appointment is scheduled for tomorrow at 2:00 PM."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              onClick={() => handleStatClick(stat.label)}
              className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs lg:text-sm text-green-600 mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0 ml-3`}
                >
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 lg:p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Activities
            </h3>
          </div>
          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => toast({
                      title: "Activity Details",
                      description: activity.message,
                    })}
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color} flex-shrink-0`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 lg:p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="p-4 lg:p-6">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <button 
                onClick={handleAddPatient}
                className="p-3 lg:p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs lg:text-sm font-medium text-gray-900">Add Patient</p>
              </button>
              
              <button 
                onClick={handleSchedule}
                className="p-3 lg:p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs lg:text-sm font-medium text-gray-900">Schedule</p>
              </button>
              
              <button 
                onClick={handleCreateBill}
                className="p-3 lg:p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              >
                <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs lg:text-sm font-medium text-gray-900">Create Bill</p>
              </button>
              
              <button 
                onClick={handleViewReports}
                className="p-3 lg:p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-red-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs lg:text-sm font-medium text-gray-900">View Reports</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 lg:p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {user.role === "patient"
              ? "Upcoming Appointments"
              : "Today's Schedule"}
          </h3>
        </div>
        <div className="p-4 lg:p-6">
          <div className="space-y-4">
            <div 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => toast({
                title: "Appointment Details",
                description: "Opening detailed appointment information...",
              })}
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-gray-900">
                  {user.role === "patient"
                    ? "Consultation with Dr. Micheal Johnson"
                    : "Emergency Room Check - Room 205"}
                </p>
                <p className="text-sm text-gray-600">
                  {user.role === "patient"
                    ? "Tomorrow at 2:00 PM"
                    : "Now - 3:00 PM"}
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium self-start sm:self-center">
                {user.role === "patient" ? "Confirmed" : "In Progress"}
              </span>
            </div>

            <div 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              onClick={() => toast({
                title: "Schedule Details",
                description: "Opening detailed schedule information...",
              })}
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-medium text-gray-900">
                  {user.role === "patient"
                    ? "Lab Test Results Available"
                    : "Surgery - Operation Theater 2"}
                </p>
                <p className="text-sm text-gray-600">
                  {user.role === "patient"
                    ? "Blood work completed"
                    : "4:00 PM - 6:00 PM"}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium self-start sm:self-center">
                {user.role === "patient" ? "Ready" : "Scheduled"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
 