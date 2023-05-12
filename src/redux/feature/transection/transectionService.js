import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/transections";

// Get all transections
const getAllTransections = async (userId, token) => {
  const config = {
    userId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL, config);
  return res.data;
};

// Add transection
const addTransection = async (transectionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL, transectionData, config);
  return res.data;
};

// Delete transection
const deleteTransection = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(`${API_URL}/${id}`, config);
  return res.data;
};

const transectionService = {
  getAllTransections,
  addTransection,
  deleteTransection,
};

export default transectionService;
