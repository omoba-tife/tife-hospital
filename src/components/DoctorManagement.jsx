import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Stethoscope,
  Star,
  Calendar,
  Clock,
} from "lucide-react";

const DoctorManagement = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [doctors] = useState([
    {
      id: "1",
      name: "Dr. Adamson",
      specialization: "Cardiology",
      department: "Cardiology",
      phone: "+1 234-5678915",
      email: "michaelAdamson@hospital.com",
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
      ],
      rating: 4.8,
      experience: 15,
    },
    {
      id: "2",
      name: "Dr. Sarah Johnson",
      specialization: "Obstetrics & Gynecology",
      department: "Women's Health",
      phone: "+1 234-567-8911",
      email: "sarah.johnson@hospital.com",
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
      ],
      rating: 4.9,
      experience: 12,
    },
    {
      id: "3",
      name: "Dr. James Odion",
      specialization: "Emergency Medicine",
      department: "Emergency",
      phone: "+1 234-567-8912",
      email: "james.odion@hospital.com",
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
      ],
      rating: 4.7,
      experience: 8,
    },
  ]);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getAvailabilityStatus = (doctor) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const currentTime = new Date().getHours() * 100 + new Date().getMinutes();

    const todaySchedule = doctor.availability.find(
      (schedule) => schedule.day === today
    );
    if (!todaySchedule || !todaySchedule.isAvailable) {
      return { status: "Not Available", color: "bg-red-100 text-red-700" };
    }

    const startTime = parseInt(todaySchedule.startTime.replace(":", ""));
    const endTime = parseInt(todaySchedule.endTime.replace(":", ""));

    if (currentTime >= startTime && currentTime <= endTime) {
      return { status: "Available Now", color: "bg-green-100 text-green-700" };
    } else {
      return { status: "Off Duty", color: "bg-yellow-100 text-yellow-700" };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Doctor Management
          </h1>
          <p className="text-gray-600">Manage doctors and their schedules</p>
        </div>
        {user.role === "admin" && (
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Doctor</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">
                {doctors.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Now</p>
              <p className="text-2xl font-bold text-green-600">
                {
                  doctors.filter(
                    (d) => getAvailabilityStatus(d).status === "Available Now"
                  ).length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Specializations
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {new Set(doctors.map((d) => d.specialization)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg. Experience
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(
                  doctors.reduce((sum, d) => sum + d.experience, 0) /
                    doctors.length
                )}
                <span className="text-sm text-gray-500"> years</span>
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name, specialization, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

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
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
                    <span className="text-white font-semibold text-lg">
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {doctor.specialization}
                  </p>
                  <p className="text-sm text-gray-500">{doctor.department}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${availability.color}`}
                >
                  {availability.status}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(doctor.rating)}
                  <span className="text-sm font-medium text-gray-600 ml-1">
                    {doctor.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {doctor.experience} years exp.
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">{doctor.phone}</p>
                <p className="text-sm text-gray-600">{doctor.email}</p>
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
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  View Schedule
                </button>
                <button className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                  Book Appointment
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Weekly Schedule Overview
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-8 gap-4 text-sm">
            <div className="font-medium text-gray-700">Doctor</div>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="font-medium text-gray-700 text-center">
                {day}
              </div>
            ))}

            {filteredDoctors.slice(0, 3).map((doctor) => (
              <React.Fragment key={doctor.id}>
                <div className="font-medium text-gray-900 py-2">
                  {doctor.name.replace("Dr. ", "")}
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
                        <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {schedule.startTime}-{schedule.endTime}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400">Off</div>
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
  );
};

export default DoctorManagement;