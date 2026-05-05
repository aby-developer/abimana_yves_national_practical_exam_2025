import { useState, useEffect } from "react";
import {
  getSalaries,
  createSalary,
  updateSalary,
  deleteSalary,
  getEmployees,
  getDepartments
} from "../api/api";

export default function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    employee: "",
    department: "",
    totalDeduction: "",
    netSalary: "",
    month: "",
  });

  // FETCH
  const fetchSalaries = async () => {
    const res = await getSalaries();
    setSalaries(res.data);
  };

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  const fetchDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
    fetchDepartments();
  }, []);

  // INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateSalary(editingId, form);
    } else {
      await createSalary(form);
    }

    fetchSalaries();

    setForm({
      employee: "",
      department: "",
      totalDeduction: "",
      netSalary: "",
      month: "",
    });

    setEditingId(null);
  };

  // DELETE
  const handleDelete = async (id) => {
    await deleteSalary(id);
    fetchSalaries();
  };

  // EDIT
  const handleEdit = (s) => {
    setForm({
      employee: s.employee,
      department: s.department,
      totalDeduction: s.totalDeduction,
      netSalary: s.netSalary,
      month: s.month,
    });

    setEditingId(s._id);
  };

  return (
    <div className="p-6 space-y-6 text-white">

      {/* TITLE */}
      <h1 className="text-xl font-bold">
        Salary Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded"
      >

        {/* EMPLOYEE */}
        <select
          name="employee"
          value={form.employee}
          onChange={handleChange}
          className="p-2 bg-black/30 rounded"
        >
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e._id} value={e._id}>
              {e.FirstName} {e.LastName}
            </option>
          ))}
        </select>

        {/* DEPARTMENT */}
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="p-2 bg-black/30 rounded"
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.DepartmentName}
            </option>
          ))}
        </select>

        <input
          name="totalDeduction"
          placeholder="Total Deduction"
          value={form.totalDeduction}
          onChange={handleChange}
          className="p-2 bg-black/30 rounded"
        />

        <input
          name="netSalary"
          placeholder="Net Salary"
          value={form.netSalary}
          onChange={handleChange}
          className="p-2 bg-black/30 rounded"
        />

        <input
          name="month"
          placeholder="Month"
          value={form.month}
          onChange={handleChange}
          className="p-2 bg-black/30 rounded"
        />

        <button className="col-span-2 bg-blue-600 py-2 rounded font-semibold">
          {editingId ? "Update Salary" : "Save Salary"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white/5 p-4 rounded">

        {salaries.map((s) => (
          <div
            key={s._id}
            className="flex justify-between border-b border-white/10 py-2"
          >

            <div>
              <p className="font-bold">{s.month}</p>
              <p>{s.netSalary} RWF</p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => handleEdit(s)}
                className="text-blue-400"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(s._id)}
                className="text-red-400"
              >
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}