import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-x-hidden">
    {/* Hero Section */}
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 backdrop-blur-3xl"></div>
      <div className="relative p-3 sm:p-6 lg:p-8 max-w-6xl mx-auto text-center">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-green-800 bg-clip-text text-transparent leading-tight">
            Welcome to Hostel
          </h1>
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-green-700 mb-2 sm:mb-4">
            Kitchen Management Dashboard
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Streamline your daily purchases, track expenses, and export data effortlessly. 
            Your complete hostel kitchen management solution.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-12 px-2">
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-green-100">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📊</div>
            <div className="text-lg sm:text-2xl font-bold text-green-700">Easy Tracking</div>
            <div className="text-xs sm:text-sm text-gray-600">Monitor daily expenses</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-green-100">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">💾</div>
            <div className="text-lg sm:text-2xl font-bold text-green-700">Data Export</div>
            <div className="text-xs sm:text-sm text-gray-600">Export anytime you need</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-green-100">
            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⚡</div>
            <div className="text-lg sm:text-2xl font-bold text-green-700">Quick Entry</div>
            <div className="text-xs sm:text-sm text-gray-600">Fast data input system</div>
          </div>
        </div>
      </div>
    </div>

    {/* Main Action Cards */}
    <div className="p-3 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-8 text-gray-800 px-2">
        What would you like to do today?
      </h2>
      
      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 px-2">
        {/* Vegetable Entry Card */}
        <Link 
          to="/vegetable-entry" 
          className="group bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-3 hover:scale-105 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">🥕</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Vegetable Entry</div>
            <div className="text-green-100 mb-2 sm:mb-4 text-sm sm:text-base">Add daily vegetable purchase data and track your expenses</div>
            <div className="flex items-center text-xs sm:text-sm font-semibold">
              <span>Start Adding Data</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Grocery Entry - Coming Soon */}
        <Link 
  to="/grocery-entry" 
  className="group bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-3 hover:scale-105 transition-all duration-300 relative overflow-hidden"
>
  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <div className="relative z-10">
    <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">🛒</div>
    <div className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Grocery Entry</div>
    <div className="text-yellow-100 mb-2 sm:mb-4 text-sm sm:text-base">Add grocery purchase data and track stock easily</div>
    <div className="flex items-center text-xs sm:text-sm font-semibold">
      <span>Start Adding Data</span>
      <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </div>
</Link>

      </div>
    </div>

    {/* Quick Actions Section */}
    {/* <div className="p-3 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg border border-green-100 mx-2 sm:mx-0">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
          <button className="p-2 sm:p-4 bg-green-100 hover:bg-green-200 rounded-lg sm:rounded-xl transition-colors duration-300 flex flex-col items-center">
            <span className="text-lg sm:text-2xl mb-1 sm:mb-2">📥</span>
            <span className="text-xs sm:text-sm font-medium text-green-700">Import Data</span>
          </button>
          <button className="p-2 sm:p-4 bg-blue-100 hover:bg-blue-200 rounded-lg sm:rounded-xl transition-colors duration-300 flex flex-col items-center">
            <span className="text-lg sm:text-2xl mb-1 sm:mb-2">📤</span>
            <span className="text-xs sm:text-sm font-medium text-blue-700">Export Data</span>
          </button>
          <button className="p-2 sm:p-4 bg-purple-100 hover:bg-purple-200 rounded-lg sm:rounded-xl transition-colors duration-300 flex flex-col items-center">
            <span className="text-lg sm:text-2xl mb-1 sm:mb-2">🔍</span>
            <span className="text-xs sm:text-sm font-medium text-purple-700">View Reports</span>
          </button>
          <button className="p-2 sm:p-4 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl transition-colors duration-300 flex flex-col items-center">
            <span className="text-lg sm:text-2xl mb-1 sm:mb-2">⚙️</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700">Settings</span>
          </button>
        </div>
      </div>
    </div> */}
  </div>
);

export default HomePage;