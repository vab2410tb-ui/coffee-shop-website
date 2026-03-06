import axios from 'axios';

const API_URL = `${import.meta.env.REACT_APP_API_BASE_URL}/api/v1/orders`;

const OrderService = {

  createOrder: async (orderData) => {
    try {
      const response = await axios.post(API_URL, orderData);
      return response.data;
    } catch (error) {

      throw error.response?.data?.message || 'Lỗi kết nối đến Server';
    }
  },

  // Tra cứu đơn hàng theo ID
  getOrderByID: async (orderId, email) => {
    try {
      const response = await axios.get(`${API_URL}/${orderId}/${email}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Order not found.';
    }
  },
  
  getUserOrders: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Unable to load orders. Please try again.';
    }
  }
};

export default OrderService;