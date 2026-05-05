import { useState, useEffect } from "react";
import { getDepartments, createDepartment } from "../api/api";
import { Plus, X, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    DepartmentCode: "",
    DepartmentName: "",
    GrossSalary: "",
  });

  // FETCH DEPARTMENTS
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // RESET FORM
  const resetForm = () => {
    setForm({
      DepartmentCode: "",
      DepartmentName: "",
      GrossSalary: "",
    });
  };

  // CREATE DEPARTMENT
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.DepartmentCode || !form.DepartmentName || !form.GrossSalary) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await createDepartment(form);
      toast.success("Department added successfully!");
      fetchDepartments();
      resetForm();
      setShowModal(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to add department");
    } finally {
      setLoading(false);
    }
  };

  // FORMAT CURRENCY
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('rw-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  return (
    <div className="space-y-6">
      {/* HEADER WITH ADD BUTTON */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Department Management
          </h1>
          <p className="text-gray-400 mt-1">Manage your organizational departments</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/20 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Department
        </motion.button>
      </div>

      {/* STATISTICS CARD */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Departments</p>
            <p className="text-3xl font-bold text-white mt-1">{departments.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
            <Building2 className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-white">
            <thead className="text-gray-400 border-b border-white/10 bg-white/5">
              <tr>
                <th className="py-3 px-4 text-left">Code</th>
                <th className="py-3 px-4 text-left">Department Name</th>
                <th className="py-3 px-4 text-right">Gross Salary</th>
              </tr>
            </thead>
            <tbody>
              {loading && departments.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                      <p className="text-gray-400">Loading departments...</p>
                    </div>
                  </td>
                </tr>
              ) : departments.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <Building2 className="w-12 h-12 text-gray-600" />
                      <p className="text-gray-400">No departments found</p>
                      <button
                        onClick={() => setShowModal(true)}
                        className="mt-2 text-purple-400 hover:text-purple-300"
                      >
                        Click here to add your first department
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                departments.map((dept, index) => (
                  <motion.tr
                    key={dept._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="py-3 px-4 font-medium">
                      <span className="badge-info">{dept.DepartmentCode}</span>
                    </td>
                    <td className="py-3 px-4">{dept.DepartmentName}</td>
                    <td className="py-3 px-4 text-right text-green-400 font-semibold">
                      {formatCurrency(dept.GrossSalary)}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD DEPARTMENT MODAL */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Add New Department</h2>
                    <p className="text-gray-400 text-sm mt-1">Fill in the department details</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Department Code *
                    </label>
                    <input
                      name="DepartmentCode"
                      placeholder="e.g., HR, IT, FIN"
                      onChange={handleChange}
                      value={form.DepartmentCode}
                      className="input-modern"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Department Name *
                    </label>
                    <input
                      name="DepartmentName"
                      placeholder="e.g., Human Resources"
                      onChange={handleChange}
                      value={form.DepartmentName}
                      className="input-modern"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Gross Salary (RWF) *
                    </label>
                    <input
                      name="GrossSalary"
                      type="number"
                      placeholder="Enter gross salary amount"
                      onChange={handleChange}
                      value={form.GrossSalary}
                      className="input-modern"
                      required
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Adding...
                        </span>
                      ) : (
                        "Add Department"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}