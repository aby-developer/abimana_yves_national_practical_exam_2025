import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await loginUser(form);

    // 🔥 SAFE TOKEN EXTRACTION (IMPORTANT FIX)
    const token = res.token || res.data?.token;

    if (!token) {
      throw new Error("Token not received from backend");
    }

    // save token
    localStorage.setItem("token", token);

    // debug (you can remove later)
    console.log("LOGIN SUCCESS TOKEN:", token);

    // redirect to dashboard
    navigate("/admin/employees", { replace: true });

  } catch (err) {
    console.log(err);
    setError(err.message || err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="text-gray-400 text-sm">
            Enter your credentials to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-300 text-sm px-3 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}