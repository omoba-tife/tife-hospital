import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardHome from "./DashboardHome";
import PatientManagement from "./PatientManagement";
import DoctorManagement from "./DoctorManagement";
import AppointmentManagement from "./appointmentManagement";
import BillingManagement from "./billingManagement";
import PharmacyManagement from "./PharmacyManagement";
import LabManagement from "./LabManagement";
import WardManagement from "./WardManagement";
import StaffManagement from "./StaffManagement";
import InventoryManagement from "./InventoryManagement";

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome user={user} />;
      case "patients":
        return <PatientManagement user={user} />;
      case "doctors":
        return <DoctorManagement user={user} />;
      case "appointments":
        return <AppointmentManagement user={user} />;
      case "billing":
        return <BillingManagement user={user} />;
      case "pharmacy":
        return <PharmacyManagement user={user} />;
      case "lab":
        return <LabManagement user={user} />;
      case "wards":
        return <WardManagement user={user} />;
      case "staff":
        return <StaffManagement user={user} />;
      case "inventory":
        return <InventoryManagement user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          user={user}
          onLogout={onLogout}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
