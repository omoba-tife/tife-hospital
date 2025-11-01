import React, { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  LogOut,
  Settings,
  Sun,
  Moon,
  User,
  Monitor,
  MessageCircle,
  HelpCircle,
  Shield,
} from "lucide-react";

const Header = ({
  user,
  onLogout,
  onMenuClick,
  onThemeChange,
  currentTheme = "light",
  settingsOptions: customSettings = [],
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [notifications] = useState(3); // Mock notification count
  const [searchQuery, setSearchQuery] = useState("");

  // Default settings configuration
  const defaultSettings = [
    {
      id: "theme",
      label: "Theme",
      options: [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
      ],
    },
    {
      id: "profile",
      label: "Edit Profile",
      icon: User,
      action: () => {
        console.log("Edit profile clicked");
        setShowSettings(false);
      },
    },
    {
      id: "notifications",
      label: "Notification Settings",
      icon: Bell,
      action: () => {
        console.log("Notification settings clicked");
        setShowSettings(false);
      },
    },
    {
      id: "privacy",
      label: "Privacy & Security",
      icon: Shield,
      action: () => {
        console.log("Privacy settings clicked");
        setShowSettings(false);
      },
    },
    {
      id: "support",
      label: "Help & Support",
      icon: HelpCircle,
      action: () => {
        console.log("Support clicked");
        setShowSettings(false);
      },
    },
  ];

  // Merge default settings with custom ones
  const settingsOptions = [...defaultSettings, ...customSettings];

  const handleThemeChange = (theme) => {
    setShowSettings(false);
    onThemeChange?.(theme);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    return "Evening";
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // You can add search functionality here
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search logic here
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Left Section - Menu & Greeting */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Good {getGreeting()}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {user.name}
            </p>
          </div>

          {/* Mobile greeting */}
          <div className="sm:hidden">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Good {getGreeting()}
            </h1>
          </div>
        </div>

        {/* Right Section - Search & Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              placeholder="Search patients, appointments..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Search className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {notifications > 9 ? "9+" : notifications}
                </span>
              </span>
            )}
          </button>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                showSettings
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-label="Settings"
              aria-expanded={showSettings}
            >
              <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            {showSettings && (
              <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 py-2">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.role || "User"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Theme Settings */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Theme Preferences
                  </h3>
                  <div className="space-y-1">
                    {settingsOptions
                      .find((setting) => setting.id === "theme")
                      ?.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleThemeChange(option.value)}
                          className={`w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm transition-colors duration-200 ${
                            currentTheme === option.value
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <option.icon className="w-4 h-4" />
                          <span>{option.label}</span>
                          {currentTheme === option.value && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
                          )}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Other Settings */}
                <div className="py-2">
                  {settingsOptions
                    .filter((setting) => setting.id !== "theme")
                    .map((setting) => (
                      <button
                        key={setting.id}
                        onClick={setting.action}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <setting.icon className="w-4 h-4" />
                        <span>{setting.label}</span>
                      </button>
                    ))}
                </div>

                {/* Logout */}
                <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 px-2 py-2 rounded-md text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.role || "User"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close settings when clicking outside */}
      {showSettings && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSettings(false)}
        />
      )}
    </header>
  );
};

export default Header;
