
import React from 'react';
import { Building } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 transition-transform hover:scale-105 ${className}`}>
      <Building className="text-estate-accent h-6 w-6" />
      <span className="text-2xl font-light tracking-tight">
        Adejola<span className="font-medium text-estate-accent">Homes</span>
      </span>
    </Link>
  );
};

export default Logo;
