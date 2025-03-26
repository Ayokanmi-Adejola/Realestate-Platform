
import React, { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  onSelectCategory,
  selectedCategory
}) => {
  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="flex items-center justify-center flex-wrap gap-4">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-estate text-estate-foreground shadow-md'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            All Properties
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-estate text-estate-foreground shadow-md'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
