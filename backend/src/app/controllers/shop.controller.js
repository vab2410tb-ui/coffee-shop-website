import Products from "../models/products.models.js";

const shopController = {
    
    // [GET] /api/v1/products/category/:slug
    getProductsByCategory: async (req, res) => {
    try {
        const { slug } = req.params; 
        const { sort } = req.query;  

        // 1. điều kiện lọc
        const filter = { category: slug };
        let sortCondition = {};
        
        if (sort === 'price_asc') {
            sortCondition.price = 1;      
        } else if (sort === 'price_desc') {
            sortCondition.price = -1;     
        } else if (sort === 'name_asc') {
            sortCondition.name = 1;       
        } else if (sort === 'name_desc') {
            sortCondition.name = -1;      
        } else {
            sortCondition.createdAt = -1; 
        }

        // 3. filter và sort
        const products = await Products.find(filter).sort(sortCondition);

        // 4. return 
        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        // 5. xử lý lỗi
        console.error("Error fetching category:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi Server khi lấy danh mục sản phẩm"
        });
    }
},
    // [GET] /api/v1/products/:sku
    getProductsBySku : async (req, res) => {
        const { sku } = req.params;
        try {
            const products = await Products.findOne({sku})
            return res.status(200).json({
                success: true,
                data: products
            });
        }catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    },
    // [GET] /api/v1/products
    getAllProducts: async (req, res) => {
        try {
            const products = await Products.find({});
            return res.status(200).json({
                success: true,
                data: products
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    },

    // [GET] /api/v1/products/detail/:id
    getProductDetail: async (req, res) => {
        try {
            const product = await Products.findById(req.params.id);
            
            if (!product) {
                return res.status(404).json({ 
                    success: false, 
                    message: "Không tìm thấy sản phẩm" 
                });
            }

            return res.status(200).json({ 
                success: true, 
                data: product 
            });
        } catch (error) {
            return res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    }
};

export default shopController;