import { useState, useEffect } from "react";
import { getEmployees, createEmployee, getDepartments } from "../api/api";
import { Plus, Search, Edit, Trash2, Eye, X } from "lucide-react";
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

  // CREATE EMPLOYEE
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.FirstName || !form.LastName || !form.Position) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await createEmployee(form);
      toast.success("Employee added successfully!");
      fetchEmployees();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.log(err);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE EMPLOYEE
  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      toast.success("Employee deleted");
      fetchEmployees();
    }
  };

  // FILTER EMPLOYEES
  const filteredEmployees = employees.filter(emp => 
    emp.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // PAGINATION
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Employees</h1>
          <p className="text-gray-400 text-sm mt-1">Total: {employees.length} employees</p>
        </div>
        
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Cancel" : "Add Employee"}
        </button>
      </div>

      {/* Add Employee Form */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <input
                name="employeeNumber"
                placeholder="Employee Number"
                onChange={handleChange}
                value={form.employeeNumber}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <input
                name="FirstName"
                placeholder="First Name *"
                onChange={handleChange}
                value={form.FirstName}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <input
                name="LastName"
                placeholder="Last Name *"
                onChange={handleChange}
                value={form.LastName}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <input
                name="Position"
                placeholder="Position *"
                onChange={handleChange}
                value={form.Position}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <input
                name="Address"
                placeholder="Address"
                onChange={handleChange}
                value={form.Address}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <input
                name="Telephone"
                placeholder="Telephone"
                onChange={handleChange}
                value={form.Telephone}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <select
                name="Gender"
                onChange={handleChange}
                value={form.Gender}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                name="hiredDate"
                type="date"
                onChange={handleChange}
                value={form.hiredDate}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              />
              <select
                name="Department"
                onChange={handleChange}
                value={form.Department}
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.DepartmentName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Employee"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Employees Table */}
      <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 border-b border-white/10">
              <tr className="text-left text-gray-400">
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Position</th>
                <th className="p-3">Department</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Gender</th>
                
              </tr>
            </thead>
            <tbody>
              {loading && employees.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No employees found
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map((emp, index) => (
                  <tr key={emp._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{emp.FirstName} {emp.LastName}</p>
                        <p className="text-xs text-gray-400">ID: {emp.employeeNumber}</p>
                      </div>
                    </td>
                    <td className="p-3">{emp.Position}</td>
                    <td className="p-3">{emp.departments?.DepartmentCode || "-"}</td>
                    <td className="p-3">{emp.Telephone || "-"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        emp.Gender === 'Male' ? 'bg-blue-500/20 text-blue-300' : 'bg-pink-500/20 text-pink-300'
                      }`}>
                        {emp.Gender || "-"}
                      </span>
                    </td>
                    
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t border-white/10">
            <p className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}