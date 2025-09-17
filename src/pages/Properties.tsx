
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
      id: "1",
      title: "3 Bedroom Apartment",
      address: "Lekki Phase 1, Lagos",
      price: 75000000,
      beds: 3,
      baths: 3,
      sqft: 1500,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "apartment"
    },
    {
      id: "2",
      title: "4 Bedroom Duplex",
      address: "Victoria Island, Lagos",
      price: 150000000,
      beds: 4,
      baths: 4,
      sqft: 2500,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "house"
    },
    {
      id: "3",
      title: "Luxury Villa",
      address: "Banana Island, Lagos",
      price: 250000000,
      beds: 5,
      baths: 6,
      sqft: 3200,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80",
      category: "villa"
    },
    {
      id: "4",
      title: "Office Space",
      address: "Ikoyi, Lagos",
      price: 90000000,
      beds: 0,
      baths: 2,
      sqft: 1200,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
      category: "commercial"
    },
    {
      id: "5",
      title: "2 Bedroom Flat",
      address: "Yaba, Lagos",
      price: 45000000,
      beds: 2,
      baths: 2,
      sqft: 950,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      category: "apartment"
    },
    {
      id: "6",
      title: "Land for Development",
      address: "Ajah, Lagos",
      price: 35000000,
      beds: 0,
      baths: 0,
      sqft: 5000,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      category: "land"
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
            <p className="text-muted-foreground mb-4">
              Explore our wide range of properties across Nigeria
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/properties" className="inline-flex items-center px-4 py-2 rounded-lg bg-estate text-estate-foreground">
                All Properties
              </Link>
              <Link to="/lands" className="inline-flex items-center px-4 py-2 rounded-lg bg-estate-accent text-white">
                Nigerian Lands
              </Link>
            </div>
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
                : sampleProperties.filter(p => p.category === selectedCategory)
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
