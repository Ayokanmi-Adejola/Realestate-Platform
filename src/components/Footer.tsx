
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-light tracking-tight inline-block mb-6">
              Estate<span className="font-medium text-estate-accent">Hub</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              We provide premium real estate solutions with a focus on luxury, comfort, and innovative design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-muted rounded-full hover:bg-estate-muted transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-muted rounded-full hover:bg-estate-muted transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-muted rounded-full hover:bg-estate-muted transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-muted rounded-full hover:bg-estate-muted transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Properties', 'About', 'Contact', 'Blog', 'Careers'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                    className="flex items-center text-muted-foreground hover:text-estate-accent transition-colors"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-medium mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                'Buy Property', 
                'Sell Property', 
                'Rent Property', 
                'Property Valuation',
                'Investment Advisory',
                'Market Research'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/services/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-muted-foreground hover:text-estate-accent transition-colors"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={20} className="mr-3 flex-shrink-0 text-estate-accent" />
                <span className="text-muted-foreground">
                  1234 Luxury Avenue, Prestige Heights, CA 90210
                </span>
              </li>
              <li className="flex">
                <Phone size={20} className="mr-3 flex-shrink-0 text-estate-accent" />
                <span className="text-muted-foreground">
                  (555) 123-4567
                </span>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-3 flex-shrink-0 text-estate-accent" />
                <span className="text-muted-foreground">
                  contact@estatehub.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-muted">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} EstateHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-estate-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-estate-accent transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-estate-accent transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
