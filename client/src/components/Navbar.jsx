import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 text-white px-2 sm:px-4 py-3 sm:py-4 shadow-lg sticky top-0 z-50 backdrop-blur-sm">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      {/* Logo - Enhanced & Responsive */}
      <NavLink to="/">
      <div className="flex items-center space-x-1 sm:space-x-3 group cursor-pointer min-w-0 flex-shrink-0">
        <div className="bg-white bg-opacity-20 p-1 sm:p-2 rounded-full transition-all duration-300 group-hover:bg-opacity-30 group-hover:scale-110">
          <span className="text-lg sm:text-2xl" role="img" aria-label="logo">CK</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-base sm:text-xl font-bold tracking-wide truncate">Hostel</span>
          <span className="text-xs text-green-200 hidden sm:block">Kitchen Manager</span>
        </div>
      </div>
  </NavLink>
      {/* Navigation Links - Super Responsive */}
      <div className="flex space-x-0.5 sm:space-x-1 flex-shrink-0">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative flex items-center justify-center px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 min-w-0 ${
              isActive 
                ? 'bg-white bg-opacity-25 font-semibold shadow-lg' 
                : 'hover:shadow-md'
            }`
          }
        >
          <span className="text-base sm:text-lg transition-transform duration-300 hover:scale-110" role="img" aria-label="home">🏠</span>
          <span className="hidden sm:inline font-medium ml-1 sm:ml-2 text-sm sm:text-base">Home</span>
        </NavLink>
        
        <NavLink
          to="/vegetable-entry"
          className={({ isActive }) =>
            `relative flex items-center justify-center px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 min-w-0 ${
              isActive 
                ? 'bg-white bg-opacity-25 font-semibold shadow-lg' 
                : 'hover:shadow-md'
            }`
          }
        >
          <span className="text-base sm:text-lg transition-transform duration-300 hover:scale-110" role="img" aria-label="veg">🫛</span>
          <span className="hidden sm:inline font-medium ml-1 sm:ml-2 text-sm sm:text-base whitespace-nowrap">Veg Entry</span>
        </NavLink>
        
      <NavLink
  to="/grocery-entry"
  className={({ isActive }) =>
    `relative flex items-center justify-center px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:bg-opacity-20 min-w-0 ${
      isActive 
        ? 'bg-white bg-opacity-25 font-semibold shadow-lg' 
        : 'hover:shadow-md'
    }`
  }
>
  <span className="text-base sm:text-lg transition-transform duration-300 hover:scale-110" role="img" aria-label="grocery">🛒</span>
  <span className="hidden sm:inline font-medium ml-1 sm:ml-2 text-sm sm:text-base whitespace-nowrap">Grocery Entry</span>
</NavLink>

      </div>
    </div>
  </nav>
);

export default Navbar;