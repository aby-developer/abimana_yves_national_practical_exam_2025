import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white/5 border-r border-white/10 p-5 space-y-6">

      <h1 className="text-xl font-bold text-blue-400">
        EPMS ADMIN
      </h1>

      <nav className="space-y-3">

        <Link className="block hover:text-blue-400" to="/admin/employees">
          Employee
        </Link>

        <Link className="block hover:text-blue-400" to="/admin/departments">
          Department
        </Link>

        <Link className="block hover:text-blue-400" to="/admin/salary">
          Salary
        </Link>

        <Link className="block hover:text-blue-400" to="/admin/reports">
          Reports
        </Link>

      </nav>

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-600 hover:bg-red-700 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { 
//   LayoutDashboard, 
//   Users, 
//   Building2, 
//   DollarSign, 
//   FileText, 
//   LogOut,
//   Settings,
//   Car,
//   Wrench,
//   Menu,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   UserCircle,
//   Calendar,
//   ClipboardList,
//   BarChart3,
//   Home,
//   HelpCircle,
//   Bell,
//   Moon,
//   Sun
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [user, setUser] = useState(null);
//   const [hoveredItem, setHoveredItem] = useState(null);

//   useEffect(() => {
//     // Get user info from localStorage
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       setUser(JSON.parse(userData));
//     } else {
//       // Fallback user data
//       setUser({ username: "Admin User", role: "Administrator" });
//     }

//     // Check for saved dark mode preference
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "light") {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove("dark");
//     } else {
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     if (!isDarkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const menuItems = [
//     { 
//       path: "/admin/dashboard", 
//       name: "Dashboard", 
//       icon: LayoutDashboard,
//       description: "Overview & analytics"
//     },
//     { 
//       path: "/admin/employees", 
//       name: "Employees", 
//       icon: Users,
//       description: "Manage staff members"
//     },
//     { 
//       path: "/admin/departments", 
//       name: "Departments", 
//       icon: Building2,
//       description: "Department structure"
//     },
//     { 
//       path: "/admin/salary", 
//       name: "Salary", 
//       icon: DollarSign,
//       description: "Payroll management"
//     },
//     { 
//       path: "/admin/reports", 
//       name: "Reports", 
//       icon: FileText,
//       description: "Analytics & reports"
//     },
//     { 
//       path: "/admin/appointments", 
//       name: "Appointments", 
//       icon: Calendar,
//       description: "Customer bookings"
//     },
//     { 
//       path: "/admin/invoices", 
//       name: "Invoices", 
//       icon: ClipboardList,
//       description: "Payment tracking"
//     },
//   ];

//   const isActive = (path) => {
//     return location.pathname === path || location.pathname.startsWith(path + "/");
//   };

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   // Get current time greeting
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(true)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 text-white shadow-lg"
//       >
//         <Menu className="w-5 h-5" />
//       </button>

//       {/* Mobile Overlay */}
//       <AnimatePresence>
//         {isMobileOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsMobileOpen(false)}
//             className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar */}
//       <motion.aside
//         initial={false}
//         animate={{
//           width: isCollapsed ? "80px" : "280px",
//           transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 25 }
//         }}
//         className={`
//           fixed lg:relative z-50 h-screen bg-gradient-to-b from-gray-900/98 to-gray-950/98 
//           backdrop-blur-xl border-r border-white/10 shadow-2xl
//           ${isMobileOpen ? "left-0" : "-left-full lg:left-0"}
//           transition-all duration-300
//         `}
//       >
//         <div className="flex flex-col h-full relative">
//           {/* Header Section */}
//           <div className="relative p-5 border-b border-white/10">
//             <div className="flex items-center justify-between">
//               <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center w-full" : ""}`}>
//                 <motion.div 
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.5 }}
//                   className="relative"
//                 >
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
//                     <Car className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse" />
//                 </motion.div>
                
//                 {!isCollapsed && (
//                   <motion.div
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="flex-1"
//                   >
//                     <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                       AutoRepair Pro
//                     </h1>
//                     <p className="text-xs text-gray-400">Payment Management System</p>
//                   </motion.div>
//                 )}
//               </div>
              
//               {/* Collapse Toggle Button */}
//               <button
//                 onClick={toggleSidebar}
//                 className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-gray-800 border border-white/20 rounded-full items-center justify-center hover:bg-gray-700 transition-all hover:scale-110"
//               >
//                 {isCollapsed ? (
//                   <ChevronRight className="w-3 h-3" />
//                 ) : (
//                   <ChevronLeft className="w-3 h-3" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* User Profile Section */}
//           {!isCollapsed && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="p-4 border-b border-white/10"
//             >
//               <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/5">
//                 <div className="relative">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
//                     <UserCircle className="w-6 h-6 text-white" />
//                   </div>
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-white truncate">
//                     {user?.username || "Admin User"}
//                   </p>
//                   <p className="text-xs text-gray-400">{user?.role || "Administrator"}</p>
//                 </div>
//               </div>
              
//               {/* Greeting */}
//               <div className="mt-3 text-center">
//                 <p className="text-xs text-gray-400">{getGreeting()},</p>
//                 <p className="text-sm font-medium text-white">{user?.username?.split(' ')[0] || "Admin"}! 👋</p>
//               </div>
//             </motion.div>
//           )}

//           {/* Navigation Menu */}
//           <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
//             <div className="space-y-1">
//               {menuItems.map((item, index) => (
//                 <motion.div
//                   key={item.path}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   onMouseEnter={() => setHoveredItem(item.name)}
//                   onMouseLeave={() => setHoveredItem(null)}
//                 >
//                   <Link
//                     to={item.path}
//                     onClick={() => setIsMobileOpen(false)}
//                     className={`
//                       relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
//                       ${isActive(item.path) 
//                         ? "bg-gradient-to-r from-blue-600/20 to-blue-600/10 border border-blue-500/30 text-blue-400 shadow-lg" 
//                         : "text-gray-300 hover:bg-white/10 hover:text-white"
//                       }
//                       ${isCollapsed ? "justify-center" : ""}
//                     `}
//                   >
//                     <item.icon className={`w-5 h-5 transition-all ${isActive(item.path) ? "text-blue-400" : "group-hover:scale-110"}`} />
                    
//                     {!isCollapsed && (
//                       <div className="flex-1">
//                         <span className="text-sm font-medium">{item.name}</span>
//                         <p className="text-xs text-gray-500 group-hover:text-gray-400">
//                           {item.description}
//                         </p>
//                       </div>
//                     )}

//                     {isActive(item.path) && !isCollapsed && (
//                       <motion.div
//                         layoutId="activeIndicator"
//                         className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"
//                       />
//                     )}
//                   </Link>
                  
//                   {/* Tooltip for collapsed mode */}
//                   {isCollapsed && hoveredItem === item.name && (
//                     <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50 pointer-events-none">
//                       {item.name}
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </div>

//             {/* Divider */}
//             <div className="my-6 mx-4 border-t border-white/10" />

//             {/* Additional Menu Items */}
//             <div className="space-y-1">
//               <Link
//                 to="/admin/settings"
//                 onClick={() => setIsMobileOpen(false)}
//                 className={`
//                   flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
//                   ${isActive("/admin/settings") 
//                     ? "bg-white/10 text-blue-400" 
//                     : "text-gray-300 hover:bg-white/10 hover:text-white"
//                   }
//                   ${isCollapsed ? "justify-center" : ""}
//                 `}
//               >
//                 <Settings className="w-5 h-5" />
//                 {!isCollapsed && <span className="text-sm">Settings</span>}
//               </Link>

//               <Link
//                 to="/admin/help"
//                 onClick={() => setIsMobileOpen(false)}
//                 className={`
//                   flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
//                   ${isActive("/admin/help") 
//                     ? "bg-white/10 text-blue-400" 
//                     : "text-gray-300 hover:bg-white/10 hover:text-white"
//                   }
//                   ${isCollapsed ? "justify-center" : ""}
//                 `}
//               >
//                 <HelpCircle className="w-5 h-5" />
//                 {!isCollapsed && <span className="text-sm">Help & Support</span>}
//               </Link>
//             </div>
//           </nav>

//           {/* Footer Section */}
//           <div className="p-4 border-t border-white/10 space-y-3">
//             {!isCollapsed && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="p-3 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/5"
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <Wrench className="w-4 h-4 text-blue-400 animate-spin-slow" />
//                   <span className="text-xs text-gray-300">System Status</span>
//                 </div>
//                 <p className="text-xs text-green-400 flex items-center gap-1">
//                   <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
//                   All systems operational
//                 </p>
//                 <p className="text-xs text-gray-400 mt-1">Last backup: Today, 10:30 AM</p>
//               </motion.div>
//             )}
            
//             {/* Theme Toggle */}
//             <button
//               onClick={toggleTheme}
//               className={`
//                 w-full flex items-center gap-3 px-4 py-3 rounded-xl 
//                 bg-white/5 border border-white/10
//                 hover:bg-white/10 transition-all duration-200
//                 ${isCollapsed ? "justify-center" : ""}
//               `}
//             >
//               {isDarkMode ? (
//                 <Sun className="w-5 h-5 text-yellow-400" />
//               ) : (
//                 <Moon className="w-5 h-5 text-blue-400" />
//               )}
//               {!isCollapsed && (
//                 <span className="text-sm">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
//               )}
//             </button>

//             {/* Logout Button */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={logout}
//               className={`
//                 w-full flex items-center gap-3 px-4 py-3 rounded-xl 
//                 bg-gradient-to-r from-red-600/20 to-red-700/20 
//                 border border-red-500/30 text-red-400 
//                 hover:from-red-600/30 hover:to-red-700/30 
//                 transition-all duration-200 group
//                 ${isCollapsed ? "justify-center" : ""}
//               `}
//             >
//               <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
//               {!isCollapsed && (
//                 <span className="text-sm font-medium">Logout</span>
//               )}
//             </motion.button>
            
//             {/* Version info */}
//             {!isCollapsed && (
//               <div className="mt-4 text-center">
//                 <p className="text-xs text-gray-500">Version 2.0.0</p>
//                 <p className="text-xs text-gray-600">© 2024 AutoRepair Pro</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.aside>

//       {/* Mobile Close Button */}
//       <AnimatePresence>
//         {isMobileOpen && (
//           <motion.button
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             onClick={() => setIsMobileOpen(false)}
//             className="lg:hidden fixed top-4 right-4 z-50 p-2.5 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-gray-700 text-white shadow-lg"
//           >
//             <X className="w-5 h-5" />
//           </motion.button>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }