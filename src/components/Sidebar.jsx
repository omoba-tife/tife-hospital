import React from "react";
import {
  Home,
  Users,
  Stethoscope,
  Calendar,
  CreditCard,
  Pill,
  FlaskConical,
  Building,
  UsersIcon,
  Package,
  Menu,
  X,
  Heart,
  Shield,
  UserCheck,
  Microscope,
} from "lucide-react";

const Sidebar = ({ user, activeTab, onTabChange, isOpen, onToggle }) => {
  const getMenuItems = () => {
    const baseItems = [{ id: "dashboard", label: "Dashboard", icon: Home }];

    const roleBasedItems = {
      admin: [
        { id: "patients", label: "Patients", icon: Users },
        { id: "doctors", label: "Doctors", icon: Stethoscope },
        { id: "appointments", label: "Appointments", icon: Calendar },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "pharmacy", label: "Pharmacy", icon: Pill },
        { id: "lab", label: "Laboratory", icon: FlaskConical },
        { id: "wards", label: "Wards & Rooms", icon: Building },
        { id: "staff", label: "Staff", icon: UsersIcon },
        { id: "inventory", label: "Inventory", icon: Package },
      ],
      doctor: [
        { id: "patients", label: "My Patients", icon: Users },
        { id: "appointments", label: "Appointments", icon: Calendar },
        { id: "lab", label: "Lab Results", icon: FlaskConical },
        { id: "wards", label: "Wards", icon: Building },
      ],
      nurse: [
        { id: "patients", label: "Patients", icon: Users },
        { id: "appointments", label: "Appointments", icon: Calendar },
        { id: "wards", label: "Wards", icon: Building },
        { id: "inventory", label: "Supplies", icon: Package },
      ],
      pharmacist: [
        { id: "pharmacy", label: "Pharmacy", icon: Pill },
        { id: "patients", label: "Patients", icon: Users },
        { id: "inventory", label: "Medicine Stock", icon: Package },
      ],
      lab_tech: [
        { id: "lab", label: "Laboratory", icon: FlaskConical },
        { id: "patients", label: "Patients", icon: Users },
      ],
      patient: [
        { id: "appointments", label: "My Appointments", icon: Calendar },
        { id: "billing", label: "My Bills", icon: CreditCard },
        { id: "lab", label: "My Reports", icon: FlaskConical },
      ],
    };

    return [...baseItems, ...roleBasedItems[user.role]];
  };

  const menuItems = getMenuItems();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">GiFTED HANDS</h1>
                <p className="text-xs text-gray-500">Hospital System</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                <div className="flex items-center space-x-1">
                  {user.role === "admin" && (
                    <Shield className="w-3 h-3 text-red-500" />
                  )}
                  {user.role === "doctor" && (
                    <Stethoscope className="w-3 h-3 text-blue-500" />
                  )}
                  {user.role === "nurse" && (
                    <Heart className="w-3 h-3 text-pink-500" />
                  )}
                  {user.role === "pharmacist" && (
                    <Pill className="w-3 h-3 text-green-500" />
                  )}
                  {user.role === "lab_tech" && (
                    <Microscope className="w-3 h-3 text-purple-500" />
                  )}
                  {user.role === "patient" && (
                    <UserCheck className="w-3 h-3 text-yellow-500" />
                  )}
                  <span className="text-xs text-gray-500 capitalize">
                    {user.role.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onTabChange(item.id);
                        if (window.innerWidth < 1024) onToggle();
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        isActive
                          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-blue-700" : "text-gray-400"
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
