import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/admin/uploads`;

const axiosUpload = axios.create({
  baseURL: API_URL,
  // XÓA headers Content-Type ở đây
});

const UploadService = {
  // Nhận formData từ AdminProductForm
  uploadImage: async (formData, type) => {
    // Nếu chưa append type ở ngoài thì append ở đây
    if (type && !formData.has('type')) {
        formData.append('type', type);
    }
    const response = await axiosUpload.post('/upload', formData);
    return response.data;
  },
};

export default UploadService;