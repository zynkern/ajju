export const products = [
  // FISH
  { 
    id: 1, 
    name: 'Neon Tetras (School of 6)', 
    category: 'Fish', 
    price: 450, 
    stock: 24, 
    desc: 'Vibrant blue and red schooling fish perfect for peaceful community planted aquariums.', 
    species: 'Paracheirodon innesi', 
    size: '1.5 inches', 
    tankSize: '10G+', 
    temp: '70-81°F', 
    difficulty: 'Easy', 
    image: 'https://images.unsplash.com/photo-1544605995-1f9e83ecf255?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 2, 
    name: 'Ocellaris Clownfish Pair', 
    category: 'Fish', 
    price: 2500, 
    stock: 8, 
    desc: 'Captive-bred designer clownfish pair. Extremely hardy, active, and bonded.', 
    species: 'Amphiprion ocellaris', 
    size: '3.0 inches', 
    tankSize: '20G+', 
    temp: '74-82°F', 
    difficulty: 'Moderate', 
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 3, 
    name: 'German Blue Ram (Pair)', 
    category: 'Fish', 
    price: 950, 
    stock: 12, 
    desc: 'Stunning dwarf cichlid with iridescent blue markings and yellow accents.', 
    species: 'Mikrogeophagus ramirezi', 
    size: '2.5 inches', 
    tankSize: '20G+', 
    temp: '78-85°F', 
    difficulty: 'Moderate', 
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 4, 
    name: 'Celestial Pearl Danio (Trio)', 
    category: 'Fish', 
    price: 790, 
    stock: 18, 
    desc: 'Galaxy-like nano fish with brilliant orange fins and speckled blue bodies.', 
    species: 'Celestichthys margaritatus', 
    size: '1.0 inch', 
    tankSize: '10G+', 
    temp: '68-78°F', 
    difficulty: 'Easy', 
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 5, 
    name: 'Red Cherry Shrimp (Grade AAA - 10 Pack)', 
    category: 'Fish', 
    price: 590, 
    stock: 30, 
    desc: 'Deep ruby red algae cleaning shrimp. Excellent for nano planted aquariums.', 
    species: 'Neocaridina davidi', 
    size: '0.8 inches', 
    tankSize: '5G+', 
    temp: '65-78°F', 
    difficulty: 'Easy', 
    image: 'https://images.unsplash.com/photo-1544605995-1f9e83ecf255?q=80&w=600&auto=format&fit=crop' 
  },

  // PLANTS
  { 
    id: 6, 
    name: 'Anubias Nana Petite (Tissue Culture)', 
    category: 'Plants', 
    price: 350, 
    stock: 20, 
    desc: '100% pest-free epiphyte plant. Low light required, ties easily to driftwood.', 
    difficulty: 'Easy', 
    image: 'https://images.unsplash.com/photo-1620603774883-93d39580b037?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 7, 
    name: 'Bucephalandra Deep Green (Pot)', 
    category: 'Plants', 
    price: 490, 
    stock: 14, 
    desc: 'Rare slow-growing Borneo aquatic plant with shimmering blue-green leaves.', 
    difficulty: 'Easy', 
    image: 'https://images.unsplash.com/photo-1620603774883-93d39580b037?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 8, 
    name: 'Monte Carlo Foreground Carpet Cup', 
    category: 'Plants', 
    price: 420, 
    stock: 16, 
    desc: 'Lush green carpet plant that creates dense underwater lawns.', 
    difficulty: 'Moderate', 
    image: 'https://images.unsplash.com/photo-1520301255226-bf5f144451c1?q=80&w=600&auto=format&fit=crop' 
  },

  // TANKS & GLASSWARE
  { 
    id: 9, 
    name: 'Rimless Optiwhite 60P Glass Tank (17 Gal)', 
    category: 'Tanks', 
    price: 6500, 
    stock: 4, 
    desc: '60x30x36cm ultra-clear 91% light transmittance low-iron glass aquarium.', 
    image: 'https://images.unsplash.com/photo-1523490919018-8fec002221ba?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 10, 
    name: 'ADA Cube Garden 45P Nano Tank (9 Gal)', 
    category: 'Tanks', 
    price: 4800, 
    stock: 6, 
    desc: '45x27x30cm high clarity rimless nano tank designed for high-end aquascapes.', 
    image: 'https://images.unsplash.com/photo-1523490919018-8fec002221ba?q=80&w=600&auto=format&fit=crop' 
  },

  // FILTERS & EQUIPMENT
  { 
    id: 11, 
    name: 'Fluval 407 Performance Canister Filter', 
    category: 'Filters & Equipment', 
    price: 14500, 
    stock: 3, 
    desc: 'Multi-stage external filter with silent pump operation for up to 100G tanks.', 
    image: 'https://images.unsplash.com/photo-1582528723389-9fc31fb08796?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 12, 
    name: 'Chihiros WRGB II Slim LED Light (60cm)', 
    category: 'Filters & Equipment', 
    price: 8900, 
    stock: 7, 
    desc: 'Bluetooth app-controlled RGB LED spectrum fixture for explosive plant growth.', 
    image: 'https://images.unsplash.com/photo-1582528723389-9fc31fb08796?q=80&w=600&auto=format&fit=crop' 
  },

  // HARDSCAPE & DECOR
  { 
    id: 13, 
    name: 'Dragon Stone (Ohko) - 5kg Box', 
    category: 'Decor', 
    price: 1200, 
    stock: 12, 
    desc: 'Clay-like clay stone with deep natural crevices and golden-tan tones.', 
    image: 'https://images.unsplash.com/photo-1596700755913-91a56667520e?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    id: 14, 
    name: 'Bonsai Driftwood Sculpture (Medium)', 
    category: 'Decor', 
    price: 1850, 
    stock: 5, 
    desc: 'Handcrafted natural wood tree structure ready for attaching moss or Anubias.', 
    image: 'https://images.unsplash.com/photo-1596700755913-91a56667520e?q=80&w=600&auto=format&fit=crop' 
  }
];
