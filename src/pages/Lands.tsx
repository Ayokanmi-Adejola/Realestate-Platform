import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, ArrowRight, Grid, Map as MapIcon, Search } from 'lucide-react';
import { nigerianStates, getCitiesByState } from '../data/nigerianLocations';
import {
  nigerianLands,
  LandProperty,
  getLandsByState,
  getLandsByCity,
  getLandsByZoning,
  getLandsByPriceRange,
  getLandsBySizeRange
} from '../data/nigerianLands';
import LandCard from '../components/LandCard';
import GoogleMap from '../components/GoogleMap';

const Lands = () => {
  const { toast } = useToast();
  const [filteredLands, setFilteredLands] = useState<LandProperty[]>(nigerianLands);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedZoning, setSelectedZoning] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000000]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 20000]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<LandProperty | null>(null);
  const [compareList, setCompareList] = useState<LandProperty[]>([]);

  // Zoning types
  const zoningTypes = ['residential', 'commercial', 'industrial', 'agricultural', 'mixed-use'];

  // Update available cities when state changes
  useEffect(() => {
    if (selectedState) {
      setAvailableCities(getCitiesByState(selectedState));
    } else {
      setAvailableCities([]);
    }
    setSelectedCity('');
  }, [selectedState]);

  // Apply filters
  useEffect(() => {
    let results = [...nigerianLands];

    // Filter by state
    if (selectedState) {
      results = getLandsByState(selectedState);
    }

    // Filter by city
    if (selectedCity) {
      results = getLandsByCity(selectedCity);
    }

    // Filter by zoning
    if (selectedZoning) {
      results = results.filter(land => land.zoning === selectedZoning);
    }

    // Filter by price range
    results = results.filter(land =>
      land.price >= priceRange[0] && land.price <= priceRange[1]
    );

    // Filter by size range
    results = results.filter(land =>
      land.size >= sizeRange[0] && land.size <= sizeRange[1]
    );

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(land =>
        land.title.toLowerCase().includes(query) ||
        land.address.toLowerCase().includes(query) ||
        land.description.toLowerCase().includes(query) ||
        land.state.toLowerCase().includes(query) ||
        land.city.toLowerCase().includes(query) ||
        land.features.some(feature => feature.toLowerCase().includes(query)) ||
        land.amenities.some(amenity => amenity.toLowerCase().includes(query))
      );
    }

    setFilteredLands(results);
  }, [selectedState, selectedCity, selectedZoning, priceRange, sizeRange, searchQuery]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedState('');
    setSelectedCity('');
    setSelectedZoning('');
    setPriceRange([0, 500000000]);
    setSizeRange([0, 20000]);
    setSearchQuery('');

    toast({
      title: "Filters Reset",
      description: "Showing all available land properties",
    });
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "Search Results",
      description: `Found ${filteredLands.length} properties matching "${searchQuery}"`,
    });
  };

  // Handle property selection for map view
  const handlePropertySelect = (property: LandProperty) => {
    setSelectedProperty(property);
  };

  // Toggle property in compare list
  const toggleCompare = (property: LandProperty) => {
    if (compareList.some(item => item.id === property.id)) {
      // Remove from compare list
      setCompareList(compareList.filter(item => item.id !== property.id));
      toast({
        title: "Removed from comparison",
        description: `${property.title} has been removed from your comparison list`,
      });
    } else {
      // Add to compare list (max 4)
      if (compareList.length >= 4) {
        toast({
          title: "Comparison limit reached",
          description: "You can compare up to 4 properties at once. Please remove one to add another.",
          variant: "destructive"
        });
        return;
      }

      setCompareList([...compareList, property]);
      toast({
        title: "Added to comparison",
        description: `${property.title} has been added to your comparison list`,
      });
    }
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format size for display
  const formatSize = (size: number) => {
    if (size < 10000) {
      return `${size} sqm`;
    } else {
      return `${(size / 10000).toFixed(2)} hectares`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Nigerian Lands</h1>
            <p className="text-muted-foreground">
              Explore premium land properties across Nigeria for residential, commercial, and investment purposes
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-6 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search by title, location, features..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-estate-accent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </div>

          {/* Filters Section */}
          <div className="bg-muted/30 rounded-xl p-6 mb-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl font-semibold mb-4 md:mb-0">Filter Properties</h2>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* State Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <Select
                  value={selectedState}
                  onValueChange={(value) => setSelectedState(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    {nigerianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Select
                  value={selectedCity}
                  onValueChange={(value) => setSelectedCity(value)}
                  disabled={!selectedState}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedState ? "Select City" : "Select State First"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Cities</SelectItem>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Zoning Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Zoning Type</label>
                <Select
                  value={selectedZoning}
                  onValueChange={(value) => setSelectedZoning(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Zoning" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Zoning Types</SelectItem>
                    {zoningTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 500000000]}
                    max={500000000}
                    step={5000000}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="my-4"
                  />
                </div>
              </div>

              {/* Size Range Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Size Range: {formatSize(sizeRange[0])} - {formatSize(sizeRange[1])}
                </label>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 20000]}
                    max={20000}
                    step={100}
                    value={sizeRange}
                    onValueChange={(value) => setSizeRange(value as [number, number])}
                    className="my-4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredLands.length} {filteredLands.length === 1 ? 'Property' : 'Properties'} Found
              </h2>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="bg-muted rounded-lg p-1 flex">
                  <button
                    className={`px-3 py-1.5 rounded-md flex items-center ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid size={18} className="mr-1.5" />
                    <span>Grid</span>
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-md flex items-center ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('map')}
                  >
                    <MapIcon size={18} className="mr-1.5" />
                    <span>Map</span>
                  </button>
                </div>

                {/* Compare Button - Only show if properties are selected */}
                {compareList.length > 0 && (
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => document.getElementById('comparison-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Compare ({compareList.length})
                  </Button>
                )}
              </div>
            </div>

            {filteredLands.length > 0 ? (
              <div>
                {/* Grid View */}
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLands.map((land) => (
                      <div key={land.id} className="relative">
                        <LandCard land={land} />

                        {/* Compare Checkbox */}
                        <div className="absolute top-3 right-3 z-20">
                          <button
                            onClick={() => toggleCompare(land)}
                            className={`p-2 rounded-full ${
                              compareList.some(item => item.id === land.id)
                                ? 'bg-estate-accent text-white'
                                : 'bg-white/80 text-muted-foreground hover:text-estate-accent'
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M16 3h5v5"></path>
                              <path d="M8 3H3v5"></path>
                              <path d="M21 21h-5v-5"></path>
                              <path d="M3 21h5v-5"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Map View */}
                {viewMode === 'map' && (
                  <div>
                    <div className="h-[600px] mb-6">
                      <GoogleMap
                        properties={filteredLands}
                        selectedProperty={selectedProperty}
                        onMarkerClick={handlePropertySelect}
                        height="600px"
                      />
                    </div>

                    {/* Selected Property Details */}
                    {selectedProperty && (
                      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                        <div className="flex items-start gap-6">
                          <div className="w-1/3 rounded-lg overflow-hidden">
                            <img
                              src={selectedProperty.image}
                              alt={selectedProperty.title}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{selectedProperty.title}</h3>
                            <div className="flex items-center text-muted-foreground mb-3">
                              <MapPin size={16} className="mr-1" />
                              <span>{selectedProperty.address}</span>
                            </div>
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {selectedProperty.description}
                            </p>
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-sm text-muted-foreground">Price</span>
                                <p className="text-lg font-semibold text-estate-accent">
                                  {formatPrice(selectedProperty.price)}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleCompare(selectedProperty)}
                                >
                                  {compareList.some(item => item.id === selectedProperty.id)
                                    ? 'Remove from Compare'
                                    : 'Add to Compare'
                                  }
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => window.location.href = `/land/${selectedProperty.id}`}
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* List of Properties */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredLands.slice(0, 6).map((land) => (
                        <div
                          key={land.id}
                          className={`flex gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedProperty?.id === land.id
                              ? 'bg-muted/50 border-estate-accent'
                              : 'hover:bg-muted/30'
                          }`}
                          onClick={() => handlePropertySelect(land)}
                        >
                          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={land.image}
                              alt={land.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium line-clamp-1">{land.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mb-1">
                              <MapPin size={14} className="mr-1" />
                              <span className="line-clamp-1">{land.address}</span>
                            </div>
                            <p className="text-estate-accent font-medium">{formatPrice(land.price)}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatSize(land.size)} • {land.zoning}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredLands.length > 6 && (
                      <div className="text-center mt-4">
                        <Button variant="outline" onClick={() => setViewMode('grid')}>
                          View All {filteredLands.length} Properties
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 bg-muted/20 rounded-xl">
                <h3 className="text-xl font-medium mb-2">No properties match your criteria</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>

          {/* Comparison Section */}
          {compareList.length > 0 && (
            <div id="comparison-section" className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Compare Properties</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-4 text-left border-b">Property</th>
                      {compareList.map(property => (
                        <th key={property.id} className="p-4 text-left border-b min-w-[250px]">
                          <div className="flex justify-between items-start">
                            <div className="line-clamp-2 pr-4">{property.title}</div>
                            <button
                              onClick={() => toggleCompare(property)}
                              className="text-muted-foreground hover:text-estate-accent"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b">Image</td>
                      {compareList.map(property => (
                        <td key={property.id} className="p-4 border-b">
                          <div className="w-full h-32 rounded-md overflow-hidden">
                            <img
                              src={property.image}
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 border-b">Price</td>
                      {compareList.map(property => (
                        <td key={property.id} className="p-4 border-b font-semibold text-estate-accent">
                          {formatPrice(property.price)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 border-b">Location</td>
                      {compareList.map(property => (
                        <td key={property.id} className="p-4 border-b">
                          {property.address}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 border-b">Size</td>
                      {compareList.map(property => (
                        <td key={property.id} className="p-4 border-b">
                          {formatSize(property.size)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 border-b">Zoning</td>
                      {compareList.map(property => (
                        <td key={property.id} className="p-4 border-b capitalize">
                          {property.zoning}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 border-b">Documents</td>
                      {compareList.map(property => (
                        <td key={property.id} className="p-4 border-b">
                          <ul className="list-disc list-inside">
                            {property.documents.map((doc, index) => (
                              <li key={index} className="text-sm">{doc}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 border-b">Features</td>
                      {compareList.map(property => (
                        <td key={property.id} className="p-4 border-b">
                          <ul className="list-disc list-inside">
                            {property.features.map((feature, index) => (
                              <li key={index} className="text-sm">{feature}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 border-b">Action</td>
                      {compareList.map(property => (
                        <td key={property.id} className="p-4 border-b">
                          <Button
                            onClick={() => window.location.href = `/land/${property.id}`}
                            className="w-full"
                          >
                            View Details
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Land Buying Guide */}
          <div className="mt-16 bg-estate/5 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Nigerian Land Buying Guide</h2>
            <p className="text-muted-foreground mb-6">
              Investing in land in Nigeria requires careful consideration of several factors to ensure a secure and valuable purchase.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Essential Documents</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                    <span><strong>Certificate of Occupancy (C of O):</strong> The most important document that confirms legal ownership.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                    <span><strong>Survey Plan:</strong> Shows the exact boundaries and dimensions of the land.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                    <span><strong>Deed of Assignment:</strong> Transfers ownership rights from the seller to the buyer.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                    <span><strong>Governor's Consent:</strong> Required for the legal transfer of land ownership.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Important Considerations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                    <span><strong>Verify Ownership:</strong> Conduct proper due diligence to confirm the seller's right to sell.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                    <span><strong>Check for Encumbrances:</strong> Ensure the land is free from disputes, mortgages, or liens.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                    <span><strong>Assess Location:</strong> Consider accessibility, infrastructure, and future development plans.</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                    <span><strong>Use Professionals:</strong> Work with reputable real estate agents, surveyors, and lawyers.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-muted-foreground">
                At Adejola Homes, we ensure all our land listings have proper documentation and have undergone thorough verification to protect your investment.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Lands;
