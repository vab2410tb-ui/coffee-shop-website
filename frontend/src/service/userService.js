import axios from 'axios';


const API_URL = `${process.env.REACT_APP_API_BASE_URL}/authentication/profile`;

// Hàm phụ trợ để tự động lấy Token từ localStorage đính kèm vào Header
const getAuthHeader = () => {
  const userInfoString = localStorage.getItem('userInfo');
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    return {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    };
  }
  return {};
};

// 1. Lấy thông tin Profile
const getProfile = async () => {
  const config = getAuthHeader();
  const response = await axios.get(API_URL, config);
  return response.data;
};

// 2. Cập nhật thông tin Profile (bao gồm cả Tên, Email, SĐT, Địa chỉ)
const updateProfile = async (userData) => {
  const config = getAuthHeader();
  const response = await axios.put(API_URL, userData, config);

  // Khi Backend trả về dữ liệu mới (kèm token), tự động cập nhật lại localStorage
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }

  return response.data;
};

const userService = {
  getProfile,
  updateProfile,
};

export default userService;
