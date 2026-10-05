export interface Product {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  format: "squeeze" | "glass" | "can" | "spray";
  category: "all" | "olive-oil" | "bundles" | "gifts";
  badge?: string;
  image: string;
  hoverImage?: string;
  description: string;
  tastingNotes: string[];
  harvestDate: string;
  acidity: string;
  smokePoint: string;
  origin: string;
  oliveVariety: string;
  inStock: boolean;
  nutritionFacts: {
    servingSize: string;
    servingsPerContainer: string;
    calories: number;
    totalFat: string;
    saturatedFat: string;
    polyunsaturatedFat: string;
    monounsaturatedFat: string;
    transFat: string;
    sodium: string;
    totalCarb: string;
    protein: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: "goya-squeeze-drizzle",
    title: "“El Squeeze” Finishing Oil",
    subtitle: "Extra Virgin Finishing Oil",
    tagline: "Bold, peppery, early-harvest Picual & Hojiblanca olives.",
    price: 18,
    originalPrice: 20,
    format: "squeeze",
    category: "olive-oil",
    badge: "Fan Favorite",
    image: "/images/goya-squeeze-drizzle.jpg",
    hoverImage: "/images/goya-front.jpeg",
    description: "The oil that changed pantry history. Cold pressed in Andalusia, Spain within hours of harvest. Squeezed fresh over burrata, crusty sourdough, sizzling garlic shrimp, and garden salads. Never heated, never blended with refined junk.",
    tastingNotes: ["Fresh cut grass", "Peppery kick", "Green artichoke", "Wild herbs"],
    harvestDate: "November 2025 Early Harvest",
    acidity: "< 0.38% (World Class Standard)",
    smokePoint: "410°F (Raw & Finishing Perfection)",
    origin: "Andalusia, Spain (Jaén & Seville)",
    oliveVariety: "100% Picual & Hojiblanca",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (15mL)",
      servingsPerContainer: "About 32",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      polyunsaturatedFat: "1.5g",
      monounsaturatedFat: "10g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-duo-pack",
    title: "“El Dúo Andaluz”",
    subtitle: "Squeeze + Classic Glass Pair",
    tagline: "One for countertop finishing, one for dining table prestige.",
    price: 34,
    originalPrice: 38,
    format: "squeeze",
    category: "bundles",
    badge: "Best Value",
    image: "/images/goya-double.jpeg",
    hoverImage: "/images/goya-squeeze-drizzle.jpg",
    description: "The ultimate Spanish countertop dynamic duo. Includes our high-precision squeeze bottle for generous glugs on the stove, alongside our iconic embossed Andalusian glass bottle for finishing dishes at the table. Double the cold-pressed liquid gold.",
    tastingNotes: ["Green olive", "Peppery finish", "Golden almond", "Floral herbs"],
    harvestDate: "Harvested in Andalusia, Spain",
    acidity: "Max 0.4% First Cold Press",
    smokePoint: "420°F",
    origin: "Seville & Cordoba, Spain",
    oliveVariety: "Picual, Arbequina & Hojiblanca",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (15mL)",
      servingsPerContainer: "About 64 (Total)",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      polyunsaturatedFat: "1.5g",
      monounsaturatedFat: "10g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-classic-glass",
    title: "“El Clásico” Glass Bottle",
    subtitle: "First Cold Press Extra Virgin",
    tagline: "The legendary bottle crowned with dozens of world gold medals.",
    price: 16,
    format: "glass",
    category: "olive-oil",
    badge: "Award Winner",
    image: "/images/goya-front.jpeg",
    hoverImage: "/images/goya-side.jpeg",
    description: "The benchmark of Spanish Extra Virgin Olive Oil. Sourced from the rolling groves of Andalusia with our built-in pour spout cap for slow, controlled glugs. Winner of the Mario Solinas Quality Award and Superior Taste Award.",
    tastingNotes: ["Fruity apple", "Ripe tomato vine", "Balanced almond", "Subtle pepper"],
    harvestDate: "Winter Harvest",
    acidity: "< 0.4% Maximum Acidity",
    smokePoint: "410°F",
    origin: "Andalusia, Spain",
    oliveVariety: "Selected Andalusian Olives",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (15mL)",
      servingsPerContainer: "About 33",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      polyunsaturatedFat: "1.5g",
      monounsaturatedFat: "10g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-starter-kit",
    title: "The “Spanish Starter Kit”",
    subtitle: "Duo Bottles, 2 Refill Cans, & Gold Spout",
    tagline: "Everything you need to turn everyday cooking into an Andalusian fiesta.",
    price: 65,
    originalPrice: 82,
    format: "can",
    category: "bundles",
    badge: "Save $17",
    image: "/images/products/goya-starter-kit.jpg",
    hoverImage: "/images/products/goya-gift-set.jpg",
    description: "The complete setup for serious home chefs. Contains: 1x 'El Squeeze' bottle, 1x 'El Clásico' glass bottle, 2x 750mL aluminum refill cans to keep your oil fresh from UV light, plus our weighted brass pourer.",
    tastingNotes: ["Full spectrum", "Vibrant pepper", "Golden fruit", "Silky finish"],
    harvestDate: "Current Vintage",
    acidity: "< 0.4%",
    smokePoint: "410°F - 425°F",
    origin: "Andalusia, Spain",
    oliveVariety: "Picual & Hojiblanca",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (15mL)",
      servingsPerContainer: "Over 160 Servings",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      polyunsaturatedFat: "1.5g",
      monounsaturatedFat: "10g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-duo-glass",
    title: "“The Duo” Glass Set",
    subtitle: "Drizzle & Cooking Glass Duo",
    tagline: "Two heavyweight glass flagships for countertop elegance.",
    price: 36,
    originalPrice: 42,
    format: "glass",
    category: "bundles",
    image: "/images/products/goya-duo-glass.jpg",
    hoverImage: "/images/goya-double.jpeg",
    description: "Two 500mL heavy glass bottles dressed in Spanish crests and built-in flow spouts. Keep one near your stove for sizzling garlic, and one on the counter for crusty sourdough and burrata.",
    tastingNotes: ["Balanced herbaceous", "Nutty finish", "Sweet green fruit"],
    harvestDate: "2025/2026 Season",
    acidity: "< 0.4%",
    smokePoint: "415°F",
    origin: "Andalusia, Spain",
    oliveVariety: "Spanish Olive Blend",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (15mL)",
      servingsPerContainer: "66",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      polyunsaturatedFat: "1.5g",
      monounsaturatedFat: "10g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-refill-can",
    title: "“Lata de Oro” Refill Can",
    subtitle: "750mL UV-Blocking Refill Tin",
    tagline: "Keeps oil fresher, longer. Zero light penetration.",
    price: 17,
    format: "can",
    category: "olive-oil",
    badge: "Eco-Friendly",
    image: "/images/products/goya-refill-can.jpg",
    hoverImage: "/images/products/goya-refill-can-duo.jpg",
    description: "Olive oil's three enemies are light, heat, and oxygen. Our 100% recyclable vintage aluminum tin blocks all UV rays, locking in Polyphenols and fresh-crushed olive aroma until the final glug into your squeeze bottle.",
    tastingNotes: ["Lush grassy green", "Peppery tingle", "Artichoke heart"],
    harvestDate: "December Harvest",
    acidity: "< 0.35%",
    smokePoint: "420°F",
    origin: "Jaén, Spain",
    oliveVariety: "100% Picual",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (15mL)",
      servingsPerContainer: "50",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      polyunsaturatedFat: "1.5g",
      monounsaturatedFat: "10g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-cooking-spray",
    title: "“Sabor & Fuego” Cooking Spray",
    subtitle: "100% Spanish EVOO Non-Aerosol Mist",
    tagline: "Air-fryer's best friend. No propellants, no chemicals.",
    price: 8,
    format: "spray",
    category: "olive-oil",
    badge: "Air-Fryer Essential",
    image: "/images/products/goya-cooking-spray.jpg",
    hoverImage: "/images/products/goya-spray-action.jpg",
    description: "Pure Extra Virgin Spanish Olive Oil delivered in a triple-action trigger spray: mist, stream, or drip. Zero aerosol gases, zero chemicals, pure high-heat cooking power for sheet pans, roasting veggies, and grill grates.",
    tastingNotes: ["Clean olive", "Crisp finish", "Delicate herbs"],
    harvestDate: "Single Season",
    acidity: "< 0.5%",
    smokePoint: "410°F",
    origin: "Andalusia, Spain",
    oliveVariety: "Arbequina & Hojiblanca",
    inStock: true,
    nutritionFacts: {
      servingSize: "About 1/4 second spray",
      servingsPerContainer: "Over 500",
      calories: 0,
      totalFat: "0g",
      saturatedFat: "0g",
      polyunsaturatedFat: "0g",
      monounsaturatedFat: "0g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-bag-in-box",
    title: "“Caja de Oro” 3L Bag in Box",
    subtitle: "3000mL Continuous Flow Pantry Box",
    tagline: "For serious paella masters and everyday olive oil guzzlers.",
    price: 36,
    originalPrice: 44,
    format: "can",
    category: "bundles",
    badge: "Best Value / Fl Oz",
    image: "/images/products/goya-bag-in-box.jpg",
    hoverImage: "/images/products/goya-refill-can.jpg",
    description: "Never run dry mid-recipe. 3 liters of Andalusian liquid gold fitted with an airtight zero-oxygen tap. Stays harvest-fresh down to the very last drop because air never touches the oil.",
    tastingNotes: ["Golden buttery richness", "Mild grass", "Gentle pepper"],
    harvestDate: "Autumn Harvest",
    acidity: "< 0.4%",
    smokePoint: "415°F",
    origin: "Andalusia, Spain",
    oliveVariety: "Spanish Estate Blend",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (15mL)",
      servingsPerContainer: "200",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      polyunsaturatedFat: "1.5g",
      monounsaturatedFat: "10g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-mayo-squeeze",
    title: "“Original” EVOO Mayo Squeeze",
    subtitle: "100% Spanish Olive Oil Mayonnaise",
    tagline: "Whipped exclusively with Goya Extra Virgin. Zero seed oils.",
    price: 9,
    format: "squeeze",
    category: "gifts",
    badge: "Zero Seed Oils",
    image: "/images/products/goya-mayo.jpg",
    hoverImage: "/images/products/goya-aioli.jpg",
    description: "The mayonnaise you won't feel guilty about drenching your sandwich in. Made with pasture-raised egg yolks, a squeeze of lemon juice, sea salt, and 100% cold-pressed Goya Extra Virgin Olive Oil. No canola, no soybean, no garbage.",
    tastingNotes: ["Rich custard cream", "Bright lemon", "Fruity olive finish"],
    harvestDate: "Freshly Made Batch",
    acidity: "Balanced & Bright",
    smokePoint: "Cold Spread",
    origin: "Andalusia, Spain",
    oliveVariety: "Arbequina EVOO",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (14g)",
      servingsPerContainer: "30",
      calories: 100,
      totalFat: "11g",
      saturatedFat: "1.5g",
      polyunsaturatedFat: "1g",
      monounsaturatedFat: "8g",
      transFat: "0g",
      sodium: "90mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-garlic-aioli",
    title: "“Alioli de Ajo” Squeeze",
    subtitle: "Authentic Catalan Garlic & EVOO Squeeze",
    tagline: "Roasted Spanish purple garlic whipped with liquid gold.",
    price: 9,
    format: "squeeze",
    category: "gifts",
    badge: "Tapas Essential",
    image: "/images/products/goya-aioli.jpg",
    hoverImage: "/images/products/goya-mayo.jpg",
    description: "Inspired by the rustic tapas bars of Barcelona and Seville. Roasted whole heads of garlic folded into creamy emulsion with Goya Extra Virgin Olive Oil. Slather on patatas bravas, grilled skirt steak, and crusty baguettes.",
    tastingNotes: ["Roasted sweet garlic", "Bold olive pepper", "Sea salt zing"],
    harvestDate: "Fresh Kitchen Batch",
    acidity: "Zesty & Savory",
    smokePoint: "Dip & Drizzle",
    origin: "Catalonia & Andalusia",
    oliveVariety: "Hojiblanca EVOO",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (14g)",
      servingsPerContainer: "30",
      calories: 100,
      totalFat: "11g",
      saturatedFat: "1.5g",
      polyunsaturatedFat: "1g",
      monounsaturatedFat: "8g",
      transFat: "0g",
      sodium: "105mg",
      totalCarb: "1g",
      protein: "0g"
    }
  },
  {
    id: "goya-gift-set",
    title: "The “Andalusian Gift Set”",
    subtitle: "Duo Olive Oil in Illustrated Gift Box",
    tagline: "The gift that never gets regifted. Instant pantry elevation.",
    price: 42,
    originalPrice: 48,
    format: "glass",
    category: "gifts",
    badge: "Holiday Favorite",
    image: "/images/products/goya-gift-set.jpg",
    hoverImage: "/images/products/goya-starter-kit.jpg",
    description: "Packed in a bespoke illustrated box commemorating the Andalusian olive harvest. Includes one bottle of early harvest peppery finishing oil and one bottle of golden sauté oil, wrapped with Spanish recipe cards.",
    tastingNotes: ["Herbal complexity", "Peppery zing", "Mellow almond"],
    harvestDate: "Holiday Reserve",
    acidity: "< 0.35%",
    smokePoint: "415°F",
    origin: "Jaén & Seville, Spain",
    oliveVariety: "Handpicked Andalusian Olives",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (15mL)",
      servingsPerContainer: "64",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      polyunsaturatedFat: "1.5g",
      monounsaturatedFat: "10g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  },
  {
    id: "goya-jug-2l",
    title: "“Garrafa Gigante” 2L Jug",
    subtitle: "High Heat Cooking & Frying Olive Oil",
    tagline: "For deep frying churros, patatas bravas, and giant feasts.",
    price: 33,
    format: "glass",
    category: "olive-oil",
    image: "/images/products/goya-jug-2l.jpg",
    hoverImage: "/images/products/goya-duo-glass.jpg",
    description: "When a squeeze bottle isn't enough. Our 2-liter culinary jug is designed for high-heat frying, braising, and big backyard cooking. High smoke point with authentic Spanish olive character.",
    tastingNotes: ["Mellow olive", "Buttery body", "Clean finish"],
    harvestDate: "Main Harvest",
    acidity: "< 0.8%",
    smokePoint: "435°F (High Heat Certified)",
    origin: "Andalusia, Spain",
    oliveVariety: "Spanish Olive Blend",
    inStock: true,
    nutritionFacts: {
      servingSize: "1 Tbsp (15mL)",
      servingsPerContainer: "133",
      calories: 120,
      totalFat: "14g",
      saturatedFat: "2g",
      polyunsaturatedFat: "1.5g",
      monounsaturatedFat: "10g",
      transFat: "0g",
      sodium: "0mg",
      totalCarb: "0g",
      protein: "0g"
    }
  }
];

export const REVIEWS = [
  {
    author: "Elena Rostova",
    location: "Brooklyn, NY",
    rating: 5,
    title: "Replaced every single oil in my cabinet.",
    content: "I used to buy boutique $40 oils that tasted like nothing or came in drippy bottles that ruined my counters. Goya's Spanish Extra Virgin in this squeeze bottle is an absolute revelation. Peppery, green, and zero drips.",
    product: "“El Squeeze” Finishing Oil",
    verified: true,
    date: "2 days ago"
  },
  {
    author: "Chef Marcus V.",
    location: "Austin, TX",
    rating: 5,
    title: "The real Spanish deal. Unbeatable flavor.",
    content: "If you know Spanish olive oil, you know Andalusia produces the best Picual olives on earth. The acidity level on this is shockingly low for the price. We use it for our daily crudos and pan con tomate.",
    product: "The “Spanish Starter Kit”",
    verified: true,
    date: "1 week ago"
  },
  {
    author: "Sofia Mendoza",
    location: "Miami, FL",
    rating: 5,
    title: "My abuela was right all along.",
    content: "My grandmother only ever bought Goya olive oil in the glass bottle with the gold cap. Having this modern squeeze format is pure joy. It glugs so smoothly onto hot pasta and grilled vegetables.",
    product: "“El Dúo Andaluz”",
    verified: true,
    date: "2 weeks ago"
  },
  {
    author: "David Chen",
    location: "San Francisco, CA",
    rating: 5,
    title: "The refill cans are genius.",
    content: "No plastic waste, zero light degrading the oil, and the tins look gorgeous on my open shelving. Subscribing for every 6 weeks was a no brainer.",
    product: "“Lata de Oro” Refill Can",
    verified: true,
    date: "3 weeks ago"
  }
];
