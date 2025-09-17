import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronLeft,
  Heart,
  Share,
  MapPin,
  Ruler,
  FileText,
  Calendar,
  Check,
  Phone,
  Mail,
  ArrowRight,
  Building,
  Landmark,
  Map,
  Calculator
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LandInvestmentCalculator from '../components/LandInvestmentCalculator';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { nigerianLands, LandProperty } from '../data/nigerianLands';
import { useToast } from "@/components/ui/use-toast";

const LandDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [land, setLand] = useState<LandProperty | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, isSaved, saveLand, unsaveLand } = useAuth();

  useEffect(() => {
    // Find the land by ID
    const foundLand = nigerianLands.find(land => land.id === id);

    if (foundLand) {
      setLand(foundLand);

      // Simulate loading
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to save properties",
        variant: "destructive"
      });
      return;
    }

    if (land) {
      if (isSaved(land.id)) {
        unsaveLand(land.id);
      } else {
        saveLand(land.id);
      }
    }
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Property link has been copied to clipboard",
    });
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
      return `${size.toLocaleString()} square meters`;
    } else {
      return `${(size / 10000).toFixed(2)} hectares (${size.toLocaleString()} sqm)`;
    }
  };

  if (!land) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Property not found</h2>
          <Link to="/lands" className="btn-estate">
            Return to Lands
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <Navbar />

      <main className="flex-grow pt-28 pb-16">
        <div className="container-custom">
          {/* Back button and actions */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/lands" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="mr-1" size={20} />
              <span>Back to Lands</span>
            </Link>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={toggleFavorite}
              >
                <Heart className="mr-2" size={18} fill={isAuthenticated && land && isSaved(land.id) ? "currentColor" : "none"} />
                <span>{isAuthenticated && land && isSaved(land.id) ? "Saved" : "Save"}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleShare}
              >
                <Share className="mr-2" size={18} />
                <span>Share</span>
              </Button>
            </div>
          </div>

          {/* Property header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{land.title}</h1>
            <div className="flex items-center text-muted-foreground">
              <MapPin size={18} className="mr-1" />
              <span>{land.address}</span>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Property details */}
            <div className="lg:col-span-2">
              {/* Property image */}
              <div className="rounded-xl overflow-hidden mb-8">
                <img
                  src={land.image}
                  alt={land.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Tabs for property information */}
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Property Description</h3>
                    <p className="text-muted-foreground">{land.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Property Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Ruler className="h-5 w-5 text-estate-accent mr-3" />
                        <div>
                          <p className="text-sm text-muted-foreground">Size</p>
                          <p className="font-medium">{formatSize(land.size)}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Building className="h-5 w-5 text-estate-accent mr-3" />
                        <div>
                          <p className="text-sm text-muted-foreground">Zoning</p>
                          <p className="font-medium capitalize">{land.zoning}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Map className="h-5 w-5 text-estate-accent mr-3" />
                        <div>
                          <p className="text-sm text-muted-foreground">State</p>
                          <p className="font-medium">{land.state}</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Landmark className="h-5 w-5 text-estate-accent mr-3" />
                        <div>
                          <p className="text-sm text-muted-foreground">City</p>
                          <p className="font-medium">{land.city}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Land Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {land.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Nearby Amenities</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {land.amenities.map((amenity, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Available Documents</h3>
                    <ul className="space-y-3">
                      {land.documents.map((document, index) => (
                        <li key={index} className="flex items-start p-3 border border-muted rounded-lg">
                          <FileText className="h-5 w-5 text-estate-accent mr-3 mt-0.5" />
                          <div>
                            <p className="font-medium">{document}</p>
                            <p className="text-sm text-muted-foreground">
                              {document === "Certificate of Occupancy" && "The primary legal document confirming ownership"}
                              {document === "Survey Plan" && "Shows the exact boundaries and dimensions of the land"}
                              {document === "Deed of Assignment" && "Legal document transferring ownership rights"}
                              {document === "Governor's Consent" && "Official approval for the transfer of land rights"}
                              {document === "Development Approval" && "Permission for specific development activities"}
                              {document === "Environmental Impact Assessment" && "Study of potential environmental effects"}
                              {document === "Approved Building Plan" && "Official approval for construction plans"}
                              {document === "Commercial Development Approval" && "Permission for commercial development"}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Note:</strong> All documents can be verified and inspected during the property viewing.
                      Our legal team ensures all properties have proper documentation to protect your investment.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Location Information</h3>
                    <p className="text-muted-foreground mb-4">
                      This property is located in {land.city}, {land.state}, Nigeria. The area offers the following advantages:
                    </p>

                    <div className="bg-muted/30 p-4 rounded-lg mb-4">
                      <h4 className="font-medium mb-2">Area Highlights</h4>
                      <ul className="space-y-2">
                        {land.amenities.map((amenity, index) => (
                          <li key={index} className="flex items-start">
                            <ArrowRight className="h-5 w-5 text-estate-accent mr-2 mt-0.5" />
                            <span>Proximity to {amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Interactive map would be displayed here</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right column - Contact and pricing */}
            <div>
              {/* Price card */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 sticky top-28">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-3xl font-bold text-estate-accent">{formatPrice(land.price)}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Land Size</span>
                    <span className="font-medium">{formatSize(land.size)}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Price per sqm</span>
                    <span className="font-medium">
                      {formatPrice(Math.round(land.price / land.size))}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Zoning</span>
                    <span className="font-medium capitalize">{land.zoning}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{land.city}, {land.state}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-estate text-estate-foreground hover:bg-estate/90">
                    Request Viewing
                  </Button>

                  <Button variant="outline" className="w-full">
                    Contact Agent
                  </Button>
                </div>
              </div>

              {/* Agent card */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden mr-3">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Agent"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Oluwaseun Adeyemi</h3>
                    <p className="text-sm text-muted-foreground">Land Specialist</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <Phone size={18} className="text-estate-accent mr-2" />
                    <span>+234 801 234 5678</span>
                  </div>

                  <div className="flex items-center">
                    <Mail size={18} className="text-estate-accent mr-2" />
                    <span>oluwaseun@adejolahomes.com</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Schedule a Viewing</h4>
                  <div className="space-y-3">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Your name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-estate-accent"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-estate-accent"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 rounded-lg border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-estate-accent"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1">
                        Preferred date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          className="w-full px-4 py-2 rounded-lg border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-estate-accent"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                      </div>
                    </div>

                    <button className="w-full btn-estate py-3">
                      Request a viewing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Calculator */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Calculator className="mr-2" size={24} />
                Investment Potential
              </h2>
              <Button
                variant="outline"
                onClick={() => setShowCalculator(!showCalculator)}
              >
                {showCalculator ? "Hide Calculator" : "Show Calculator"}
              </Button>
            </div>

            {showCalculator ? (
              <LandInvestmentCalculator
                initialPrice={land?.price || 50000000}
                initialSize={land?.size || 1000}
              />
            ) : (
              <div className="bg-muted/20 p-6 rounded-xl text-center">
                <p className="mb-4">
                  Calculate the potential return on investment for this land property.
                </p>
                <Button onClick={() => setShowCalculator(true)}>
                  Open Investment Calculator
                </Button>
              </div>
            )}
          </div>

          {/* Legal notice */}
          <div className="mt-12 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
            <p>
              <strong>Disclaimer:</strong> The information provided about this property is believed to be accurate but is not warranted.
              Buyers should verify all information and obtain legal advice before making any purchase decisions.
              Adejola Homes recommends conducting proper due diligence and using professional services for all land transactions.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandDetail;
