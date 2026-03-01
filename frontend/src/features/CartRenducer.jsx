const CartReducer = (state, action) => {

  console.log("🔥 Hành động đang gọi:", action.type);
  console.log("📦 Dữ liệu truyền lên (payload):", action);
  // Destructuring action
  const { type, product, variant, id, colorCode } = action;

  switch (type) {
    case "Add":
      // Tìm xem sản phẩm cùng màu này đã có trong giỏ chưa
      const existingItem = state.find(
        (item) => item._id === product._id && item.colorCode === variant.colorCode
      );
      const quantityToAdd = action.quantity || 1;
      if (existingItem) {
        return state.map((item) =>
          item._id === product._id && item.colorCode === variant.colorCode
            ? { 
                ...item, 
                // Không cho phép vượt quá số lượng tồn kho (stock) của variant đó
                quantity: Math.min(item.quantity + quantityToAdd, variant.stock) 
              }
            : item
        );
      }

      // Nếu chưa có, thêm mới và lưu kèm stock của variant vào item để check sau này
      return [
        ...state,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: variant.images[0] || product.mainImage, 
          color: variant.color,
          colorCode: variant.colorCode,
          stock: variant.stock, 
          quantity: quantityToAdd,
        },
      ];

    case "Remove":

      return state.filter(
        (item) => !(item._id === id && item.colorCode === colorCode)
      );

    case "Increase":
      return state.map((item) =>
        item._id === id && item.colorCode === colorCode
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item
      );

    case "Decrease":
      return state.map((item) =>
        item._id === id && item.colorCode === colorCode
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );

    default:
      return state;
  }
};

export default CartReducer;