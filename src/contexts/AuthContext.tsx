import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { LandProperty } from '../data/nigerianLands';

interface User {
  id: string;
  name: string;
  email: string;
  savedLands: string[]; // Array of land IDs
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  saveLand: (landId: string) => void;
  unsaveLand: (landId: string) => void;
  isSaved: (landId: string) => boolean;
  getSavedLands: () => string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    savedLands: []
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    savedLands: []
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Create a copy without the password
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === email)) {
      toast({
        title: "Registration failed",
        description: "Email already in use",
        variant: "destructive"
      });
      
      return false;
    }
    
    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      password,
      savedLands: []
    };
    
    mockUsers.push(newUser);
    
    // Set current user (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword as User);
    
    toast({
      title: "Registration successful",
      description: `Welcome, ${name}!`,
    });
    
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };
  
  const saveLand = (landId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save properties",
        variant: "destructive"
      });
      return;
    }
    
    if (user.savedLands.includes(landId)) {
      return; // Already saved
    }
    
    const updatedUser = {
      ...user,
      savedLands: [...user.savedLands, landId]
    };
    
    setUser(updatedUser);
    
    // Update the mock user as well
    const mockUserIndex = mockUsers.findIndex(u => u.id === user.id);
    if (mockUserIndex !== -1) {
      mockUsers[mockUserIndex].savedLands.push(landId);
    }
    
    toast({
      title: "Property saved",
      description: "This property has been added to your saved list",
    });
  };
  
  const unsaveLand = (landId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      savedLands: user.savedLands.filter(id => id !== landId)
    };
    
    setUser(updatedUser);
    
    // Update the mock user as well
    const mockUserIndex = mockUsers.findIndex(u => u.id === user.id);
    if (mockUserIndex !== -1) {
      mockUsers[mockUserIndex].savedLands = mockUsers[mockUserIndex].savedLands.filter(id => id !== landId);
    }
    
    toast({
      title: "Property removed",
      description: "This property has been removed from your saved list",
    });
  };
  
  const isSaved = (landId: string): boolean => {
    return user ? user.savedLands.includes(landId) : false;
  };
  
  const getSavedLands = (): string[] => {
    return user ? user.savedLands : [];
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        register, 
        logout,
        saveLand,
        unsaveLand,
        isSaved,
        getSavedLands
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
