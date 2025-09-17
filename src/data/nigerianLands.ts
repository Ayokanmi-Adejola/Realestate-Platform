import { PropertyType } from '../components/PropertyCard';

export interface LandProperty extends PropertyType {
  size: number; // Size in square meters
  zoning: 'residential' | 'commercial' | 'industrial' | 'agricultural' | 'mixed-use';
  features: string[];
  description: string;
  documents: string[]; // Available documents like C of O, Survey Plan, etc.
  amenities: string[]; // Nearby amenities
  state: string;
  city: string;
}

export const nigerianLands: LandProperty[] = [
  {
    id: "land-001",
    title: "Prime Residential Land",
    address: "Lekki Phase 2, Lagos",
    price: 85000000,
    beds: 0,
    baths: 0,
    sqft: 1000, // 1000 sqm
    size: 1000,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    category: "land",
    zoning: "residential",
    features: [
      "Dry land",
      "Rectangular shape",
      "Good for duplex",
      "Gated community",
      "24/7 security"
    ],
    description: "Prime residential land in the heart of Lekki Phase 2. Perfect for building your dream home in an exclusive neighborhood with excellent infrastructure and security.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Deed of Assignment"],
    amenities: ["Shopping Mall", "International School", "Hospital", "Beach Resort"],
    state: "Lagos",
    city: "Lekki"
  },
  {
    id: "land-002",
    title: "Commercial Plot",
    address: "Victoria Island, Lagos",
    price: 250000000,
    beds: 0,
    baths: 0,
    sqft: 2000, // 2000 sqm
    size: 2000,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "land",
    zoning: "commercial",
    features: [
      "Prime location",
      "High foot traffic",
      "Corner piece",
      "Suitable for office complex",
      "Tarred road access"
    ],
    description: "Strategic commercial plot in the business district of Victoria Island. Ideal for office complex, shopping mall, or mixed-use development with excellent visibility and accessibility.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Approved Building Plan"],
    amenities: ["Banks", "Hotels", "Corporate Offices", "Restaurants"],
    state: "Lagos",
    city: "Victoria Island"
  },
  {
    id: "land-003",
    title: "Waterfront Land",
    address: "Banana Island, Lagos",
    price: 500000000,
    beds: 0,
    baths: 0,
    sqft: 1500, // 1500 sqm
    size: 1500,
    image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
    category: "land",
    zoning: "residential",
    features: [
      "Waterfront view",
      "Private jetty access",
      "Exclusive neighborhood",
      "Ready for development",
      "Premium location"
    ],
    description: "Exclusive waterfront land in the prestigious Banana Island. This rare opportunity offers direct water access with permission for a private jetty. Perfect for a luxury mansion with breathtaking views.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Deed of Assignment", "Governor's Consent"],
    amenities: ["Private Beach", "Yacht Club", "Helipad", "Luxury Residences"],
    state: "Lagos",
    city: "Banana Island"
  },
  {
    id: "land-004",
    title: "Industrial Land",
    address: "Agbara Industrial Estate, Ogun",
    price: 120000000,
    beds: 0,
    baths: 0,
    sqft: 5000, // 5000 sqm
    size: 5000,
    image: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    category: "land",
    zoning: "industrial",
    features: [
      "Industrial zone",
      "Power supply",
      "Water access",
      "Good road network",
      "Suitable for manufacturing"
    ],
    description: "Strategic industrial land in Agbara Industrial Estate. Ideal for manufacturing, warehousing, or logistics operations with excellent infrastructure and utilities already in place.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Environmental Impact Assessment"],
    amenities: ["Industrial Park", "Logistics Hub", "Power Plant", "Worker Housing"],
    state: "Ogun",
    city: "Agbara"
  },
  {
    id: "land-005",
    title: "Agricultural Land",
    address: "Epe, Lagos",
    price: 25000000,
    beds: 0,
    baths: 0,
    sqft: 20000, // 20000 sqm (2 hectares)
    size: 20000,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    category: "land",
    zoning: "agricultural",
    features: [
      "Fertile soil",
      "Water source",
      "Accessible location",
      "Suitable for farming",
      "Partially cleared"
    ],
    description: "Fertile agricultural land in Epe, perfect for farming or agricultural investment. The land has good soil quality, natural water sources, and is accessible via good roads.",
    documents: ["Certificate of Occupancy", "Survey Plan"],
    amenities: ["Farmers Market", "Agricultural Extension Office", "Rural Community"],
    state: "Lagos",
    city: "Epe"
  },
  {
    id: "land-006",
    title: "Mixed-Use Development Land",
    address: "Jahi District, Abuja",
    price: 180000000,
    beds: 0,
    baths: 0,
    sqft: 3000, // 3000 sqm
    size: 3000,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    category: "land",
    zoning: "mixed-use",
    features: [
      "Strategic location",
      "Approved for mixed-use",
      "High development potential",
      "Good infrastructure",
      "Growing area"
    ],
    description: "Prime land in Jahi District approved for mixed-use development. Excellent opportunity for residential apartments with commercial spaces on the ground floor in this rapidly developing area of Abuja.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Development Approval"],
    amenities: ["Shopping Centers", "Schools", "Government Offices", "Recreational Facilities"],
    state: "FCT (Abuja)",
    city: "Jahi"
  },
  {
    id: "land-007",
    title: "Residential Estate Land",
    address: "Ibeju-Lekki, Lagos",
    price: 40000000,
    beds: 0,
    baths: 0,
    sqft: 800, // 800 sqm
    size: 800,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    category: "land",
    zoning: "residential",
    features: [
      "Gated estate",
      "Perimeter fencing",
      "Underground drainage",
      "Paved roads",
      "Ready to build"
    ],
    description: "Beautiful residential land in a secure, gated estate in the rapidly developing Ibeju-Lekki area. Close to the Lekki Free Trade Zone and upcoming airport, this is an excellent investment opportunity.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Deed of Assignment"],
    amenities: ["Free Trade Zone", "Dangote Refinery", "Proposed Airport", "Beaches"],
    state: "Lagos",
    city: "Ibeju-Lekki"
  },
  {
    id: "land-008",
    title: "Hillside Land with View",
    address: "Mpape, Abuja",
    price: 35000000,
    beds: 0,
    baths: 0,
    sqft: 1200, // 1200 sqm
    size: 1200,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    category: "land",
    zoning: "residential",
    features: [
      "Panoramic city view",
      "Elevated location",
      "Natural surroundings",
      "Cool climate",
      "Unique topography"
    ],
    description: "Spectacular hillside land with panoramic views of Abuja city. This unique property offers the opportunity to build a distinctive home with natural surroundings while still being close to the city center.",
    documents: ["Certificate of Occupancy", "Survey Plan"],
    amenities: ["Viewpoints", "Hiking Trails", "Local Markets", "City Access"],
    state: "FCT (Abuja)",
    city: "Mpape"
  },
  {
    id: "land-009",
    title: "Beachfront Land",
    address: "Eleko Beach, Lagos",
    price: 150000000,
    beds: 0,
    baths: 0,
    sqft: 2500, // 2500 sqm
    size: 2500,
    image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    category: "land",
    zoning: "mixed-use",
    features: [
      "Direct beach access",
      "Ocean view",
      "Tourist potential",
      "Resort development opportunity",
      "Growing area"
    ],
    description: "Rare beachfront land with direct access to the pristine Eleko Beach. Perfect for resort development, luxury villas, or a private beach house with incredible ocean views and cool sea breeze.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Environmental Impact Assessment"],
    amenities: ["Beach Activities", "Fishing Village", "Weekend Tourism", "Nature Reserve"],
    state: "Lagos",
    city: "Eleko"
  },
  {
    id: "land-010",
    title: "Commercial Corner Plot",
    address: "Wuse 2, Abuja",
    price: 320000000,
    beds: 0,
    baths: 0,
    sqft: 1800, // 1800 sqm
    size: 1800,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    category: "land",
    zoning: "commercial",
    features: [
      "Corner plot",
      "High visibility",
      "Major road frontage",
      "Commercial hub",
      "Development ready"
    ],
    description: "Premium corner plot in the bustling commercial district of Wuse 2. Excellent visibility and accessibility make this ideal for retail, office, or hospitality development in one of Abuja's most sought-after areas.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Commercial Development Approval"],
    amenities: ["Shopping Malls", "Corporate Headquarters", "Government Offices", "Luxury Hotels"],
    state: "FCT (Abuja)",
    city: "Wuse"
  },
  {
    id: "land-011",
    title: "Residential Land with C of O",
    address: "Magodo GRA Phase 2, Lagos",
    price: 95000000,
    beds: 0,
    baths: 0,
    sqft: 900, // 900 sqm
    size: 900,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    category: "land",
    zoning: "residential",
    features: [
      "Fully documented",
      "Certificate of Occupancy",
      "Secure estate",
      "Developed neighborhood",
      "Ready for construction"
    ],
    description: "Well-positioned residential land in the prestigious Magodo GRA Phase 2 with full Certificate of Occupancy. Located in a secure, developed neighborhood with excellent infrastructure and amenities.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Deed of Assignment", "Governor's Consent"],
    amenities: ["Shopping Centers", "International Schools", "Medical Facilities", "Recreational Parks"],
    state: "Lagos",
    city: "Magodo"
  },
  {
    id: "land-012",
    title: "Industrial Land with Warehouse",
    address: "Aba, Abia",
    price: 65000000,
    beds: 0,
    baths: 0,
    sqft: 4000, // 4000 sqm
    size: 4000,
    image: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    category: "land",
    zoning: "industrial",
    features: [
      "Existing warehouse structure",
      "Industrial area",
      "Power supply",
      "Good for manufacturing",
      "Accessible location"
    ],
    description: "Industrial land with an existing warehouse structure in Aba, the manufacturing hub of Eastern Nigeria. Perfect for production, storage, or distribution operations with good access to markets across the region.",
    documents: ["Certificate of Occupancy", "Survey Plan", "Building Approval"],
    amenities: ["Manufacturing Hub", "Markets", "Transport Networks", "Labor Pool"],
    state: "Abia",
    city: "Aba"
  }
];

// Helper functions
export const getLandsByState = (state: string): LandProperty[] => {
  return nigerianLands.filter(land => land.state === state);
};

export const getLandsByCity = (city: string): LandProperty[] => {
  return nigerianLands.filter(land => land.city === city);
};

export const getLandsByZoning = (zoning: LandProperty['zoning']): LandProperty[] => {
  return nigerianLands.filter(land => land.zoning === zoning);
};

export const getLandsByPriceRange = (minPrice: number, maxPrice: number): LandProperty[] => {
  return nigerianLands.filter(land => land.price >= minPrice && land.price <= maxPrice);
};

export const getLandsBySizeRange = (minSize: number, maxSize: number): LandProperty[] => {
  return nigerianLands.filter(land => land.size >= minSize && land.size <= maxSize);
};
