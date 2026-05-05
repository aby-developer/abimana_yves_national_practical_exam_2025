import { useState, useEffect } from "react";
import {
  getSalaries,
  createSalary,
  deleteSalary,
  getEmployees,
  getDepartments
} from "../api/api";

export default function Salary() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    employee: "",
    department: "",
    totalDeduction: "",
    netSalary: "",
    month: "",
  });

  // FETCH SALARIES
  const fetchSalaries = async () => {
    const res = await getSalaries();
    setSalaries(res.data);
  };

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  // FETCH DEPARTMENTS
  const fetchDepartments = async () => {
    const res = await getDepartments();
    setDepartments(res.data);
  };

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
    fetchDepartments();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE SALARY
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.employee ||
    !form.department ||
    !form.totalDeduction ||
    !form.netSalary ||
    !form.month
  ) {
    alert("Please fill all fields");
    return;
  }

  try {
    await createSalary(form);
    fetchSalaries();

    setForm({
      employee: "",
      department: "",
      totalDeduction: "",
      netSalary: "",
      month: "",
    });

  } catch (err) {
    console.log(err);
  }
};
  // DELETE
  const handleDelete = async (id) => {
    await deleteSalary(id);
    fetchSalaries();
  };

  return (
    <div className="space-y-6 text-white">

      <h1 className="text-2xl font-bold">
        Salary Management
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-3 bg-white/5 p-5 rounded-xl border border-white/10"
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
          className="p-2 bg-black/30 rounded"
          onChange={handleChange}
          value={form.totalDeduction}
        />

        <input
          name="netSalary"
          placeholder="Net Salary"
          className="p-2 bg-black/30 rounded"
          onChange={handleChange}
          value={form.netSalary}
        />

        <input
          name="month"
          placeholder="Month"
          className="p-2 bg-black/30 rounded"
          onChange={handleChange}
          value={form.month}
        />

        <button className="col-span-2 bg-blue-600 py-2 rounded font-semibold">
          Save Salary
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white/5 rounded-xl p-4">

        {salaries.map((s) => (
          <div
            key={s._id}
            className="flex justify-between border-b border-white/10 py-2"
          >

            <span>{s.month}</span>
            <span>{s.netSalary} RWF</span>

            <button
              onClick={() => handleDelete(s._id)}
              className="text-red-400"
            >
              Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}