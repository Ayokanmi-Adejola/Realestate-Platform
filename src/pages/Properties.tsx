
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyGrid from '../components/PropertyGrid';
import CategoryFilter from '../components/CategoryFilter';
import { useToast } from "@/components/ui/use-toast";

const Properties = () => {
  const { toast } = useToast();
  
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
          
          <CategoryFilter />
          
          <div className="mt-8">
            <PropertyGrid />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
