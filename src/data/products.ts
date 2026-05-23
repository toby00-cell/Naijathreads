import shirts from "@/assets/cat-shirts.jpg";
import trousers from "@/assets/cat-trousers.jpg";
import shoes from "@/assets/cat-shoes.jpg";
import headwear from "@/assets/cat-headwear.jpg";
import underwear from "@/assets/cat-underwear.jpg";

export type Category = "shirts" | "trousers" | "shoes" | "headwears" | "underwear";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number; // NGN
  originalPrice?: number; // when set, item is on sale
  image: string;
  brand: string;
  sizes: string[];
  colors: string[];
  description?: string;
  isNew?: boolean;
};

export const CATEGORIES: { slug: Category; label: string; image: string; path: "/shirts" | "/trousers" | "/shoes" | "/headwears" | "/underwear" }[] = [
  { slug: "shirts", label: "Shirts", image: shirts, path: "/shirts" },
  { slug: "trousers", label: "Trousers / Jeans", image: trousers, path: "/trousers" },
  { slug: "shoes", label: "Shoes", image: shoes, path: "/shoes" },
  { slug: "headwears", label: "Headwears", image: headwear, path: "/headwears" },
  { slug: "underwear", label: "Underwear", image: underwear, path: "/underwear" },
];

const img: Record<Category, string> = { shirts, trousers, shoes, headwears: headwear, underwear };

const desc = (s: string) => `${s} Crafted with premium fabric, finished in Lagos and built to wear daily.`;

