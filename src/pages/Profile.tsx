import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nigerianLands, LandProperty } from '../data/nigerianLands';
import LandCard from '../components/LandCard';
import { User, LogOut, Heart, Settings, MapPin, Mail, Phone } from 'lucide-react';

const Profile = () => {
  const { user, isAuthenticated, logout, getSavedLands } = useAuth();
  const navigate = useNavigate();
  const [savedLands, setSavedLands] = useState<LandProperty[]>([]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    if (isAuthenticated) {
      const savedLandIds = getSavedLands();
      const lands = nigerianLands.filter(land => savedLandIds.includes(land.id));
      setSavedLands(lands);
    }
  }, [isAuthenticated, getSavedLands]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect to login
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-muted overflow-hidden mb-4">
                    <div className="w-full h-full flex items-center justify-center bg-estate-accent text-white text-3xl font-semibold">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/profile')}>
                    <Heart className="mr-2 h-4 w-4" />
                    Saved Properties ({savedLands.length})
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-500" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-semibold mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-estate-accent mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Call us</p>
                      <p className="font-medium">+234 800 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-estate-accent mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email us</p>
                      <p className="font-medium">support@adejolahomes.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-estate-accent mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Visit us</p>
                      <p className="font-medium">123 Estate Avenue, Ikoyi, Lagos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="saved">
                <TabsList className="mb-6">
                  <TabsTrigger value="saved">Saved Properties</TabsTrigger>
                  <TabsTrigger value="profile">Profile Information</TabsTrigger>
                </TabsList>
                
                <TabsContent value="saved">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Your Saved Properties</h2>
                    
                    {savedLands.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedLands.map(land => (
                          <div key={land.id} className="relative">
                            <LandCard land={land} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-muted/20 rounded-lg">
                        <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No saved properties yet</h3>
                        <p className="text-muted-foreground mb-6">
                          Start exploring Nigerian lands and save your favorites
                        </p>
                        <Button onClick={() => navigate('/lands')}>
                          Explore Lands
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="profile">
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input 
                          type="text" 
                          value={user.name}
                          readOnly
                          className="w-full px-4 py-2 rounded-lg border border-input bg-muted/20"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input 
                          type="email" 
                          value={user.email}
                          readOnly
                          className="w-full px-4 py-2 rounded-lg border border-input bg-muted/20"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Account ID</label>
                        <input 
                          type="text" 
                          value={user.id}
                          readOnly
                          className="w-full px-4 py-2 rounded-lg border border-input bg-muted/20"
                        />
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-4">
                          This is a demo account. In a real application, you would be able to edit your profile information.
                        </p>
                        <Button variant="outline" onClick={logout}>
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
