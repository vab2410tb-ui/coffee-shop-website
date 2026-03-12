import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1/admin/uploads`;

const axiosUpload = axios.create({
  baseURL: API_URL,
});

const UploadService = {
  uploadImage: async (formData, type) => {
    // 1. Nhét thêm type vào chung cục formData
    if (type) {
      formData.append('type', type);
    }
    
    // 2. CHÚ Ý: Truyền thẳng biến formData vào, TUYỆT ĐỐI KHÔNG dùng { formData } hay { image: formData }
    const response = await axiosUpload.post('/upload', formData);
    
    return response.data;
  },
};

export default UploadService;