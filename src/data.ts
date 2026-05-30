import { Product, Testimonial } from './types';

export const HERO_IMAGE = "/src/assets/images/store_hero_1780128527072.png";

export const PRODUCTS: Product[] = [
  {
    id: "v2",
    name: "Crimson Glory Beetroot",
    category: "vegetables",
    price: 60,
    unit: "1 kg",
    description: "Deep, earthy, ruby-red premium beetroots packed with organic nitrates and antioxidants. Excellent for hemoglobin boost and fitness.",
    imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=600",
    badge: "Organic Certified",
    nutrients: ["Nitrates", "Antioxidants", "Folate", "Iron"],
    rating: 4.85,
    reviewsCount: 118,
    stock: 45
  },
  {
    id: "df1",
    name: "Royal Jumbo Almonds",
    category: "dryfruits",
    price: 240,
    unit: "250g",
    description: "Perfectly sized, crunchy California-origin almonds loaded with Vitamin E and healthy fats. Hand-inspected for high standard quality.",
    imageUrl: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600",
    badge: "Nuts Premium",
    nutrients: ["Vitamin E", "Magnesium", "Protein", "Fiber"],
    rating: 4.95,
    reviewsCount: 220,
    stock: 80
  },
  {
    id: "df2",
    name: "Exquisite Whole Cashews",
    category: "dryfruits",
    price: 260,
    unit: "250g",
    description: "Rich, buttery whole cashews sourced from local coastal trees. Naturally high in copper, magnesium, and essential amino acids.",
    imageUrl: "https://images.unsplash.com/photo-1629115916089-7e8c177a8906?auto=format&fit=crop&q=80&w=600",
    badge: "100% Raw Butter",
    nutrients: ["Copper", "Protein", "Heart-healthy Fats"],
    rating: 4.78,
    reviewsCount: 94,
    stock: 65
  },
  {
    id: "df3",
    name: "Soft Medjool Dates",
    category: "dryfruits",
    price: 190,
    unit: "250g",
    description: "Wonderfully sweet, melt-in-the-mouth imported Medjool dates. Known as nature's energy bar, perfect for standard snacking.",
    imageUrl: "https://images.unsplash.com/photo-1533230408709-3f9cb1905592?auto=format&fit=crop&q=80&w=600",
    badge: "Natural Sweet",
    nutrients: ["Iron", "Fiber", "Instant Energy", "Potassium"],
    rating: 4.9,
    reviewsCount: 105,
    stock: 40
  },
  {
    id: "df4",
    name: "Brain-Booster Walnuts",
    category: "dryfruits",
    price: 280,
    unit: "250g",
    description: "Premium Chilean walnut halves resembling the brain, rich in Plant-Based Omega-3 Alpha-Linolenic Acid.",
    imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80&w=600",
    badge: "High Quality",
    nutrients: ["Omega-3 ALA", "Melatonin", "Polyphenols"],
    rating: 4.91,
    reviewsCount: 168,
    stock: 55
  },
  {
    id: "df5",
    name: "Iranian Green Pistachios",
    category: "dryfruits",
    price: 320,
    unit: "250g",
    description: "Perfectly roasted, shelled green pistachios with exceptional crunch. Low calorie snacking with premium plant protein.",
    imageUrl: "https://images.unsplash.com/photo-1596560548464-f01068e3c7eb?auto=format&fit=crop&q=80&w=600",
    badge: "Bestseller",
    nutrients: ["Vitamin B6", "Lutein", "Amino Acids"],
    rating: 4.82,
    reviewsCount: 112,
    stock: 50
  },
  {
    id: "df6",
    name: "Golden Dried Pineapple Rings",
    category: "dryfruits",
    price: 210,
    unit: "200g",
    description: "Sun-dried natural pineapple slices, exquisitely tangy-sweet and chewy. Rich in Vitamin C, immune-supportive antioxidants, and bromelain digestive enzymes.",
    imageUrl: "/src/assets/images/dried_pineapple_1780132189659.png",
    badge: "New Launch ⭐",
    nutrients: ["Vitamin C", "Bromelain Key", "Antioxidants", "Fiber"],
    rating: 4.93,
    reviewsCount: 42,
    stock: 45
  },
  {
    id: "c2",
    name: "Wellness Nut & Fig Assortment",
    category: "combos",
    price: 640,
    unit: "Deluxe Tin (750g)",
    description: "Gourmet dry fruits pack containing 250g Royal Almonds, 250g Pistachios, and 250g of Dried Figs. Comes in an air-locked tin.",
    imageUrl: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=600",
    badge: "Gifting Elite",
    nutrients: ["Calcium", "Healthy Fats", "Selenium", "Zinc"],
    rating: 4.9,
    reviewsCount: 88,
    stock: 20
  },
  {
    id: "p1",
    name: "Authentic Organic Green Banana Powder",
    category: "powders",
    price: 180,
    unit: "250g",
    description: "Prepared from elite green Nendran bananas near Nileshwar. Highly recommended as a highly-digestible prebiotic starch booster and direct ingredient for nutritious porridge baby foods.",
    imageUrl: "/src/assets/images/banana_powder_1780128423107.png",
    badge: "100% Prebiotic",
    nutrients: ["Resistant Starch", "Potassium Booster", "Prebiotics", "Vitamin B6"],
    rating: 4.92,
    reviewsCount: 78,
    stock: 40
  },
  {
    id: "p2",
    name: "Authentic Organic Beetroot Powder",
    category: "powders",
    price: 210,
    unit: "250g",
    description: "Ultra-fine dehydrated Crimson Glory Beetroot powder sourced directly from Karuvachery agrarian clusters. Adds instant iron, antioxidant coloring, and nitric oxide boost to your morning brews.",
    imageUrl: "/src/assets/images/beetroot_powder_1780128445441.png",
    badge: "Stamina Concentrate",
    nutrients: ["Active Nitrates", "Iron Boost", "Antioxidants", "Dietary Fiber"],
    rating: 4.89,
    reviewsCount: 92,
    stock: 45
  },
  {
    id: "p3",
    name: "Authentic Organic Carrot Powder",
    category: "powders",
    price: 195,
    unit: "250g",
    description: "Dehydrated at raw-safe cool temperatures to lock in optimal nutrition of our legendary Karuvachery Carrots. Concentrated bioavailable Beta-Carotene for flawless vision and holistic skin barriers.",
    imageUrl: "/src/assets/images/carrot_powder_1780128465347.png",
    badge: "Vitamin A Power",
    nutrients: ["Beta-Carotene", "Vitamin A", "Antioxidants", "Enzymes"],
    rating: 4.91,
    reviewsCount: 64,
    stock: 35
  },
  {
    id: "p4",
    name: "Authentic Organic Jackfruit Powder",
    category: "powders",
    price: 240,
    unit: "250g",
    description: "Handcrafted from premature green jackfruits from local trees of Kasaragod. Famed globally for maintaining blood sugar profiles, general digestive weight-checks, and clean raw fiber absorption.",
    imageUrl: "/src/assets/images/jackfruit_powder_1780128485642.png",
    badge: "Sugar Control",
    nutrients: ["Sugar Balance", "Soluble Fiber", "Low Glycemic", "Energy Booster"],
    rating: 4.95,
    reviewsCount: 110,
    stock: 50
  },
  {
    id: "p5",
    name: "Organic Baby Vitality Food (Green Banana & Sprouted Ragi Mix)",
    category: "powders",
    price: 220,
    unit: "250g",
    description: "100% natural organic superfood mix containing nutrient-dense raw Nileshwar green Nendran bananas and sprouted ragi (finger millet). Doctor recommended for weight gain and effortless infant growth.",
    imageUrl: "/src/assets/images/baby_food_1780128503806.png",
    badge: "Baby Safe 👶",
    nutrients: ["Natural Growth", "Bone Calcium", "Guaranteed 100% Organic", "Zero Added Sugar"],
    rating: 4.98,
    reviewsCount: 145,
    stock: 30
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Shaju Karuvachery",
    role: "Local Yoga Practitioner",
    text: "The combination of fresh beetroots and walnuts from KV Foods keeps my vitality high. The beetroots are incredibly clean and sweet compared to other normal markets around Nileshwar.",
    stars: 5,
    location: "Karuvachery"
  },
  {
    id: "t2",
    name: "Meera Nileshwaram",
    role: "Homemaker & Wellness Blogger",
    text: "I order the organic health powders weekly. My children love the natural sweetness of the green banana powder. Combining beetroots and almonds has become our family breakfast ritual!",
    stars: 5,
    location: "Nileshwar"
  },
  {
    id: "t3",
    name: "Dr. Anupama Nair",
    role: "Clinical Nutritionist",
    text: "I highly recommend my patients to shift to raw nuts and organic root vegetables for micronutrients. KV Foods is the only store bridging the gap with pristine local Nileshwar harvests.",
    stars: 5,
    location: "Kanhangad"
  }
];

export const LOCAL_HERITAGE_FACTS = [
  {
    title: "The Nileshwar Heritage",
    description: "Nileshwaram, the cultural capital of Kasaragod, is bounded by beautiful backwaters and rich alluvial hillsides. Our heritage farms thrive on clean water systems and natural compost cycles.",
    highlight: "Sourced locally within a 15km radius"
  },
  {
    title: "Karuvachery's Soil Purity",
    description: "Known for deep, moisture-retentive loamy red soils, Karuvachery gives crops like beetroots and organic wellness crops an unrivaled natural sweetness and mineral-packed structure.",
    highlight: "No synthetics, full earth-flavor"
  },
  {
    title: "Craft-grade Selection",
    description: "Our dry fruits are ethically sourced, calibrated for size, hand-sorted in dust-controlled packaging, and delivered sealed to maintain peak raw-fat integrity and crunch.",
    highlight: "Double quality certified"
  }
];
