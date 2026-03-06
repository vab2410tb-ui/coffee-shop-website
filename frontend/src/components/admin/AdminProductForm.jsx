import React, { useState, useEffect, useRef } from 'react';
import ProductService from '../../service/iproductService.js';
import UploadService from '../../service/iuploadService.js';
import form from './adminproductform.module.scss';

const DEFAULT_TECH_SPECS = {
  origin: '',
  dimensions: '',
  weight: '',
  material: '',
  voltage: '',
  wattage: '',

  // Espresso
  amperage: '',
  coffeeBoiler: '',
  steamBoiler: '',

  // Grinder
  burrs: '',
  hopperCapacity: '',
  productivity: '',
  grindAdjustment: '',
  grindingSpeed: '',
  programmableDose: false, // Checkbox

  // Accessories
  diameter: '',
  distributionSideMaximumDepth: '',
  tamperSideMaximumDepth: '',
  ApproximateWeight: '',
};

function AdminProductForm({ productId, onSuccess, onCancel }) {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    sku: '',
    brand: '',
    category: '',
    mainImage: '',
    variants: [{ color: '', colorCode: '', stock: '', images: [] }],
    detailImages: [],
    lifestyleImages: [],
    description: {
      productFeatures: [],
      introText: [{ title: '', content: '' }],
      middleBannerImage: '',
      highlightFeatures: [],
      essentialFeatures: [],
    },
  });
  const [variants, setVariants] = useState([]);
  const [, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const mainImageInputRef = useRef(null);
  const detailImagesRef = useRef(null);
  const lifestyleImagesRef = useRef(null);

  // Kiểm tra đang ở chế độ chỉnh sửa
  const isEdit = !!productId;

  // Load dữ liệu sản phẩm khi vào trang chỉnh sửa
  useEffect(() => {
    if (isEdit) {
      ProductService.get(productId).then((res) => {
        const data = res.product || res;

        setProduct({
          ...data,
          techSpecs: {
            ...DEFAULT_TECH_SPECS,
            ...(data.techSpecs || {}),
          },
        });

        setVariants(
          res.variants && res.variants.length > 0
            ? res.variants
            : [{ color: '', colorCode: '', stock: 0 }],
        );
      });
    }
  }, [productId, isEdit]);

  // cập nhật state khi người dùng nhập dữ liệu vào form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setProduct({ ...product, [name]: val });
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleNestedDescriptionChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        [field]: value,
      },
    }));
  };

  // cập nhật các thông số kỹ thuật trong state product khi user nhập form.
  const handleTechSpec = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setProduct((prev) => ({
      ...prev,
      techSpecs: {
        ...prev.techSpecs,
        [name]: val,
      },
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { color: '', colorCode: '', stock: 0 }]);
  };

  // Upload ảnh lên server và lưu URL ảnh vào state product
  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setLoading(true);
      try {
        // Call API upload ảnh
        const response = await UploadService.uploadImage(reader.result, type);
        // Lấy URL ảnh trả về
        const imageUrl = response.url || response.data?.url;

        if (type === 'main') {
          setProduct((prev) => ({ ...prev, mainImage: imageUrl }));
          setErrors((prev) => ({ ...prev, mainImage: null }));
        } else if (type === 'life') {
          setProduct((prev) => ({
            ...prev,
            lifestyleImages: [...prev.lifestyleImages, imageUrl],
          }));
          if (lifestyleImagesRef.current) lifestyleImagesRef.current.value = '';
        }
        // ĐÂY LÀ PHẦN GỘP BANNER VÀO:
        else if (type === 'banner') {
          setProduct((prev) => ({
            ...prev,
            description: {
              ...(prev.description || {}),
              middleBannerImage: imageUrl,
            },
          }));
          e.target.value = ''; // Reset input ngay tại event
        } else {
          // Mặc định là detail
          setProduct((prev) => ({
            ...prev,
            detailImages: [...prev.detailImages, imageUrl],
          }));
          if (detailImagesRef.current) detailImagesRef.current.value = '';
        }
      } catch (err) {
        alert('Upload failed !!!');
      } finally {
        setLoading(false);
      }
    };
  };

  // Upload ảnh riêng cho từng phân loại màu
  const handleVariantImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setLoading(true);
      try {
        const response = await UploadService.uploadImage(reader.result, 'variant');
        const imageUrl = response.url || response.data?.url;

        // Cập nhật lại mảng variants
        const updatedVariants = [...variants];
        if (!updatedVariants[index].images) {
          updatedVariants[index].images = [];
        }
        updatedVariants[index].images.push(imageUrl);
        setVariants(updatedVariants);

        // Reset input file
        e.target.value = '';
      } catch (err) {
        alert('Upload fail!');
      } finally {
        setLoading(false);
      }
    };
  };

  // Xóa ảnh của một màu cụ thể
  const handleRemoveVariantImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].images = updatedVariants[variantIndex].images.filter(
      (_, i) => i !== imageIndex,
    );
    setVariants(updatedVariants);
  };

  const handleRemoveVariant = (indexToRemove) => {
    setVariants(variants.filter((_, index) => index !== indexToRemove));
  };
  // Xóa ảnh chính của sản phẩm
  const handleRemoveMainImage = () => {
    setProduct((prev) => ({ ...prev, mainImage: '' }));
    if (mainImageInputRef.current) mainImageInputRef.current.value = '';
  };
  // Xóa ảnh phụ/ chi tiết của sản phẩm
  const handleRemoveLifestyleImages = (indexToRemove) => {
    setProduct((prev) => ({
      ...prev,
      lifestyleImages: prev.lifestyleImages.filter((_, index) => index !== indexToRemove),
    }));
  };
  const handleRemoveDetailImages = (indexToRemove) => {
    setProduct((prev) => ({
      ...prev,
      detailImages: prev.detailImages.filter((_, index) => index !== indexToRemove),
    }));
  };

  // gửi dữ liệu sản phẩm lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.mainImage) {
      alert('Please wait until the upload completes or choose a main image');
      return;
    }

    const finalProductToSubmit = {
      ...product,
      variants: variants,
    };
    setLoading(true);
    try {
      if (isEdit) {
        await ProductService.update(productId, finalProductToSubmit);
        alert('Update successful!');
      } else {
        await ProductService.create(finalProductToSubmit);
        alert('Created successfully!');
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Error occurred while saving the product!');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Form thông tin của sản phẩm
    <div className={form.container}>
      <h2>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
      <h3 style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px', marginTop: '50px' }}>
        Product Information:{' '}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className={form.adProductform}>
          {/* Tên sản phẩm */}
          <div className={form.form1}>
            <label>Product Name:</label>
            <input
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className={form.input}
            />
          </div>

          {/* Giá sản phẩm */}
          <div className={form.form1}>
            <label>Price:</label>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleInputChange}
              className={form.input}
            />
          </div>

          {/* Phân loại sản phẩm */}
          <div className={form.form1}>
            <label>Product Category:</label>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className={form.input}
            >
              <option value="">-- Select Category --</option>
              <option value="espresso-machine"> Espresso Machine</option>
              <option value="grinder-machine"> Grinder Machine</option>
              <option value="coffee-beans">Coffee Beans</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          {/* Mã SKU */}
          <div className={form.form1}>
            <label>SKU Code:</label>
            <input
              name="sku"
              value={product.sku}
              onChange={handleInputChange}
              className={form.input}
            />
          </div>
        </div>

        {/* Upload ảnh */}
        <div className={form.update_img}>
          {/* Main Image Preview */}
          <div className={form.main_image}>
            <label>Main Image:</label>
            <br />
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, 'main')}
              ref={mainImageInputRef}
            />
            {product.mainImage && (
              <div className={form.upImg}>
                <img src={product.mainImage} alt="Main Preview" width="200" />
                <button type="button" onClick={handleRemoveMainImage}>
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Detail Images Preview */}
          <div className={form.details_image}>
            <label>Detail Images ({product.detailImages.length}):</label> <br />
            <input type="file" onChange={(e) => handleFileUpload(e, '')} ref={detailImagesRef} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {product.detailImages.map((url, index) => (
                <div key={index} className={form.upImg}>
                  <img src={url} width="120" alt={`Detail ${index}`} />
                  <button type="button" onClick={() => handleRemoveDetailImages(index)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Life Images Preview */}
          <div className={form.details_image}>
            <label>Lifestyle Images ({product.lifestyleImages.length}):</label> <br />
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, 'life')}
              ref={lifestyleImagesRef}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {product.lifestyleImages.map((url, index) => (
                <div key={index} className={form.upImg}>
                  <img
                    src={url}
                    width="120"
                    style={{ marginRight: '10px' }}
                    alt={`Detail ${index}`}
                  />
                  <button type="button" onClick={() => handleRemoveLifestyleImages(index)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phân loại màu sắc sản phẩm */}
        <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginTop: '50px' }}>
          Color Category:
        </h3>
        {variants.map((variant, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              alignItems: 'flex-start',
              margin: '50px 80px 15px 80px',
              padding: '15px',
              background: '#f9f9f9',
              borderRadius: '6px',
            }}
          >
            <div style={{ flex: 1, Width: '120px' }}>
              <label style={{ fontSize: '12px', color: '#666' }}>Color name:</label>
              <input
                type="text"
                value={variant.color}
                onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                style={{ width: '100%', padding: '6px', marginTop: '5px' }}
              />
            </div>

            <div style={{ width: '70px' }}>
              <label style={{ fontSize: '12px', color: '#666' }}>Color code</label>
              <input
                type="color"
                value={variant.colorCode}
                onChange={(e) => handleVariantChange(index, 'colorCode', e.target.value)}
                style={{
                  width: '100%',
                  height: '30px',
                  cursor: 'pointer',
                  border: 'none',
                  marginTop: '5px',
                }}
              />
            </div>

            <div style={{ flex: 1, minWidth: '100px' }}>
              <label style={{ fontSize: '12px', color: '#666' }}>Quantity in stock:</label>
              <input
                type="number"
                min="0"
                value={variant.stock}
                onChange={(e) => handleVariantChange(index, 'stock', Number(e.target.value))}
                style={{ width: '100%', padding: '6px', marginTop: '5px' }}
                required
              />
            </div>

            {/* Ảnh màu sắc cho sản phẩm */}
            <div style={{ flex: 2, minWidth: '200px' }}>
              <label style={{ fontSize: '12px', color: '#666' }}>
                Image For Color({variant.images?.length || 0}):
              </label>
              <input
                type="file"
                onChange={(e) => handleVariantImageUpload(index, e)}
                style={{ width: '100%', fontSize: '12px', padding: '4px 0' }}
              />
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                {variant.images &&
                  variant.images.map((imgUrl, imgIdx) => (
                    <div key={imgIdx} style={{ position: 'relative' }}>
                      <img
                        src={imgUrl}
                        width="45"
                        height="45"
                        style={{
                          objectFit: 'cover',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                        }}
                        alt={`Màu ${variant.color}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveVariantImage(index, imgIdx)}
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          background: '#ff4d4f',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          fontSize: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Nút xóa màu */}
            {variants.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveVariant(index)}
                style={{
                  marginTop: '18px',
                  padding: '6px 12px',
                  background: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Remove color
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddVariant}
          className={form.btn}
          style={{ margin: '30px 0 30px 80px' }}
        >
          + Add color category
        </button>

        {/* Thông tin kỹ thuật của sản phẩm */}
        {['grinder-machine', 'espresso-machine', 'accessories'].includes(product.category) && (
          <div>
            <h3
              style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginTop: '50px' }}
            >
              Technical Specifications:{' '}
            </h3>
            <div className={form.adProductform}>
              {/* Xuất xứ */}
              <div className={form.form1}>
                <label>Origin:</label>
                <input
                  name="origin"
                  value={product.techSpecs?.origin || ''}
                  onChange={handleTechSpec}
                  className={form.input}
                />
              </div>

              {/* Kích thước  */}
              <div className={form.form1}>
                <label>Dimensions (H-W-D):</label>
                <input
                  name="dimensions"
                  value={product.techSpecs?.dimensions || ''}
                  onChange={handleTechSpec}
                  className={form.input}
                />
              </div>

              {/* Vật liệu */}
              <div className={form.form1}>
                <label>Material:</label>
                <input
                  name="material"
                  value={product.techSpecs?.material || ''}
                  onChange={handleTechSpec}
                  className={form.input}
                />
              </div>

              {/* Cân nặng */}
              <div className={form.form1}>
                <label>Weight (kg):</label>
                <input
                  name="weight"
                  type="weight"
                  value={product.techSpecs?.weight || ''}
                  onChange={handleTechSpec}
                  className={form.input}
                />
              </div>

              {/* Điện áp của thiết bị */}
              <div className={form.form1}>
                <label>Voltage:</label>
                <input
                  name="voltage"
                  value={product.techSpecs?.voltage || ''}
                  onChange={handleTechSpec}
                  className={form.input}
                />
              </div>

              {/* Công suất tiêu thụ của thiết bị */}
              <div className={form.form1}>
                <label>Wattage:</label>
                <input
                  name="wattage"
                  value={product.techSpecs?.wattage || ''}
                  onChange={handleTechSpec}
                  className={form.input}
                />
              </div>
            </div>
          </div>
        )}
        {/*  Hiển thị dành cho Grinder Machine */}
        {product.category === 'grinder-machine' && (
          <div className={form.adProductform}>
            {/* Lưỡi xay */}
            <div className={form.form1}>
              <label>Burrs:</label>
              <input
                name="burrs"
                value={product.techSpecs?.burrs || ''}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>

            {/* Phễu hạt */}
            <div className={form.form1}>
              <label>Hopper Capacity:</label>
              <input
                name="hopperCapacity"
                value={product.techSpecs?.hopperCapacity || ''}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>

            {/* Năng suất */}
            <div className={form.form1}>
              <label>Productivity:</label>
              <input
                name="productivity"
                value={product.techSpecs?.productivity || ''}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>

            {/* Tốc độ xay */}
            <div className={form.form1}>
              <label>Grinding Speed:</label>
              <input
                name="grindingSpeed"
                value={product.techSpecs?.grindingSpeed || ''}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>

            {/* Điều chỉnh độ xay */}
            <div className={form.form1}>
              <label>Grind Adjustment:</label>
              <input
                name="grindAdjustment"
                value={product.techSpecs?.grindAdjustment || ''}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>

            {/* Set định lượng  */}
            <div className={form.form1}>
              <label style={{ display: 'inline-flex', gap: '10px' }}>
                Programmable Dose:
                <input
                  type="checkbox"
                  name="programmableDose"
                  checked={product.techSpecs?.programmableDose || false}
                  onChange={handleTechSpec}
                  style={{ width: '20px', height: '20px', marginTop: '5px' }}
                />
              </label>
            </div>
          </div>
        )}

        {/*  Hiển thị dành cho Espresso Machine */}
        {product.category === 'espresso-machine' && (
          <div className={form.adProductform}>
            {/* Dung tích nồi hơi pha cà phê */}
            <div className={form.form1}>
              <label>Coffee Boiler:</label>
              <input
                name="coffeeBoiler"
                value={product.techSpecs?.coffeeBoiler}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>

            {/* Dung tích nồi hơi hơi nước */}
            <div className={form.form1}>
              <label>Steam Boiler:</label>
              <input
                name="steamBoiler"
                value={product.techSpecs?.steamBoiler}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>

            {/* Cường độ dòng điện */}
            <div className={form.form1}>
              <label>Amperage:</label>
              <input
                name="amperage"
                value={product.techSpecs?.amperage}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>
          </div>
        )}

        {product.category === 'accessories' && (
          <div className={form.adProductform}>
            {/* Dung tích nồi hơi pha cà phê */}
            <div className={form.form1}>
              <label>Diameter:</label>
              <input
                name="diameter"
                value={product.techSpecs?.diameter}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>

            {/* Dung tích nồi hơi hơi nước */}
            <div className={form.form1}>
              <label>Materials:</label>
              <input
                name="material"
                value={product.techSpecs?.material}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>

            <div className={form.form1}>
              <label>Distribution Side Maximum Depth:</label>
              <input
                name="distributionSideMaximumDepth"
                value={product.techSpecs?.distributionSideMaximumDepth}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>
            <div className={form.form1}>
              <label>Tamper Side Maximum Depth:</label>
              <input
                name="tamperSideMaximumDepth"
                value={product.techSpecs?.tamperSideMaximumDepth}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>
            <div className={form.form1}>
              <label>Approximate Weight:</label>
              <input
                name="ApproximateWeight"
                value={product.techSpecs?.ApproximateWeight}
                onChange={handleTechSpec}
                className={form.input}
              />
            </div>
          </div>
        )}
        {/* ================= PHẦN NHẬP MÔ TẢ SẢN PHẨM ================= */}
        <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginTop: '50px' }}>
          Landing Page Description
        </h3>
        <div className={form.adProductform} style={{ display: 'block' }}>
          <div
            style={{
              margin: '30px 80px 30px 0',
              background: '#f9f9f9',
              padding: '15px',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ marginBottom: '15px' }}>Product Features:</h4>
            {product.description?.productFeatures?.map((feature, index) => (
              <div
                key={`pf-${index}`}
                style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}
              >
                <input
                  className={form.input}
                  value={feature || ''}
                  onChange={(e) => {
                    const newFeatures = [...(product.description?.productFeatures || [])];
                    newFeatures[index] = e.target.value;
                    handleNestedDescriptionChange('productFeatures', newFeatures);
                  }}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newFeatures =
                      product.description?.productFeatures?.filter((_, i) => i !== index) || [];
                    handleNestedDescriptionChange('productFeatures', newFeatures);
                  }}
                  style={{
                    padding: '0 15px',
                    background: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const newFeatures = [...(product.description?.productFeatures || []), ''];
                handleNestedDescriptionChange('productFeatures', newFeatures);
              }}
              className={form.btn}
            >
              + Add features
            </button>
          </div>

          {/* Intro Text */}
          <div className={form.form1} style={{ width: '100%', marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Intro Text :</label>
            <input
              type="text"
              placeholder="Title Intro"
              value={product.description?.introText?.[0]?.title || ''}
              onChange={(e) => {
                // 1. Copy mảng cũ
                const newIntroText = [
                  ...(product.description?.introText || [{ title: '', content: '' }]),
                ];
                // 2. Cập nhật title ở phần tử đầu tiên
                newIntroText[0] = { ...newIntroText[0], title: e.target.value };
                // 3. Đẩy mảng mới lên hàm cập nhật
                handleNestedDescriptionChange('introText', newIntroText);
              }}
            />
            <textarea
              value={product.description?.introText?.[0]?.content || ''}
              onChange={(e) => {
                const newIntroText = [
                  ...(product.description?.introText || [{ title: '', content: '' }]),
                ];
                newIntroText[0] = { ...newIntroText[0], content: e.target.value };
                handleNestedDescriptionChange('introText', newIntroText);
              }}
              className={form.input}
              rows="4"
              style={{
                width: '100%',
                padding: '10px',
                minHeight: '100px',
                resize: 'vertical',
                marginTop: '20px',
              }}
              placeholder="Enter a product description…"
            />
          </div>

          {/*  Highlight Features */}
          <div
            style={{
              marginBottom: '30px',
              background: '#f9f9f9',
              padding: '15px',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ marginBottom: '15px' }}>Highlight Features:</h4>
            {product.description?.highlightFeatures?.map((feature, index) => (
              <div
                key={`hl-${index}`}
                style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}
              >
                <input
                  className={form.input}
                  placeholder="Title Highlight Features"
                  value={feature.title}
                  onChange={(e) => {
                    const newArr = [...(product.description?.highlightFeatures || [])];
                    newArr[index] = { ...newArr[index], title: e.target.value };
                    handleNestedDescriptionChange('highlightFeatures', newArr);
                  }}
                  style={{ flex: 1 }}
                />
                <input
                  className={form.input}
                  placeholder="Content Highlight Features"
                  value={feature.content}
                  onChange={(e) => {
                    const newArr = [...(product.description?.highlightFeatures || [])];
                    newArr[index] = { ...newArr[index], content: e.target.value };
                    handleNestedDescriptionChange('highlightFeatures', newArr);
                  }}
                  style={{ flex: 2 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newArr = product.description.highlightFeatures.filter(
                      (_, i) => i !== index,
                    );
                    handleNestedDescriptionChange('highlightFeatures', newArr);
                  }}
                  style={{
                    padding: '0 15px',
                    background: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newArr = [
                  ...(product.description?.highlightFeatures || []),
                  { title: '', description: '' },
                ];
                handleNestedDescriptionChange('highlightFeatures', newArr);
              }}
              className={form.btn}
            >
              + Add highlight feature
            </button>
          </div>

          {/*  Essential Features  */}
          <div
            style={{
              marginBottom: '30px',
              background: '#f9f9f9',
              padding: '15px',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ marginBottom: '15px' }}>Essential Features:</h4>
            {product.description?.essentialFeatures?.map((feature, index) => (
              <div
                key={`es-${index}`}
                style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}
              >
                <input
                  className={form.input}
                  placeholder="Title Essential Features"
                  value={feature.title}
                  onChange={(e) => {
                    const newArr = [...(product.description?.essentialFeatures || [])];
                    newArr[index] = { ...newArr[index], title: e.target.value };
                    handleNestedDescriptionChange('essentialFeatures', newArr);
                  }}
                  style={{ flex: 1 }}
                />
                <input
                  className={form.input}
                  placeholder="Content Essential Features"
                  value={feature.content}
                  onChange={(e) => {
                    const newArr = [...(product.description?.essentialFeatures || [])];
                    newArr[index] = { ...newArr[index], content: e.target.value };
                    handleNestedDescriptionChange('essentialFeatures', newArr);
                  }}
                  style={{ flex: 2 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newArr = product.description.essentialFeatures.filter(
                      (_, i) => i !== index,
                    );
                    handleNestedDescriptionChange('essentialFeatures', newArr);
                  }}
                  style={{
                    padding: '0 15px',
                    background: '#ff4d4f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newArr = [
                  ...(product.description?.essentialFeatures || []),
                  { title: '', description: '' },
                ];
                handleNestedDescriptionChange('essentialFeatures', newArr);
              }}
              className={form.btn}
            >
              + Add essential feature
            </button>
          </div>
        </div>
        {/* ================= KẾT THÚC PHẦN NHẬP MÔ TẢ ================= */}

        <button type="submit" disabled={loading} className={form.submit}>
          {loading ? 'Loading...' : isEdit ? 'Save Changes' : 'Done'}
        </button>
      </form>
    </div>
  );
}

export default AdminProductForm;
