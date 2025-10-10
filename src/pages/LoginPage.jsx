import React, { useState } from "react";
import {
  User as UserIcon,
  Shield,
  Stethoscope,
  Users,
  Pill,
  FlaskConical,
  Heart,
} from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    {
      value: "admin",
      label: "Administrator",
      icon: Shield,
      color: "bg-red-100 text-red-600",
    },
    {
      value: "doctor",
      label: "Doctor",
      icon: Stethoscope,
      color: "bg-blue-100 text-blue-600",
    },
    {
      value: "nurse",
      label: "Nurse",
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
    },
    {
      value: "pharmacist",
      label: "Pharmacist",
      icon: Pill,
      color: "bg-green-100 text-green-600",
    },
    {
      value: "lab_tech",
      label: "Lab Technician",
      icon: FlaskConical,
      color: "bg-purple-100 text-purple-600",
    },
    {
      value: "patient",
      label: "Patient",
      icon: UserIcon,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const demoUsers = {
      admin: {
        id: "1",
        name: "Dr. Sarah Johnson",
        email: "admin@hospital.com",
        role: "admin",
        department: "Administration",
      },
      doctor: {
        id: "2",
        name: "Dr. Michael Chen",
        email: "doctor@hospital.com",
        role: "doctor",
        specialization: "Cardiology",
        department: "Cardiology",
      },
      nurse: {
        id: "3",
        name: "Emily Rodriguez",
        email: "nurse@hospital.com",
        role: "nurse",
        department: "Emergency",
      },
      pharmacist: {
        id: "4",
        name: "James Wilson",
        email: "pharmacist@hospital.com",
        role: "pharmacist",
        department: "Pharmacy",
      },
      lab_tech: {
        id: "5",
        name: "Lisa Chang",
        email: "labtech@hospital.com",
        role: "lab_tech",
        department: "Laboratory",
      },
      patient: {
        id: "6",
        name: "John Smith",
        email: "patient@hospital.com",
        role: "patient",
      },
    };

    onLogin(demoUsers[selectedRole]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Hospital Management
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedRole === role.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${role.color}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium text-gray-900">
                        {role.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              Demo Mode: Click any role above and sign in with any credentials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
