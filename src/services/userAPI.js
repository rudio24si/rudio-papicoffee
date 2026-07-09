// ✅ userAPI.js - Tetap pakai axios
import axios from "axios";

const API_URL = "https://tukwmveevfnhflsdbtsf.supabase.co/rest/v1/users";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1a3dtdmVldmZuaGZsc2RidHNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTY4OTksImV4cCI6MjA5Nzg3Mjg5OX0.xB6-sY8W5wUFnxHHk6JH3bO9jG9_D_0w0GFJPZjYqgM";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};
export const userAPI = {
  // ✅ Register
  registerUser: async ({ username, email, password }) => {
    // Cek dulu apakah email sudah terdaftar
    const checkRes = await axios.get(
      `${API_URL}?email=eq.${encodeURIComponent(email)}&select=id`,
      { headers },
    );
    if (checkRes.data.length > 0) {
      throw new Error("Email already registered.");
    }

    const response = await axios.post(
      API_URL,
      { username, email, password, role: "admin" }, // pastikan nama kolom sama persis dengan di Supabase
      { headers },
    );
    return response.data;
  },

  // ⚠️ Login - masih tidak aman tapi fungsional untuk development
  loginUser: async (username, password) => {
    const response = await axios.get(
      `${API_URL}?username=eq.${encodeURIComponent(username)}&password=eq.${encodeURIComponent(password)}&select=id,username,email,role`,
      { headers },
    );
    if (response.data.length === 0) {
      throw new Error("Username atau Password salah!");
    }
    return response.data[0];
  },

  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}?order=created_at.desc`, {
      headers,
    });
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, userData, {
      headers,
    });
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
    return response.data;
  },
};
