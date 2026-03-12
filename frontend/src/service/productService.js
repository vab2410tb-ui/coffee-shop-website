import axios from 'axios';
import axiosClient from './clientService.js';

const ProductService = {
  // [ USER ]
  // 1. Lấy sản phẩm theo danh mục
  // URL: http://localhost:8000/api/v1/products/category/:slug
  getProductsByCategory: async (slug, sortOrder) => {
    const url = `/products/category/${slug}`;
    return axiosClient.get(url, {
      params: {
        sort: sortOrder,
      },
    });
  },
  // 2. Lấy sản phẩm theo mã sku
  getDetailProductsBySku: async (sku) => {
    const url = `/products/${sku}`;
    return axiosClient.get(url);
  },

  // 3. Tìm kiếm sản phẩm
  searchProducts: async (sku) => {
    const url = `/products/search/${sku}`;
    return axiosClient.get(url);
  },

  // [ ADMIN ]
  // 1. Lấy chi tiết 1 sản phẩm
  // http://localhost:8000/api/v1/admin/products/:id
  get: async (id) => {
    const url = `/admin/products/${id}`;
    return axiosClient.get(url);
  },
  // 2. Lấy tất cả sản phẩm
  getAll: async (searchTerm, filterType, sortOrder) => {
    const url = '/admin/products';
    return axiosClient.get(url, {
      params: {
        name: searchTerm,
        category: filterType,
        sort: sortOrder,
      },
    });
  },

  create: async (data) => {
    const url = '/admin/products';
    return axiosClient.post(url, data);
  },

  update: async (id, data) => {
    const url = `/admin/products/${id}`;
    return axiosClient.put(url, data);
  },

  remove: async (id) => {
    const url = `/admin/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default ProductService;
