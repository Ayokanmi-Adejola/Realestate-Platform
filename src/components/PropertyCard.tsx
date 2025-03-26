
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react';

export interface PropertyType {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  category: string;
}

interface PropertyCardProps {
  property: PropertyType;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price * 1500); // Converting to Naira (approximation)
  };

  return (
    <Link 
      to={`/property/${property.id}`}
      className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.image}
          alt={property.title}
          className={`w-full h-full object-cover transform transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-white/80 text-red-500' 
                : 'bg-black/30 text-white hover:bg-white/80 hover:text-black'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent">
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-estate-accent text-white rounded-md">
              {property.category}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium leading-tight mb-1">{property.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" strokeWidth={1.5} />
              <span>{property.address}</span>
            </div>
          </div>
          <p className="text-lg font-semibold text-estate-accent">
            {formatPrice(property.price)}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-muted">
          <div className="flex items-center text-sm text-muted-foreground">
            <Bed className="h-4 w-4 mr-1" strokeWidth={1.5} />
            <span className="mr-3">{property.beds} Beds</span>
            
            <Bath className="h-4 w-4 mr-1" strokeWidth={1.5} />
            <span className="mr-3">{property.baths} Baths</span>
            
            <Square className="h-4 w-4 mr-1" strokeWidth={1.5} />
            <span>{property.sqft.toLocaleString()} Sq Ft</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
