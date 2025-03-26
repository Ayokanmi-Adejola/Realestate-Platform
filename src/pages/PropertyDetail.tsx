
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Heart, 
  Share, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Check,
  Phone,
  Mail
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PropertyType } from '../components/PropertyCard';

// Sample data for detail
const properties: Record<string, PropertyType & { description: string, features: string[] }> = {
  '1': {
    id: '1',
    title: 'Modern Luxury Villa',
    address: 'Beverly Hills, CA 90210',
    price: 4500000,
    beds: 5,
    baths: 6,
    sqft: 4800,
    image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    category: 'Villa',
    description: 'This stunning modern villa offers unparalleled luxury living with panoramic views of the city. Featuring an open floor plan, high ceilings, and floor-to-ceiling windows that flood the space with natural light. The gourmet kitchen comes equipped with top-of-the-line appliances and custom cabinetry. The primary suite includes a spa-like bathroom and a private balcony. Additional amenities include a home theater, wine cellar, infinity pool, and landscaped gardens.',
    features: [
      'Smart home technology',
      'Gourmet kitchen with custom cabinetry',
      'Primary suite with spa-like bathroom',
      'Home theater and entertainment space',
      'Wine cellar',
      'Infinity pool with city views',
      'Landscaped gardens',
      'Multi-car garage',
      'Security system',
      'Energy-efficient design'
    ]
  },
  '2': {
    id: '2',
    title: 'Urban Penthouse',
    address: 'Downtown LA, CA 90015',
    price: 2900000,
    beds: 3,
    baths: 3.5,
    sqft: 2200,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    category: 'Apartment',
    description: 'Perched high above the city, this stunning penthouse offers breathtaking views and sophisticated urban living. The open concept design features floor-to-ceiling windows, premium finishes, and a sleek modern kitchen with designer appliances. The spacious primary suite includes a luxurious bathroom and walk-in closet. Two additional bedrooms provide ample space for family or guests. Building amenities include 24-hour concierge, fitness center, rooftop pool, and lounge areas.',
    features: [
      'Floor-to-ceiling windows with panoramic views',
      'Premium finishes throughout',
      'Designer kitchen with high-end appliances',
      'Spacious primary suite with luxury bathroom',
      'Two guest bedrooms with ensuite bathrooms',
      'Private terrace',
      '24-hour concierge',
      'Fitness center',
      'Rooftop pool',
      'Resident lounge'
    ]
  },
  '3': {
    id: '3',
    title: 'Waterfront Estate',
    address: 'Malibu, CA 90265',
    price: 12500000,
    beds: 7,
    baths: 9,
    sqft: 9600,
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    category: 'Luxury',
    description: 'This breathtaking waterfront estate offers the ultimate in luxury living with direct beach access and unobstructed ocean views. The magnificent main residence features soaring ceilings, walls of glass, and exquisite custom details throughout. The gourmet kitchen opens to a spacious family room and dining area, perfect for entertaining. The primary suite offers a private ocean-view terrace, dual walk-in closets, and a spa-inspired bathroom. Additional amenities include a guest house, infinity pool, outdoor kitchen, and private beach access.',
    features: [
      'Direct beach access',
      'Unobstructed ocean views',
      'Gourmet kitchen with premium appliances',
      'Primary suite with ocean-view terrace',
      'Guest house',
      'Infinity pool and spa',
      'Outdoor kitchen and entertainment area',
      'Home theater',
      'Wine cellar',
      'Smart home technology'
    ]
  },
  '4': {
    id: '4',
    title: 'Garden Townhouse',
    address: 'Santa Monica, CA 90401',
    price: 1850000,
    beds: 3,
    baths: 2.5,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    category: 'Townhouse',
    description: 'This charming garden townhouse offers a perfect blend of modern comfort and classic elegance. Located in a prime Santa Monica neighborhood, this home features an open floor plan with abundant natural light. The well-appointed kitchen includes stainless steel appliances and opens to a dining area and cozy living room. French doors lead to a private landscaped patio, ideal for outdoor entertaining. The upper level offers three bedrooms, including a primary suite with a luxurious bathroom and walk-in closet.',
    features: [
      'Open floor plan',
      'Gourmet kitchen with stainless appliances',
      'Private landscaped patio',
      'Primary suite with luxury bathroom',
      'Two additional bedrooms',
      'Powder room on main level',
      'Attached two-car garage',
      'Security system',
      'Energy-efficient appliances',
      'Close to shopping and dining'
    ]
  }
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<(PropertyType & { description: string, features: string[] }) | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // In a real app, fetch from an API
    if (id && properties[id]) {
      setProperty(properties[id]);
      
      // Simulate loading
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    }
  }, [id]);
  
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Property not found</h2>
          <Link to="/" className="btn-estate">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <div className={`min-h-screen ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft size={20} className="mr-1" />
              <span>Back to properties</span>
            </Link>
          </div>
          
          {/* Property header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-light mb-2">{property.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin size={18} className="mr-2" />
                <span>{property.address}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center text-foreground">
                  <Bed size={18} className="mr-2" />
                  <span>{property.beds} Beds</span>
                </span>
                <span className="inline-flex items-center text-foreground">
                  <Bath size={18} className="mr-2" />
                  <span>{property.baths} Baths</span>
                </span>
                <span className="inline-flex items-center text-foreground">
                  <Square size={18} className="mr-2" />
                  <span>{property.sqft.toLocaleString()} Sq Ft</span>
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-medium text-estate-accent mb-4">
                {formatPrice(property.price)}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full ${
                    isFavorite 
                      ? 'bg-red-50 text-red-500 border border-red-200' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80">
                  <Share className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Property images */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-lg">
            <img 
              src={property.image} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Property details and contact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="mb-10">
                <h2 className="text-2xl font-medium mb-4">About this property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </section>
              
              <section className="mb-10">
                <h2 className="text-2xl font-medium mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-start py-2">
                      <Check className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            {/* Contact form */}
            <div className="lg:col-span-1">
              <div className="bg-muted rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-4">Schedule a viewing</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Your name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-estate-accent"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Email address
                  </label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 rounded-lg border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-estate-accent"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Phone number
                  </label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 rounded-lg border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-estate-accent"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">
                    Preferred date
                  </label>
                  <div className="relative">
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 rounded-lg border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-estate-accent"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  </div>
                </div>
                
                <button className="w-full btn-estate py-3">
                  Request a viewing
                </button>
                
                <div className="mt-6 pt-6 border-t border-muted-foreground/10">
                  <h4 className="text-lg font-medium mb-3">Contact agent directly</h4>
                  <div className="space-y-3">
                    <a href="tel:+15551234567" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      <Phone size={18} className="mr-2" />
                      <span>(555) 123-4567</span>
                    </a>
                    <a href="mailto:agent@estatehub.com" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                      <Mail size={18} className="mr-2" />
                      <span>agent@estatehub.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
