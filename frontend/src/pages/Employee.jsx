import { useState, useEffect } from "react";
import { getEmployees, createEmployee, getDepartments } from "../api/api";
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  UserPlus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const itemsPerPage = 10;

  const [form, setForm] = useState({
    employeeNumber: "",
    FirstName: "",
    LastName: "",
    Position: "",
    Address: "",
    Telephone: "",
    Gender: "",
    hiredDate: "",
    Department: "",
  });

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  // FETCH DEPARTMENTS
  const fetchDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch departments");
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // RESET FORM
  const resetForm = () => {
    setForm({
      employeeNumber: "",
      FirstName: "",
      LastName: "",
      Position: "",
      Address: "",
      Telephone: "",
      Gender: "",
      hiredDate: "",
      Department: "",
    });
    setEditingEmployee(null);
  };

  // CREATE/UPDATE EMPLOYEE
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.FirstName || !form.LastName || !form.Position) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await createEmployee(form);
      toast.success(editingEmployee ? "Employee updated successfully!" : "Employee added successfully!");
      fetchEmployees();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE EMPLOYEE
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        // Add delete API call here
        toast.success("Employee deleted successfully!");
        fetchEmployees();
      } catch (err) {
        toast.error("Failed to delete employee");
      }
    }
  };

  // FILTER EMPLOYEES
  const filteredEmployees = employees.filter(emp => 
    emp.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.Position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PAGINATION
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // STATISTICS
  const stats = {
    total: employees.length,
    departments: departments.length,
    male: employees.filter(e => e.Gender?.toLowerCase() === 'male').length,
    female: employees.filter(e => e.Gender?.toLowerCase() === 'female').length,
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            Employee Management
          </h1>
          <p className="text-gray-400 mt-1">Manage your workforce efficiently</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/20 transition-all"
        >
          <UserPlus className="w-5 h-5" />
          {showForm ? "Cancel" : "Add Employee"}
        </motion.button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: stats.total, icon: Users, color: "blue" },
          { label: "Departments", value: stats.departments, icon: Filter, color: "purple" },
          { label: "Male Employees", value: stats.male, icon: Users, color: "green" },
          { label: "Female Employees", value: stats.female, icon: Users, color: "pink" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-500/20 border border-${stat.color}-500/30`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Employee Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">
                  {editingEmployee ? "Edit Employee" : "Add New Employee"}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <input
                  name="employeeNumber"
                  placeholder="Employee Number *"
                  onChange={handleChange}
                  value={form.employeeNumber}
                  className="input-modern"
                  required
                />
                <input
                  name="FirstName"
                  placeholder="First Name *"
                  onChange={handleChange}
                  value={form.FirstName}
                  className="input-modern"
                  required
                />
                <input
                  name="LastName"
                  placeholder="Last Name *"
                  onChange={handleChange}
                  value={form.LastName}
                  className="input-modern"
                  required
                />
                <input
                  name="Position"
                  placeholder="Position *"
                  onChange={handleChange}
                  value={form.Position}
                  className="input-modern"
                  required
                />
                <input
                  name="Address"
                  placeholder="Address"
                  onChange={handleChange}
                  value={form.Address}
                  className="input-modern"
                />
                <input
                  name="Telephone"
                  placeholder="Telephone"
                  onChange={handleChange}
                  value={form.Telephone}
                  className="input-modern"
                  type="tel"
                />
                
                <select
                  name="Gender"
                  onChange={handleChange}
                  value={form.Gender}
                  className="input-modern"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>

                <input
                  name="hiredDate"
                  type="date"
                  onChange={handleChange}
                  value={form.hiredDate}
                  className="input-modern"
                />

                <select
                  name="Department"
                  onChange={handleChange}
                  value={form.Department}
                  className="input-modern md:col-span-2 lg:col-span-1"
                  required
                >
                  <option value="">Select Department *</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.DepartmentName} ({dept.DepartmentCode})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    editingEmployee ? "Update Employee" : "Add Employee"
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-modern pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>No.</th>
                <th>Employee Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Hired Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && employees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                      <p className="text-gray-400">Loading employees...</p>
                    </div>
                  </td>
                </tr>
              ) : paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-12 h-12 text-gray-600" />
                      <p className="text-gray-400">No employees found</p>
                      <button
                        onClick={() => setShowForm(true)}
                        className="mt-2 text-blue-400 hover:text-blue-300"
                      >
                        Add your first employee
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map((emp, index) => (
                  <motion.tr
                    key={emp._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      <div>
                        <p className="font-medium">{emp.FirstName} {emp.LastName}</p>
                        <p className="text-xs text-gray-400">ID: {emp.employeeNumber}</p>
                      </div>
                    </td>
                    <td>
                      <span className="badge-info">
                        {emp.Position}
                      </span>
                    </td>
                    <td>{emp.Department?.DepartmentName || "N/A"}</td>
                    <td>{emp.Telephone || "-"}</td>
                    <td>
                      <span className={`badge ${emp.Gender?.toLowerCase() === 'male' ? 'badge-info' : 'badge-success'}`}>
                        {emp.Gender || "N/A"}
                      </span>
                    </td>
                    <td>{emp.hiredDate ? new Date(emp.hiredDate).toLocaleDateString() : "-"}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setForm(emp);
                            setEditingEmployee(emp);
                            setShowForm(true);
                          }}
                          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {/* <button
                          onClick={() => handleDelete(emp._id, `${emp.FirstName} ${emp.LastName}`)}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button> */}
                        <button
                          className="p-1.5 rounded-lg bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-4 p-4 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} entries
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-1">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white/5 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}