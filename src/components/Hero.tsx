
import React, { useEffect, useRef } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrolled = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      
      // Only apply parallax effect within the hero section
      if (scrolled < heroHeight) {
        const parallaxOffset = scrolled * 0.5;
        heroRef.current.style.backgroundPositionY = `-${parallaxOffset}px`;
      }
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000)',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
      
      <div className="container-custom relative z-10 mt-20 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fade-in-down">
            <h1 className="text-white font-light mb-6">
              Find Your Perfect <span className="font-medium">Home</span>
            </h1>
            <p className="text-white/90 text-xl mb-8">
              Discover curated spaces designed for life's most important moments.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="animate-fade-in-up animation-delay-300 bg-white rounded-xl shadow-2xl p-1 md:p-2">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 flex items-center p-3 border-b md:border-b-0 md:border-r border-gray-200">
                <Search className="h-5 w-5 text-muted-foreground mr-2" />
                <input 
                  type="text" 
                  placeholder="Enter an address, neighborhood, city, or ZIP code" 
                  className="flex-1 text-sm focus:outline-none"
                />
              </div>
              
              <div className="flex items-center p-3 border-b md:border-b-0 md:border-r border-gray-200">
                <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                <select className="appearance-none bg-transparent text-sm focus:outline-none pr-8">
                  <option>All property types</option>
                  <option>Houses</option>
                  <option>Apartments</option>
                  <option>Condos</option>
                  <option>Townhouses</option>
                </select>
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
              </div>
              
              <div className="flex items-center p-3 border-b md:border-b-0 md:border-r border-gray-200">
                <select className="appearance-none bg-transparent text-sm focus:outline-none pr-8">
                  <option>Price Range</option>
                  <option>$100k - $300k</option>
                  <option>$300k - $500k</option>
                  <option>$500k - $1M</option>
                  <option>$1M+</option>
                </select>
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
              </div>
              
              <button className="m-2 px-8 py-3 bg-estate text-estate-foreground rounded-lg hover:bg-estate/90 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/80" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
