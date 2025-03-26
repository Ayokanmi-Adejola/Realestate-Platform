
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setMobileMenuOpen(false);
    // Close search when changing routes
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to a search results page with query params
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery}"`,
      });
      
      // Navigate to properties page with the search query
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 glass shadow-sm' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className={`text-sm font-medium transition-colors hover:text-estate-accent ${
                      location.pathname === link.href 
                        ? 'text-estate-accent' 
                        : 'text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 py-2 pl-3 pr-8 rounded-full border border-input text-sm focus:outline-none focus:ring-2 focus:ring-estate-accent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-estate-accent"
                >
                  <Search size={16} />
                </button>
              </form>
            ) : (
              <button className="btn-estate-ghost p-2 rounded-full" onClick={toggleSearch}>
                <Search size={20} />
              </button>
            )}
            <Link to="/login" className="btn-estate-outline">Sign In</Link>
            <Link to="/register" className="btn-estate">Get Started</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-muted/50"
              onClick={toggleSearch}
            >
              <Search size={20} />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-muted/50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="mt-4 px-4 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 pl-3 pr-8 rounded-full border border-input text-sm focus:outline-none focus:ring-2 focus:ring-estate-accent"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-estate-accent"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 top-[57px] z-40 bg-background/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-custom py-6">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href}
                className={`py-2 text-lg font-medium transition-colors ${
                  location.pathname === link.href 
                    ? 'text-estate-accent' 
                    : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <Link to="/login" className="block w-full py-2 text-lg font-medium">Sign In</Link>
              <Link to="/register" className="block w-full mt-2 py-2 text-center rounded-lg bg-estate text-estate-foreground">
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
