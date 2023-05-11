import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

// Register
const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData);
  console.log(res.data);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

// Login
const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

// Logout
const logout = async() => {
  localStorage.removeItem("user");
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
