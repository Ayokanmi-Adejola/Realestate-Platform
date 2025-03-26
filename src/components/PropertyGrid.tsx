
import React from 'react';
import PropertyCard, { PropertyType } from './PropertyCard';

interface PropertyGridProps {
  properties: PropertyType[];
  title: string;
  description?: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, title, description }) => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">{title}</h2>
          {description && (
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
