import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Ruler, FileText, Tag } from 'lucide-react';
import { LandProperty } from '../data/nigerianLands';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '../contexts/AuthContext';

interface LandCardProps {
  land: LandProperty;
}

const LandCard: React.FC<LandCardProps> = ({ land }) => {
  const { isAuthenticated, isSaved, saveLand, unsaveLand } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // Redirect to login page
      window.location.href = '/login';
      return;
    }

    if (isSaved(land.id)) {
      unsaveLand(land.id);
    } else {
      saveLand(land.id);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSize = (size: number) => {
    if (size < 10000) {
      return `${size.toLocaleString()} sqm`;
    } else {
      return `${(size / 10000).toFixed(2)} hectares`;
    }
  };

  return (
    <Link
      to={`/land/${land.id}`}
      className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={land.image}
          alt={land.title}
          className={`w-full h-full object-cover transform transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isAuthenticated && isSaved(land.id)
                ? 'bg-white/80 text-red-500'
                : 'bg-black/30 text-white hover:bg-white/80 hover:text-black'
            }`}
          >
            <Heart className="h-5 w-5" fill={isAuthenticated && isSaved(land.id) ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Zoning Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-estate-accent text-white hover:bg-estate-accent/90">
            {land.zoning.charAt(0).toUpperCase() + land.zoning.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium leading-tight mb-1">{land.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" strokeWidth={1.5} />
              <span>{land.address}</span>
            </div>
          </div>
          <p className="text-lg font-semibold text-estate-accent">
            {formatPrice(land.price)}
          </p>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Ruler className="h-4 w-4 mr-2" strokeWidth={1.5} />
            <span>Size: {formatSize(land.size)}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mr-2" strokeWidth={1.5} />
            <span>Documents: {land.documents.slice(0, 2).join(", ")}{land.documents.length > 2 ? "..." : ""}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-muted">
          <div className="flex flex-wrap gap-2">
            {land.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-muted/30">
                {feature}
              </Badge>
            ))}
            {land.features.length > 3 && (
              <Badge variant="outline" className="bg-muted/30">
                +{land.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LandCard;
