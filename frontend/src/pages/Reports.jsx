import { useEffect, useState } from "react";
import { getPayrollReport } from "../api/api";

export default function Reports() {
  const [report, setReport] = useState([]);

  const fetchReport = async () => {
    try {
      const res = await getPayrollReport();
      setReport(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="space-y-6">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-white">
        Monthly Payroll Report
      </h1>

      {/* TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">

        <table className="w-full text-sm text-white">

          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Month</th>
              <th>Net Salary</th>
            </tr>
          </thead>

          <tbody>
            {report.map((r, index) => (
              <tr key={index} className="border-b border-white/5">

                <td className="py-2">{r.FirstName}</td>
                <td>{r.LastName}</td>
                <td>{r.Position}</td>
                <td>{r.DepartmentName}</td>
                <td>{r.month}</td>
                <td className="text-green-400 font-semibold">
                  {r.netSalary} RWF
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}