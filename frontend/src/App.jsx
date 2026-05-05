import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./pages/AdminLayout";

import Employee from "./pages/Employee";
import Department from "./pages/Department";
import Salary from "./pages/Salary";
import Reports from "./pages/Reports";

function App() {
  const token = localStorage.getItem("token");

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="employees" element={<Employee />} />
          <Route path="departments" element={<Department />} />
          <Route path="salary" element={<Salary />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;