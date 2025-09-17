import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, BarChart3, Calendar } from 'lucide-react';

interface CalculatorProps {
  initialPrice?: number;
  initialSize?: number;
}

const LandInvestmentCalculator: React.FC<CalculatorProps> = ({ 
  initialPrice = 50000000, 
  initialSize = 1000 
}) => {
  // Investment parameters
  const [purchasePrice, setPurchasePrice] = useState<number>(initialPrice);
  const [landSize, setLandSize] = useState<number>(initialSize);
  const [appreciationRate, setAppreciationRate] = useState<number>(15);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(5);
  const [developmentCost, setDevelopmentCost] = useState<number>(0);
  const [developmentType, setDevelopmentType] = useState<string>("none");
  const [annualRentalYield, setAnnualRentalYield] = useState<number>(0);
  
  // Results
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [annualizedReturn, setAnnualizedReturn] = useState<number>(0);
  const [rentalIncome, setRentalIncome] = useState<number>(0);
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  
  // Calculate investment returns
  useEffect(() => {
    // Total initial investment
    const investment = purchasePrice + developmentCost;
    setTotalInvestment(investment);
    
    // Future value calculation with compound interest
    const fv = purchasePrice * Math.pow(1 + (appreciationRate / 100), holdingPeriod);
    setFutureValue(fv);
    
    // Total return
    const totalRet = fv - purchasePrice;
    setTotalReturn(totalRet);
    
    // Annualized return
    const annRet = (Math.pow((fv / purchasePrice), (1 / holdingPeriod)) - 1) * 100;
    setAnnualizedReturn(annRet);
    
    // Annual rental income (if applicable)
    if (developmentType !== "none" && annualRentalYield > 0) {
      const rental = (purchasePrice + developmentCost) * (annualRentalYield / 100);
      setRentalIncome(rental);
    } else {
      setRentalIncome(0);
    }
  }, [purchasePrice, landSize, appreciationRate, holdingPeriod, developmentCost, developmentType, annualRentalYield]);
  
  // Update development cost based on development type
  useEffect(() => {
    switch (developmentType) {
      case "residential":
        setDevelopmentCost(landSize * 150000); // ₦150,000 per sqm for residential
        setAnnualRentalYield(5); // 5% rental yield for residential
        break;
      case "commercial":
        setDevelopmentCost(landSize * 200000); // ₦200,000 per sqm for commercial
        setAnnualRentalYield(8); // 8% rental yield for commercial
        break;
      case "mixed":
        setDevelopmentCost(landSize * 180000); // ₦180,000 per sqm for mixed-use
        setAnnualRentalYield(7); // 7% rental yield for mixed-use
        break;
      default:
        setDevelopmentCost(0);
        setAnnualRentalYield(0);
        break;
    }
  }, [developmentType, landSize]);
  
  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-estate-accent" />
          Land Investment Calculator
        </CardTitle>
        <CardDescription>
          Calculate potential returns on your Nigerian land investment
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="basic">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            {/* Purchase Price */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Purchase Price: {formatCurrency(purchasePrice)}
              </label>
              <Slider
                value={[purchasePrice]}
                min={1000000}
                max={1000000000}
                step={1000000}
                onValueChange={(value) => setPurchasePrice(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>₦1M</span>
                <span>₦1B</span>
              </div>
            </div>
            
            {/* Land Size */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Land Size: {landSize.toLocaleString()} sqm
              </label>
              <Slider
                value={[landSize]}
                min={100}
                max={10000}
                step={100}
                onValueChange={(value) => setLandSize(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>100 sqm</span>
                <span>10,000 sqm</span>
              </div>
            </div>
            
            {/* Appreciation Rate */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Annual Appreciation Rate: {appreciationRate}%
              </label>
              <Slider
                value={[appreciationRate]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setAppreciationRate(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>
            
            {/* Holding Period */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Holding Period: {holdingPeriod} years
              </label>
              <Slider
                value={[holdingPeriod]}
                min={1}
                max={20}
                step={1}
                onValueChange={(value) => setHoldingPeriod(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 year</span>
                <span>20 years</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            {/* Development Type */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Development Type
              </label>
              <Select
                value={developmentType}
                onValueChange={setDevelopmentType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select development type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Land Only (No Development)</SelectItem>
                  <SelectItem value="residential">Residential Development</SelectItem>
                  <SelectItem value="commercial">Commercial Development</SelectItem>
                  <SelectItem value="mixed">Mixed-Use Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Development Cost */}
            {developmentType !== "none" && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Development Cost (Estimated)
                </label>
                <Input
                  type="text"
                  value={formatCurrency(developmentCost)}
                  readOnly
                  className="bg-muted/20"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Based on {landSize.toLocaleString()} sqm and typical construction costs for {developmentType} properties
                </p>
              </div>
            )}
            
            {/* Rental Yield */}
            {developmentType !== "none" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Annual Rental Yield: {annualRentalYield}%
                </label>
                <Slider
                  value={[annualRentalYield]}
                  min={0}
                  max={15}
                  step={0.5}
                  onValueChange={(value) => setAnnualRentalYield(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0%</span>
                  <span>15%</span>
                </div>
              </div>
            )}
            
            {/* Custom Appreciation Rate */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Custom Annual Appreciation Rate: {appreciationRate}%
              </label>
              <Input
                type="number"
                min={1}
                max={50}
                value={appreciationRate}
                onChange={(e) => setAppreciationRate(Number(e.target.value))}
                className="mb-1"
              />
              <p className="text-xs text-muted-foreground">
                Nigerian land typically appreciates 10-20% annually in growing areas
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Results */}
        <div className="mt-8 pt-6 border-t">
          <h3 className="font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-estate-accent" />
            Investment Projection
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Investment</p>
              <p className="text-xl font-semibold">{formatCurrency(totalInvestment)}</p>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Future Value (after {holdingPeriod} years)</p>
              <p className="text-xl font-semibold">{formatCurrency(futureValue)}</p>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Return</p>
              <p className="text-xl font-semibold">{formatCurrency(totalReturn)}</p>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Annualized Return</p>
              <p className="text-xl font-semibold">{annualizedReturn.toFixed(2)}%</p>
            </div>
            
            {developmentType !== "none" && annualRentalYield > 0 && (
              <div className="bg-muted/20 p-4 rounded-lg md:col-span-2">
                <p className="text-sm text-muted-foreground">Annual Rental Income</p>
                <p className="text-xl font-semibold">{formatCurrency(rentalIncome)}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground mb-2">
          <strong>Note:</strong> This calculator provides estimates based on historical trends and current market conditions. Actual returns may vary.
        </p>
        <p className="text-xs text-muted-foreground">
          Consult with a real estate professional before making investment decisions.
        </p>
      </CardFooter>
    </Card>
  );
};

export default LandInvestmentCalculator;
