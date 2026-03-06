import axios from 'axios';

// Đổi tên biến cho khớp
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/authentication`;

const requestOTP = async (email) => {
  const response = await axios.post(`${API_URL}/request-otp`, { email });
  return response.data;
};

const verifyOTP = async (email, otp) => {
  const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
  if (response.data.token) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('userInfo');
};

const authService = {
  requestOTP,
  verifyOTP,
  logout,
};

export default authService;
