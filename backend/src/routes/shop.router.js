// backend/routes/shop.router.js
import express from 'express';
import shopController from '../app/controllers/shop.controller.js';

const router = express.Router();

// . Route search sản phẩm
// URL: /api/v1/products/search
router.get('/search/:sku', shopController.searchProducts);

// . Route lấy theo danh mục
// URL: /api/v1/products/category/espresso-machine
router.get('/category/:slug', shopController.getProductsByCategory);

// . Route lấy chi tiết 1 sản phẩm bằng id
// URL: /api/v1/products/detail/:id
router.get('/detail/:id', shopController.getProductDetail);

// .Route Route lấy chi tiết 1 sản phẩm bằng sku
// URL: /api/v1/products/:sku
router.get('/:sku', shopController.getProductsBySku)

// . Route lấy tất cả
// URL: /api/v1/products
router.get('/', shopController.getAllProducts);

export default router;