export const PRODUCTS: Product[] = [
  // ===== Shirts (10) =====
  { id: "sh-01", name: "Ankara Print Button-Down", category: "shirts", price: 14500, originalPrice: 18500, image: img.shirts, brand: "Naija Threads", sizes: ["S","M","L","XL"], colors: ["Orange","Indigo"], isNew: true, description: desc("Bold ankara print button-down for owambe and everyday wear.") },
  { id: "sh-02", name: "Lagos Linen Shirt — White", category: "shirts", price: 14500, image: img.shirts, brand: "Eko Tailors", sizes: ["M","L","XL","XXL"], colors: ["White"], description: desc("Breathable linen, tailored fit, perfect for Lagos heat.") },
  { id: "sh-03", name: "Owambe Embroidered Agbada Top", category: "shirts", price: 24000, originalPrice: 32000, image: img.shirts, brand: "Royal Aso", sizes: ["L","XL","XXL"], colors: ["Cream","Sky"], description: desc("Hand-embroidered, statement piece for ceremonies.") },
  { id: "sh-04", name: "Senator Short-Sleeve — Navy", category: "shirts", price: 22000, image: img.shirts, brand: "Naija Threads", sizes: ["M","L","XL"], colors: ["Navy"], isNew: true, description: desc("Classic senator style with short sleeves.") },
  { id: "sh-05", name: "Vintage Adire Camp Shirt", category: "shirts", price: 16500, image: img.shirts, brand: "Indigo Co.", sizes: ["S","M","L"], colors: ["Indigo"], description: desc("Hand-dyed adire on soft cotton.") },
  { id: "sh-06", name: "Classic Oxford — Sky Blue", category: "shirts", price: 12500, image: img.shirts, brand: "Eko Tailors", sizes: ["S","M","L","XL"], colors: ["Sky"], description: desc("Everyday oxford for office or smart-casual.") },
  { id: "sh-07", name: "Tie-Dye Resort Shirt", category: "shirts", price: 15500, image: img.shirts, brand: "Indigo Co.", sizes: ["M","L","XL"], colors: ["Blue","Cream"], isNew: true, description: desc("Lightweight resort shirt with relaxed silhouette.") },
  { id: "sh-08", name: "Polo Pique — Black", category: "shirts", price: 8500, originalPrice: 11000, image: img.shirts, brand: "Naija Threads", sizes: ["S","M","L","XL","XXL"], colors: ["Black"], description: desc("Heavyweight pique cotton polo.") },
  { id: "sh-09", name: "Kaftan Long-Sleeve — Olive", category: "shirts", price: 24500, image: img.shirts, brand: "Royal Aso", sizes: ["L","XL","XXL"], colors: ["Olive"], description: desc("Flowy kaftan with subtle embroidery.") },
  { id: "sh-10", name: "Striped Casual Shirt — Burgundy", category: "shirts", price: 13500, image: img.shirts, brand: "Eko Tailors", sizes: ["S","M","L","XL"], colors: ["Burgundy"], description: desc("Vertical stripes, modern slim fit.") },

  // ===== Trousers (10) =====
  { id: "tr-01", name: "Slim Fit Indigo Denim", category: "trousers", price: 19500, image: img.trousers, brand: "Lagos Denim", sizes: ["30","32","34","36"], colors: ["Indigo"], isNew: true, description: desc("Stretch indigo denim, slim through the leg.") },
  { id: "tr-02", name: "Washed Light-Blue Jeans", category: "trousers", price: 12500, originalPrice: 17500, image: img.trousers, brand: "Lagos Denim", sizes: ["30","32","34"], colors: ["Light Blue"], description: desc("Vintage wash, regular fit.") },
  { id: "tr-03", name: "Black Tailored Chinos", category: "trousers", price: 15000, image: img.trousers, brand: "Eko Tailors", sizes: ["30","32","34","36","38"], colors: ["Black"], description: desc("Office-ready chinos with clean lines.") },
  { id: "tr-04", name: "Stone Washed Cargo Pants", category: "trousers", price: 21000, image: img.trousers, brand: "Naija Threads", sizes: ["32","34","36"], colors: ["Stone"], description: desc("Six-pocket cargo with reinforced stitch.") },
  { id: "tr-05", name: "Senator Trouser — Cream", category: "trousers", price: 18000, image: img.trousers, brand: "Royal Aso", sizes: ["32","34","36","38"], colors: ["Cream"], description: desc("Match with senator top for a complete look.") },
  { id: "tr-06", name: "Khaki Chinos — Slim", category: "trousers", price: 14500, image: img.trousers, brand: "Eko Tailors", sizes: ["30","32","34","36"], colors: ["Khaki"], description: desc("Versatile khakis for any occasion.") },
  { id: "tr-07", name: "Black Skinny Jeans", category: "trousers", price: 12000, originalPrice: 16500, image: img.trousers, brand: "Lagos Denim", sizes: ["30","32","34"], colors: ["Black"], isNew: true, description: desc("High-stretch denim, skinny fit.") },
  { id: "tr-08", name: "Wide-Leg Trouser — Olive", category: "trousers", price: 19500, image: img.trousers, brand: "Naija Threads", sizes: ["32","34","36"], colors: ["Olive"], description: desc("Modern wide-leg cut.") },
  { id: "tr-09", name: "Pleated Dress Pant — Charcoal", category: "trousers", price: 22000, image: img.trousers, brand: "Eko Tailors", sizes: ["32","34","36","38"], colors: ["Charcoal"], description: desc("Crisp pleat, premium wool blend.") },
  { id: "tr-10", name: "Distressed Denim — Mid Blue", category: "trousers", price: 20500, image: img.trousers, brand: "Lagos Denim", sizes: ["30","32","34","36"], colors: ["Mid Blue"], description: desc("Authentic distressed details.") },

  // ===== Shoes (10) =====
  { id: "sn-01", name: "White Leather Low-Top", category: "shoes", price: 36000, image: img.shoes, brand: "Naija Threads", sizes: ["41","42","43","44"], colors: ["White"], isNew: true, description: desc("Minimal leather sneaker that goes with anything.") },
  { id: "sn-02", name: "Burgundy Penny Loafers", category: "shoes", price: 32000, originalPrice: 42000, image: img.shoes, brand: "Aba Leatherworks", sizes: ["41","42","43","44","45"], colors: ["Burgundy"], description: desc("Hand-stitched penny loafers, full grain leather.") },
  { id: "sn-03", name: "Brown Boat Shoes", category: "shoes", price: 28000, image: img.shoes, brand: "Aba Leatherworks", sizes: ["41","42","43"], colors: ["Brown"], description: desc("Classic boat shoes, weekend ready.") },
  { id: "sn-04", name: "Court Sneakers — Cream", category: "shoes", price: 31000, image: img.shoes, brand: "Naija Threads", sizes: ["40","41","42","43","44"], colors: ["Cream"], description: desc("Retro court silhouette with cushioned sole.") },
  { id: "sn-05", name: "Classic Chelsea Boots", category: "shoes", price: 48000, image: img.shoes, brand: "Aba Leatherworks", sizes: ["41","42","43","44"], colors: ["Black","Brown"], description: desc("Pull-on elastic Chelsea boots.") },
  { id: "sn-06", name: "Suede Desert Boots", category: "shoes", price: 39000, image: img.shoes, brand: "Aba Leatherworks", sizes: ["41","42","43","44"], colors: ["Tan"], isNew: true, description: desc("Soft suede uppers with crepe sole.") },
  { id: "sn-07", name: "Runner Trainers — Black", category: "shoes", price: 34000, image: img.shoes, brand: "Naija Threads", sizes: ["40","41","42","43","44","45"], colors: ["Black"], description: desc("Daily runners with breathable mesh.") },
  { id: "sn-08", name: "Italian Derby — Dark Brown", category: "shoes", price: 55000, image: img.shoes, brand: "Aba Leatherworks", sizes: ["41","42","43","44"], colors: ["Dark Brown"], description: desc("Goodyear-welted derby for special occasions.") },
  { id: "sn-09", name: "Slip-on Canvas — Navy", category: "shoes", price: 13500, originalPrice: 18500, image: img.shoes, brand: "Naija Threads", sizes: ["40","41","42","43","44"], colors: ["Navy"], description: desc("Easy slip-on canvas for casual days.") },
  { id: "sn-10", name: "High-Top Sneaker — Off White", category: "shoes", price: 37000, image: img.shoes, brand: "Naija Threads", sizes: ["41","42","43","44"], colors: ["Off White"], description: desc("Padded high-top with ankle support.") },

  // ===== Headwears (10) =====
  { id: "hw-01", name: "Yoruba Fila — Crimson", category: "headwears", price: 8500, image: img.headwears, brand: "Royal Aso", sizes: ["One Size"], colors: ["Red"], isNew: true, description: desc("Traditional Yoruba fila in rich crimson velvet.") },
  { id: "hw-02", name: "Embroidered Hausa Cap", category: "headwears", price: 8500, originalPrice: 12500, image: img.headwears, brand: "Royal Aso", sizes: ["One Size"], colors: ["Black","Gold"], description: desc("Intricately embroidered Hausa cap.") },
  { id: "hw-03", name: "Matte Black Snapback", category: "headwears", price: 6500, image: img.headwears, brand: "Naija Threads", sizes: ["One Size"], colors: ["Black"], description: desc("Flat brim snapback with structured crown.") },
  { id: "hw-04", name: "Aso-Oke Patterned Cap", category: "headwears", price: 9500, image: img.headwears, brand: "Indigo Co.", sizes: ["One Size"], colors: ["Indigo","Gold"], description: desc("Aso-oke woven cap with gold trim.") },
  { id: "hw-05", name: "Igbo Okpu Agu Hat", category: "headwears", price: 11500, image: img.headwears, brand: "Royal Aso", sizes: ["One Size"], colors: ["Red","Black"], description: desc("Traditional Igbo chieftaincy-style hat.") },
  { id: "hw-06", name: "Woven Beach Hat", category: "headwears", price: 7500, image: img.headwears, brand: "Naija Threads", sizes: ["One Size"], colors: ["Natural"], isNew: true, description: desc("Wide-brim woven hat for the sun.") },
  { id: "hw-07", name: "Dad Cap — Stone Wash", category: "headwears", price: 3500, originalPrice: 5500, image: img.headwears, brand: "Naija Threads", sizes: ["One Size"], colors: ["Stone"], description: desc("Soft unstructured dad cap.") },
  { id: "hw-08", name: "Knit Beanie — Charcoal", category: "headwears", price: 4500, image: img.headwears, brand: "Naija Threads", sizes: ["One Size"], colors: ["Charcoal"], description: desc("Warm ribbed knit beanie.") },
  { id: "hw-09", name: "Fila Aso-Oke — Royal Blue", category: "headwears", price: 9500, image: img.headwears, brand: "Royal Aso", sizes: ["One Size"], colors: ["Royal Blue"], description: desc("Royal blue aso-oke fila with gold thread.") },
  { id: "hw-10", name: "Bucket Hat — Olive", category: "headwears", price: 6500, image: img.headwears, brand: "Indigo Co.", sizes: ["One Size"], colors: ["Olive"], description: desc("All-day bucket hat in olive twill.") },

  // ===== Underwear (10) =====
  { id: "uw-01", name: "Cotton Boxer Briefs — 3 Pack", category: "underwear", price: 6900, originalPrice: 9500, image: img.underwear, brand: "Naija Threads", sizes: ["S","M","L","XL"], colors: ["Black","Gray"], isNew: true, description: desc("Soft cotton with stretch waistband. 3-pack.") },
  { id: "uw-02", name: "Classic White Undershirt", category: "underwear", price: 4500, image: img.underwear, brand: "Naija Threads", sizes: ["M","L","XL"], colors: ["White"], description: desc("Lightweight crew-neck undershirt.") },
  { id: "uw-03", name: "Premium Modal Trunks", category: "underwear", price: 6500, image: img.underwear, brand: "Eko Tailors", sizes: ["S","M","L"], colors: ["Black"], description: desc("Buttery modal blend trunks.") },
  { id: "uw-04", name: "Heather Gray Boxer Set", category: "underwear", price: 7500, image: img.underwear, brand: "Naija Threads", sizes: ["M","L","XL"], colors: ["Gray"], description: desc("Comfortable boxers in heather gray.") },
  { id: "uw-05", name: "Athletic Brief — Navy", category: "underwear", price: 5500, image: img.underwear, brand: "Naija Threads", sizes: ["S","M","L","XL"], colors: ["Navy"], description: desc("Supportive athletic brief.") },
  { id: "uw-06", name: "Bamboo Boxer Briefs", category: "underwear", price: 4900, originalPrice: 7000, image: img.underwear, brand: "Eko Tailors", sizes: ["M","L","XL"], colors: ["Black","Olive"], isNew: true, description: desc("Sustainable bamboo fiber, ultra-soft.") },
  { id: "uw-07", name: "Long-Sleeve Thermal Top", category: "underwear", price: 8500, image: img.underwear, brand: "Naija Threads", sizes: ["M","L","XL"], colors: ["Black"], description: desc("Warm thermal layer for cool nights.") },
  { id: "uw-08", name: "Tank Undershirt — 2 Pack", category: "underwear", price: 5000, image: img.underwear, brand: "Naija Threads", sizes: ["S","M","L","XL"], colors: ["White"], description: desc("Classic tank undershirt, two pack.") },
  { id: "uw-09", name: "Striped Lounge Shorts", category: "underwear", price: 6500, image: img.underwear, brand: "Naija Threads", sizes: ["M","L","XL"], colors: ["Navy","Cream"], description: desc("Soft lounge shorts for at home.") },
  { id: "uw-10", name: "Premium Boxer Briefs — Black", category: "underwear", price: 5500, image: img.underwear, brand: "Eko Tailors", sizes: ["S","M","L","XL"], colors: ["Black"], description: desc("Single premium black boxer brief.") },
];

export const formatNGN = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const relatedProducts = (id: string, limit = 4) => {
  const p = getProduct(id);
  if (!p) return [];
  return PRODUCTS.filter((x) => x.category === p.category && x.id !== id).slice(0, limit);
};
