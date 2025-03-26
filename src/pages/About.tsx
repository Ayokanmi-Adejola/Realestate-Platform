
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Building, Shield, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">About Adejola Homes</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted real estate partners providing exceptional properties and services across Nigeria since 2018
            </p>
          </div>
          
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2018, Adejola Homes & Properties started with a simple mission - to simplify the property buying, selling, and renting experience for Nigerians.
                </p>
                <p className="text-muted-foreground mb-4">
                  What began as a small family business has now grown into one of Nigeria's most trusted real estate agencies, helping thousands of clients find their dream homes and make smart property investments.
                </p>
                <p className="text-muted-foreground">
                  Our deep understanding of the Nigerian real estate market, combined with our commitment to integrity and client satisfaction, has established us as industry leaders.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" 
                  alt="Modern building exterior" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Us</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Building className="h-10 w-10 text-estate-accent" />,
                  title: "Quality Properties",
                  description: "We carefully vet all properties to ensure they meet our high standards"
                },
                {
                  icon: <Shield className="h-10 w-10 text-estate-accent" />,
                  title: "Trusted Service",
                  description: "Our reputation is built on transparency and reliability"
                },
                {
                  icon: <Award className="h-10 w-10 text-estate-accent" />,
                  title: "Industry Expertise",
                  description: "Our team brings years of real estate knowledge and insight"
                },
                {
                  icon: <Users className="h-10 w-10 text-estate-accent" />,
                  title: "Client Focused",
                  description: "Your satisfaction is our top priority throughout your journey"
                }
              ].map((item, index) => (
                <div key={index} className="bg-card p-6 rounded-xl shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
