// Initial product catalogue. Images are public placeholders;
// upload your own from the admin dashboard once Cloudinary is configured.
const IMG = {
  shirts:   'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=70',
  trousers: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=70',
  shoes:    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=70',
  headwears:'https://images.unsplash.com/photo-1620231150828-c5a8e1f33fce?auto=format&fit=crop&w=800&q=70',
  underwear:'https://images.unsplash.com/photo-1593030668930-8130abedd2f9?auto=format&fit=crop&w=800&q=70',
};
const desc = (s) => `${s} Crafted with premium fabric, finished in Lagos and built to wear daily.`;

export const SEED_PRODUCTS = [
  // Shirts
  { slug: 'sh-01', name: 'Ankara Print Button-Down', category: 'shirts', price: 14500, originalPrice: 18500, image: IMG.shirts, brand: 'Naija Threads', sizes: ['S','M','L','XL'], colors: ['Orange','Indigo'], isNew: true, description: desc('Bold ankara print button-down for owambe and everyday wear.') },
  { slug: 'sh-02', name: 'Lagos Linen Shirt — White', category: 'shirts', price: 14500, image: IMG.shirts, brand: 'Eko Tailors', sizes: ['M','L','XL','XXL'], colors: ['White'], description: desc('Breathable linen, tailored fit, perfect for Lagos heat.') },
  { slug: 'sh-03', name: 'Owambe Embroidered Agbada Top', category: 'shirts', price: 24000, originalPrice: 32000, image: IMG.shirts, brand: 'Royal Aso', sizes: ['L','XL','XXL'], colors: ['Cream','Sky'], description: desc('Hand-embroidered statement piece for ceremonies.') },
  { slug: 'sh-04', name: 'Senator Short-Sleeve — Navy', category: 'shirts', price: 22000, image: IMG.shirts, brand: 'Naija Threads', sizes: ['M','L','XL'], colors: ['Navy'], isNew: true, description: desc('Classic senator style with short sleeves.') },
  { slug: 'sh-05', name: 'Vintage Adire Camp Shirt', category: 'shirts', price: 16500, image: IMG.shirts, brand: 'Indigo Co.', sizes: ['S','M','L'], colors: ['Indigo'], description: desc('Hand-dyed adire on soft cotton.') },
  { slug: 'sh-06', name: 'Classic Oxford — Sky Blue', category: 'shirts', price: 12500, image: IMG.shirts, brand: 'Eko Tailors', sizes: ['S','M','L','XL'], colors: ['Sky'], description: desc('Everyday oxford for office or smart-casual.') },
  { slug: 'sh-07', name: 'Tie-Dye Resort Shirt', category: 'shirts', price: 15500, image: IMG.shirts, brand: 'Indigo Co.', sizes: ['M','L','XL'], colors: ['Blue','Cream'], isNew: true, description: desc('Lightweight resort shirt with relaxed silhouette.') },
  { slug: 'sh-08', name: 'Polo Pique — Black', category: 'shirts', price: 8500, originalPrice: 11000, image: IMG.shirts, brand: 'Naija Threads', sizes: ['S','M','L','XL','XXL'], colors: ['Black'], description: desc('Heavyweight pique cotton polo.') },
  { slug: 'sh-09', name: 'Kaftan Long-Sleeve — Olive', category: 'shirts', price: 24500, image: IMG.shirts, brand: 'Royal Aso', sizes: ['L','XL','XXL'], colors: ['Olive'], description: desc('Flowy kaftan with subtle embroidery.') },
  { slug: 'sh-10', name: 'Striped Casual Shirt — Burgundy', category: 'shirts', price: 13500, image: IMG.shirts, brand: 'Eko Tailors', sizes: ['S','M','L','XL'], colors: ['Burgundy'], description: desc('Vertical stripes, modern slim fit.') },
  // Trousers
  { slug: 'tr-01', name: 'Slim Fit Indigo Denim', category: 'trousers', price: 19500, image: IMG.trousers, brand: 'Lagos Denim', sizes: ['30','32','34','36'], colors: ['Indigo'], isNew: true, description: desc('Stretch indigo denim, slim through the leg.') },
  { slug: 'tr-02', name: 'Washed Light-Blue Jeans', category: 'trousers', price: 12500, originalPrice: 17500, image: IMG.trousers, brand: 'Lagos Denim', sizes: ['30','32','34'], colors: ['Light Blue'], description: desc('Vintage wash, regular fit.') },
  { slug: 'tr-03', name: 'Black Tailored Chinos', category: 'trousers', price: 15000, image: IMG.trousers, brand: 'Eko Tailors', sizes: ['30','32','34','36','38'], colors: ['Black'], description: desc('Office-ready chinos with clean lines.') },
  { slug: 'tr-04', name: 'Stone Washed Cargo Pants', category: 'trousers', price: 21000, image: IMG.trousers, brand: 'Naija Threads', sizes: ['32','34','36'], colors: ['Stone'], description: desc('Six-pocket cargo with reinforced stitch.') },
  { slug: 'tr-05', name: 'Senator Trouser — Cream', category: 'trousers', price: 18000, image: IMG.trousers, brand: 'Royal Aso', sizes: ['32','34','36','38'], colors: ['Cream'], description: desc('Match with senator top for a complete look.') },
  { slug: 'tr-06', name: 'Khaki Chinos — Slim', category: 'trousers', price: 14500, image: IMG.trousers, brand: 'Eko Tailors', sizes: ['30','32','34','36'], colors: ['Khaki'], description: desc('Versatile khakis for any occasion.') },
  { slug: 'tr-07', name: 'Black Skinny Jeans', category: 'trousers', price: 12000, originalPrice: 16500, image: IMG.trousers, brand: 'Lagos Denim', sizes: ['30','32','34'], colors: ['Black'], isNew: true, description: desc('High-stretch denim, skinny fit.') },
  { slug: 'tr-08', name: 'Wide-Leg Trouser — Olive', category: 'trousers', price: 19500, image: IMG.trousers, brand: 'Naija Threads', sizes: ['32','34','36'], colors: ['Olive'], description: desc('Modern wide-leg cut.') },
  { slug: 'tr-09', name: 'Pleated Dress Pant — Charcoal', category: 'trousers', price: 22000, image: IMG.trousers, brand: 'Eko Tailors', sizes: ['32','34','36','38'], colors: ['Charcoal'], description: desc('Crisp pleat, premium wool blend.') },
  { slug: 'tr-10', name: 'Distressed Denim — Mid Blue', category: 'trousers', price: 20500, image: IMG.trousers, brand: 'Lagos Denim', sizes: ['30','32','34','36'], colors: ['Mid Blue'], description: desc('Authentic distressed details.') },
  // Shoes
  { slug: 'sn-01', name: 'White Leather Low-Top', category: 'shoes', price: 36000, image: IMG.shoes, brand: 'Naija Threads', sizes: ['41','42','43','44'], colors: ['White'], isNew: true, description: desc('Minimal leather sneaker that goes with anything.') },
  { slug: 'sn-02', name: 'Burgundy Penny Loafers', category: 'shoes', price: 32000, originalPrice: 42000, image: IMG.shoes, brand: 'Aba Leatherworks', sizes: ['41','42','43','44','45'], colors: ['Burgundy'], description: desc('Hand-stitched penny loafers, full grain leather.') },
  { slug: 'sn-03', name: 'Brown Boat Shoes', category: 'shoes', price: 28000, image: IMG.shoes, brand: 'Aba Leatherworks', sizes: ['41','42','43'], colors: ['Brown'], description: desc('Classic boat shoes, weekend ready.') },
  { slug: 'sn-04', name: 'Court Sneakers — Cream', category: 'shoes', price: 31000, image: IMG.shoes, brand: 'Naija Threads', sizes: ['40','41','42','43','44'], colors: ['Cream'], description: desc('Retro court silhouette with cushioned sole.') },
  { slug: 'sn-05', name: 'Classic Chelsea Boots', category: 'shoes', price: 48000, image: IMG.shoes, brand: 'Aba Leatherworks', sizes: ['41','42','43','44'], colors: ['Black','Brown'], description: desc('Pull-on elastic Chelsea boots.') },
  { slug: 'sn-06', name: 'Suede Desert Boots', category: 'shoes', price: 39000, image: IMG.shoes, brand: 'Aba Leatherworks', sizes: ['41','42','43','44'], colors: ['Tan'], isNew: true, description: desc('Soft suede uppers with crepe sole.') },
  { slug: 'sn-07', name: 'Runner Trainers — Black', category: 'shoes', price: 34000, image: IMG.shoes, brand: 'Naija Threads', sizes: ['40','41','42','43','44','45'], colors: ['Black'], description: desc('Daily runners with breathable mesh.') },
  { slug: 'sn-08', name: 'Italian Derby — Dark Brown', category: 'shoes', price: 55000, image: IMG.shoes, brand: 'Aba Leatherworks', sizes: ['41','42','43','44'], colors: ['Dark Brown'], description: desc('Goodyear-welted derby for special occasions.') },
  { slug: 'sn-09', name: 'Slip-on Canvas — Navy', category: 'shoes', price: 13500, originalPrice: 18500, image: IMG.shoes, brand: 'Naija Threads', sizes: ['40','41','42','43','44'], colors: ['Navy'], description: desc('Easy slip-on canvas for casual days.') },
  { slug: 'sn-10', name: 'High-Top Sneaker — Off White', category: 'shoes', price: 37000, image: IMG.shoes, brand: 'Naija Threads', sizes: ['41','42','43','44'], colors: ['Off White'], description: desc('Padded high-top with ankle support.') },
  // Headwears
  { slug: 'hw-01', name: 'Yoruba Fila — Crimson', category: 'headwears', price: 8500, image: IMG.headwears, brand: 'Royal Aso', sizes: ['One Size'], colors: ['Red'], isNew: true, description: desc('Traditional Yoruba fila in rich crimson velvet.') },
  { slug: 'hw-02', name: 'Embroidered Hausa Cap', category: 'headwears', price: 8500, originalPrice: 12500, image: IMG.headwears, brand: 'Royal Aso', sizes: ['One Size'], colors: ['Black','Gold'], description: desc('Intricately embroidered Hausa cap.') },
  { slug: 'hw-03', name: 'Matte Black Snapback', category: 'headwears', price: 6500, image: IMG.headwears, brand: 'Naija Threads', sizes: ['One Size'], colors: ['Black'], description: desc('Flat brim snapback with structured crown.') },
  { slug: 'hw-04', name: 'Aso-Oke Patterned Cap', category: 'headwears', price: 9500, image: IMG.headwears, brand: 'Indigo Co.', sizes: ['One Size'], colors: ['Indigo','Gold'], description: desc('Aso-oke woven cap with gold trim.') },
  { slug: 'hw-05', name: 'Igbo Okpu Agu Hat', category: 'headwears', price: 11500, image: IMG.headwears, brand: 'Royal Aso', sizes: ['One Size'], colors: ['Red','Black'], description: desc('Traditional Igbo chieftaincy-style hat.') },
  { slug: 'hw-06', name: 'Woven Beach Hat', category: 'headwears', price: 7500, image: IMG.headwears, brand: 'Naija Threads', sizes: ['One Size'], colors: ['Natural'], isNew: true, description: desc('Wide-brim woven hat for the sun.') },
  { slug: 'hw-07', name: 'Dad Cap — Stone Wash', category: 'headwears', price: 3500, originalPrice: 5500, image: IMG.headwears, brand: 'Naija Threads', sizes: ['One Size'], colors: ['Stone'], description: desc('Soft unstructured dad cap.') },
  { slug: 'hw-08', name: 'Knit Beanie — Charcoal', category: 'headwears', price: 4500, image: IMG.headwears, brand: 'Naija Threads', sizes: ['One Size'], colors: ['Charcoal'], description: desc('Warm ribbed knit beanie.') },
  { slug: 'hw-09', name: 'Fila Aso-Oke — Royal Blue', category: 'headwears', price: 9500, image: IMG.headwears, brand: 'Royal Aso', sizes: ['One Size'], colors: ['Royal Blue'], description: desc('Royal blue aso-oke fila with gold thread.') },
  { slug: 'hw-10', name: 'Bucket Hat — Olive', category: 'headwears', price: 6500, image: IMG.headwears, brand: 'Indigo Co.', sizes: ['One Size'], colors: ['Olive'], description: desc('All-day bucket hat in olive twill.') },
  // Underwear
  { slug: 'uw-01', name: 'Cotton Boxer Briefs — 3 Pack', category: 'underwear', price: 6900, originalPrice: 9500, image: IMG.underwear, brand: 'Naija Threads', sizes: ['S','M','L','XL'], colors: ['Black','Gray'], isNew: true, description: desc('Soft cotton with stretch waistband. 3-pack.') },
  { slug: 'uw-02', name: 'Classic White Undershirt', category: 'underwear', price: 4500, image: IMG.underwear, brand: 'Naija Threads', sizes: ['M','L','XL'], colors: ['White'], description: desc('Lightweight crew-neck undershirt.') },
  { slug: 'uw-03', name: 'Premium Modal Trunks', category: 'underwear', price: 6500, image: IMG.underwear, brand: 'Eko Tailors', sizes: ['S','M','L'], colors: ['Black'], description: desc('Buttery modal blend trunks.') },
  { slug: 'uw-04', name: 'Heather Gray Boxer Set', category: 'underwear', price: 7500, image: IMG.underwear, brand: 'Naija Threads', sizes: ['M','L','XL'], colors: ['Gray'], description: desc('Comfortable boxers in heather gray.') },
  { slug: 'uw-05', name: 'Athletic Brief — Navy', category: 'underwear', price: 5500, image: IMG.underwear, brand: 'Naija Threads', sizes: ['S','M','L','XL'], colors: ['Navy'], description: desc('Supportive athletic brief.') },
  { slug: 'uw-06', name: 'Bamboo Boxer Briefs', category: 'underwear', price: 4900, originalPrice: 7000, image: IMG.underwear, brand: 'Eko Tailors', sizes: ['M','L','XL'], colors: ['Black','Olive'], isNew: true, description: desc('Sustainable bamboo fiber, ultra-soft.') },
  { slug: 'uw-07', name: 'Long-Sleeve Thermal Top', category: 'underwear', price: 8500, image: IMG.underwear, brand: 'Naija Threads', sizes: ['M','L','XL'], colors: ['Black'], description: desc('Warm thermal layer for cool nights.') },
  { slug: 'uw-08', name: 'Tank Undershirt — 2 Pack', category: 'underwear', price: 5000, image: IMG.underwear, brand: 'Naija Threads', sizes: ['S','M','L','XL'], colors: ['White'], description: desc('Classic tank undershirt, two pack.') },
  { slug: 'uw-09', name: 'Striped Lounge Shorts', category: 'underwear', price: 6500, image: IMG.underwear, brand: 'Naija Threads', sizes: ['M','L','XL'], colors: ['Navy','Cream'], description: desc('Soft lounge shorts for at home.') },
  { slug: 'uw-10', name: 'Premium Boxer Briefs — Black', category: 'underwear', price: 5500, image: IMG.underwear, brand: 'Eko Tailors', sizes: ['S','M','L','XL'], colors: ['Black'], description: desc('Single premium black boxer brief.') },
];