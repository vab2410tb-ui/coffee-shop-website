import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  // Thông tin chung của sản phẩm
  sku: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    uppercase: true 
  },

  slug: { 
    type: String, 
    unique: true, 
    index: true   
  },

  name: { type: String, required: true, trim: true },

  price: { type: Number, required: true },

  variants: [
    {
      color: { type: String, required: true },     
      colorCode: { type: String, required: true }, 
      stock: { type: Number, required: true, default: 0 }, 
      images: [{ type: String }]                   
    }
  ],

  lifestyleImages: [{type: String}],

  category: { 
    type: String, 
    required: true, 
    enum: ['espresso-machine', 'grinder-machine', 'coffee-beans', 'accessories']  
  },

  brand: { type: String, default: "La Marzocco" },

  mainImage: { type: String },

  detailImages: [{ type: String }],

  description: { 
    productFeatures: {type: [String], default: [] },
    introText: [{ 
      title: {  type: String },
      content: { type: String }
    }], 
    middleBannerImage: [{ type: String }], 
    highlightFeatures: [{
      title: { type: String },
      content: { type: String } 
    }],
    essentialFeatures: [{
      title: { type: String },
      content: { type: String }
    }]
   },

  inStock: { type: Boolean, default: true },
  
  techSpecs: {
    // 1. Nhóm dùng chung
    origin: { type: String }, // Xuất xứ 
    dimensions: { type: String },// H-W-D 
    weight: { type: String },// Trọng lượng 
    voltage: { type: String },// Electrical Specs 
    wattage: { type: String },// Wattage Elements 
    
    // 2. (Espresso Machine)
    material: { type: String },// Material
    amperage: { type: String },// Amperage
    coffeeBoiler: { type: String },// Coffee Boiler 
    steamBoiler: { type: String },// Steam Boiler 
    
    // 3. (Grinder)
    burrs: { type: String },// Burrs 
    hopperCapacity: { type: String },// Hopper Capacity
    productivity: { type: String },// Productivity (g/s)
    grindAdjustment: { type: String },// Grind Adjustment
    grindingSpeed: { type: String },// Grinding Speed
    programmableDose: { type: Boolean },// Programmable Dose (Yes -> true, No -> false)

    // 4. (Accessories)
    diameter: {type: String},
    material: {type: String},
    distributionSideMaximumDepth: {type: String},
    tamperSideMaximumDepth: {type: String},
    ApproximateWeight: {type: String} 
  },

}, { timestamps: true });

productSchema.pre('save', async function() {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true, 
      locale: 'vi' 
    });
  }
});

export default mongoose.model('Product', productSchema);
