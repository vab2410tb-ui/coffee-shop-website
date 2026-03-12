import Products from "../models/products.model.js";

const shopController = {
    
    // 1. [LẤY SẢN PHẨM DỰA TRÊN DANH MỤC] [GET]
    getProductsByCategory: async (req, res) => {
    try {
        const { slug } = req.params; 
        const { sort } = req.query;  

        // Lọc filter
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

        // filter và sort
        const products = await Products.find(filter).sort(sortCondition);

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {

        console.error("Error fetching category:", error);
        return res.status(500).json({
            success: false,
            message: "Lỗi Server khi lấy danh mục sản phẩm"
        });
    }
},
    // 2. [ LẤY MÃ SẢN PHẨM TRONG KHO] [GET]
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
    // 3. [ LẤY TẤT CẢ SẢN PHẨM ] [GET]
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

    // 4. [ LẤY THÔNG TIN CHI TIẾT CỦA 1 SẢN PHẨM ] [GET]
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
    },

    // 5. [ LẤY SẢN PHẨM KHI SEARCH ]
    searchProducts: async (req, res ) => {
        try{
            const {keyword} = req.params;
            if (!keyword) {
                return res.status(200).json({ success: true, data: [] });
            }
            const products = await Products.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { sku: { $regex: keyword, $options: 'i' } }
                ]
            });
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
    }
};

export default shopController;