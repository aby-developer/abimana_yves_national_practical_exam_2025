import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


// ================= AUTH =================
export const loginUser = (data) => API.post("/auth/login", data);


// ================= EMPLOYEES =================
export const getEmployees = () => API.get("/employees/get-employee");
export const createEmployee = (data) => API.post("/employees/create-employee", data);


// ================= DEPARTMENTS =================
export const getDepartments = () => API.get("/departments/get-departments");
export const createDepartment = (data) =>
  API.post("/departments/create-department", data);


// ================= SALARIES =================
export const getSalaries = () => API.get("/salaries/get-salaries");

export const createSalary = (data) =>
  API.post("/salaries/create-salary", data);

export const updateSalary = (id, data) =>
  API.put(`/salaries/update-salary/${id}`, data);

export const deleteSalary = (id) =>
  API.delete(`/salaries/delete-salary/${id}`);

export const getPayrollReport = () =>
  API.get("/salaries/report");

export default API;