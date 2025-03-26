
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyGrid from '../components/PropertyGrid';
import CategoryFilter from '../components/CategoryFilter';
import { useToast } from "@/components/ui/use-toast";
import { PropertyType } from '../components/PropertyCard';

const Properties = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample property data
  const sampleProperties: PropertyType[] = [
    {
      id: 1,
      title: "3 Bedroom Apartment",
      location: "Lekki Phase 1, Lagos",
      price: 75000000,
      bedrooms: 3,
      bathrooms: 3,
      area: 1500,
      type: "apartment",
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "4 Bedroom Duplex",
      location: "Victoria Island, Lagos",
      price: 150000000,
      bedrooms: 4,
      bathrooms: 4,
      area: 2500,
      type: "house",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Luxury Villa",
      location: "Banana Island, Lagos",
      price: 250000000,
      bedrooms: 5,
      bathrooms: 6,
      area: 3200,
      type: "villa",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80"
    },
    {
      id: 4,
      title: "Office Space",
      location: "Ikoyi, Lagos",
      price: 90000000,
      bedrooms: 0,
      bathrooms: 2,
      area: 1200,
      type: "commercial",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
    },
    {
      id: 5,
      title: "2 Bedroom Flat",
      location: "Yaba, Lagos",
      price: 45000000,
      bedrooms: 2,
      bathrooms: 2,
      area: 950,
      type: "apartment",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 6,
      title: "Land for Development",
      location: "Ajah, Lagos",
      price: 35000000,
      bedrooms: 0,
      bathrooms: 0,
      area: 5000,
      type: "land",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
    }
  ];

  // Available property categories
  const categories = ['apartment', 'house', 'villa', 'commercial', 'land'];

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    toast({
      title: "Category Selected",
      description: `Showing ${category === 'all' ? 'all properties' : `${category} properties`}`,
    });
  };
  
  useEffect(() => {
    // Show toast when page loads
    toast({
      title: "Properties loaded",
      description: "Showing all available properties",
    });
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Our Properties</h1>
            <p className="text-muted-foreground">
              Explore our wide range of properties across Nigeria
            </p>
          </div>
          
          <CategoryFilter 
            categories={categories} 
            onSelectCategory={handleCategorySelect}
            selectedCategory={selectedCategory}
          />
          
          <div className="mt-8">
            <PropertyGrid 
              properties={selectedCategory === 'all' 
                ? sampleProperties 
                : sampleProperties.filter(p => p.type === selectedCategory)
              } 
              title="Available Properties"
              description="Find your perfect property from our exclusive collection" 
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
