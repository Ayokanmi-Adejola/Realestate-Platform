
import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import PropertyGrid from '../components/PropertyGrid';
import CategoryFilter from '../components/CategoryFilter';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PropertyType } from '../components/PropertyCard';

// Sample data
const properties: PropertyType[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    address: 'Beverly Hills, CA 90210',
    price: 4500000,
    beds: 5,
    baths: 6,
    sqft: 4800,
    image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Villa',
  },
  {
    id: '2',
    title: 'Urban Penthouse',
    address: 'Downtown LA, CA 90015',
    price: 2900000,
    beds: 3,
    baths: 3.5,
    sqft: 2200,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Apartment',
  },
  {
    id: '3',
    title: 'Waterfront Estate',
    address: 'Malibu, CA 90265',
    price: 12500000,
    beds: 7,
    baths: 9,
    sqft: 9600,
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Luxury',
  },
  {
    id: '4',
    title: 'Garden Townhouse',
    address: 'Santa Monica, CA 90401',
    price: 1850000,
    beds: 3,
    baths: 2.5,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Townhouse',
  },
  {
    id: '5',
    title: 'Mountain View Chalet',
    address: 'Big Bear, CA 92315',
    price: 975000,
    beds: 4,
    baths: 3,
    sqft: 2600,
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Chalet',
  },
  {
    id: '6',
    title: 'Historic Brownstone',
    address: 'Pasadena, CA 91103',
    price: 2250000,
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'House',
  },
];

const categories = [...new Set(properties.map(p => p.category))];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProperties, setFilteredProperties] = useState<PropertyType[]>(properties);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Apply filter when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory]);
  
  // Set loaded state after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navbar />
      <Hero />
      
      <CategoryFilter 
        categories={categories} 
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <PropertyGrid 
        properties={filteredProperties}
        title="Featured Properties"
        description="Discover our handpicked selection of premium properties, each offering a unique blend of luxury, comfort, and style."
      />
      
      {/* Statistics Section */}
      <section className="py-20 bg-estate text-estate-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light mb-2">1,500+</div>
              <div className="text-estate-foreground/80">Properties Sold</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light mb-2">98%</div>
              <div className="text-estate-foreground/80">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light mb-2">30+</div>
              <div className="text-estate-foreground/80">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-light mb-2">45</div>
              <div className="text-estate-foreground/80">Expert Agents</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4">Ready to Find Your Dream Home?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let us guide you through the journey of finding the perfect property that matches your lifestyle and aspirations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-estate px-8 py-3">
                Browse Properties
              </button>
              <button className="btn-estate-outline px-8 py-3">
                Contact an Agent
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
