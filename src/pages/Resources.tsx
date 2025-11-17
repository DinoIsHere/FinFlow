import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookOpen, DollarSign, TrendingUp, Shield, Lightbulb, Target, Calendar, Clock, User } from "lucide-react";

const resources = [
  {
    id: "budget-basics",
    title: "Budget Basics",
    description: "Learn the fundamentals of creating and sticking to a budget that works for you.",
    icon: DollarSign,
    topics: ["50/30/20 Rule", "Tracking Expenses", "Setting Limits"],
    color: "hsl(195 100% 50%)",
    content: {
      overview: "Master the art of budgeting with proven strategies that actually work.",
      details: [
        "The 50/30/20 rule: Allocate 50% for needs, 30% for wants, and 20% for savings",
        "Expense tracking methods: Manual, apps, and automatic categorization",
        "Setting realistic spending limits based on your income and lifestyle",
        "Creating emergency buffers and sinking funds"
      ],
      benefits: [
        "Take control of your spending",
        "Build savings consistently",
        "Reduce financial stress",
        "Achieve your money goals faster"
      ]
    }
  },
  {
    id: "saving-strategies",
    title: "Saving Strategies",
    description: "Discover effective ways to save money and build an emergency fund.",
    icon: Target,
    topics: ["Emergency Fund", "Automated Savings", "High-Yield Accounts"],
    color: "hsl(165 80% 45%)",
    content: {
      overview: "Learn proven strategies to save money systematically and build wealth.",
      details: [
        "Emergency fund: 3-6 months of expenses in easily accessible accounts",
        "Automated savings: Set up automatic transfers on payday",
        "High-yield savings accounts and money market options",
        "Saving challenges and gamification techniques"
      ],
      benefits: [
        "Build financial security",
        "Reduce reliance on credit",
        "Prepare for unexpected expenses",
        "Increase wealth over time"
      ]
    }
  },
  {
    id: "investing-101",
    title: "Investing 101",
    description: "Get started with investing and learn how to grow your wealth over time.",
    icon: TrendingUp,
    topics: ["Stock Market", "Index Funds", "Compound Interest"],
    color: "hsl(280 65% 55%)",
    content: {
      overview: "Begin your investment journey with fundamentals that create long-term wealth.",
      details: [
        "Stock market basics: How shares work and potential returns",
        "Index funds: Low-cost diversification for beginners",
        "Compound interest: The eighth wonder of the world",
        "Risk tolerance and investment timeline planning"
      ],
      benefits: [
        "Beat inflation over time",
        "Build long-term wealth",
        "Multiple income streams",
        "Financial independence"
      ]
    }
  },
  {
    id: "avoiding-debt",
    title: "Avoiding Debt Traps",
    description: "Understand credit cards, loans, and how to avoid falling into debt.",
    icon: Shield,
    topics: ["Credit Scores", "Interest Rates", "Debt Management"],
    color: "hsl(220 20% 60%)",
    content: {
      overview: "Protect yourself from debt traps and learn smart borrowing strategies.",
      details: [
        "Credit scores: How they're calculated and how to improve them",
        "Interest rates: Understanding APR, compounding, and impact on payments",
        "Debt management: Strategies for paying off existing debt",
        "Preventing debt: Smart spending habits and emergency planning"
      ],
      benefits: [
        "Improve creditworthiness",
        "Reduce financial stress",
        "Lower interest costs",
        "Better borrowing terms"
      ]
    }
  },
  {
    id: "smart-shopping",
    title: "Smart Shopping",
    description: "Make informed purchasing decisions and avoid impulsive spending.",
    icon: Lightbulb,
    topics: ["Needs vs Wants", "Price Comparison", "Delayed Gratification"],
    color: "hsl(210 20% 70%)",
    content: {
      overview: "Transform your purchasing habits with smart shopping techniques.",
      details: [
        "Needs vs wants: Decision framework for every purchase",
        "Price comparison: Tools and strategies to find the best deals",
        "Delayed gratification: Waiting periods and thinking it through",
        "Bulk buying and seasonal strategies"
      ],
      benefits: [
        "Save money on purchases",
        "Reduce buyer's remorse",
        "More thoughtful consumption",
        "Better use of resources"
      ]
    }
  },
  {
    id: "financial-psychology",
    title: "Financial Psychology",
    description: "Understand the emotional aspects of money and overcome spending addictions.",
    icon: BookOpen,
    topics: ["Spending Triggers", "Money Mindset", "Habit Formation"],
    color: "hsl(142 76% 36%)",
    content: {
      overview: "Master the mental game of money and develop healthy financial habits.",
      details: [
        "Spending triggers: Identifying emotional and environmental causes",
        "Money mindset: Overcoming limiting beliefs about wealth",
        "Habit formation: Creating automatic positive financial behaviors",
        "Mindfulness and financial decision-making"
      ],
      benefits: [
        "Control emotional spending",
        "Develop healthy money habits",
        "Reduce financial anxiety",
        "Sustainable financial behavior"
      ]
    }
  },
];

export default function Resources() {
  const [selectedResource, setSelectedResource] = useState<typeof resources[0] | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Financial Resources</h1>
        <p className="text-muted-foreground">
          Learn how to manage your money wisely and build a strong financial future
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all group cursor-pointer">
            <CardHeader>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: resource.color }}
              >
                <resource.icon className="w-6 h-6 text-background" />
              </div>
              <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                {resource.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {resource.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">What you'll learn:</p>
                <ul className="space-y-1">
                  {resource.topics.map((topic, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setSelectedResource(resource)}
              >
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-primary border-0">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-2">
            Need Personalized Help?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Connect with a financial advisor to get tailored advice for your situation
          </p>
          <Button 
            size="lg"
            className="bg-background text-primary hover:bg-background/90"
            onClick={() => setShowBookingModal(true)}
          >
            Book a Session
          </Button>
        </CardContent>
      </Card>

      {/* resource modal */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedResource && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: selectedResource.color }}
                  >
                    <selectedResource.icon className="w-8 h-8 text-background" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl text-foreground">{selectedResource.title}</DialogTitle>
                    <DialogDescription className="text-lg text-muted-foreground">
                      {selectedResource.content.overview}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">What You'll Learn</h3>
                    <ul className="space-y-3">
                      {selectedResource.content.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Benefits</h3>
                    <ul className="space-y-3">
                      {selectedResource.content.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Start Free Course
                    </Button>
                    <Button variant="outline" className="w-full">
                      Download Resources
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* booking modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl text-foreground">Book a Consultation</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Get personalized financial advice from our expert advisors
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* advisor pick */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">Choose Your Advisor</h3>
              <div className="grid gap-2">
                {[
                  { name: "Aldino Dimas Saputra", specialty: "Investment Planning" },
                  { name: "Muhammad Akbar Kurniawan", specialty: "Debt Management" },
                  { name: "Aprizal Nurindra Tama", specialty: "Budget & Savings" }
                ].map((advisor, idx) => (
                  <Card key={idx} className="p-3 cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground">{advisor.name}</h4>
                        <p className="text-xs text-muted-foreground">{advisor.specialty}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* date/time */}
            <div className="grid gap-3">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">Select Date & Time</h3>
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-1">
                    {["Tomorrow", "Tue, Dec 20", "Wed, Dec 21", "Thu, Dec 22"].map((date, idx) => (
                      <Button key={idx} variant="outline" size="sm" className="text-xs px-2 py-1 h-8">
                        <Calendar className="w-3 h-3 mr-1" />
                        {date}
                      </Button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"].map((time, idx) => (
                      <Button key={idx} variant="outline" size="sm" className="text-xs px-2 py-1 h-8">
                        <Clock className="w-3 h-3 mr-1" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* session type */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-2">Session Type</h3>
              <div className="grid gap-2">
                <Card className="p-3 cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">30-Minute Quick</h4>
                      <p className="text-xs text-muted-foreground">For specific questions</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">Free</span>
                  </div>
                </Card>
                <Card className="p-3 cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">60-Minute Deep Dive</h4>
                      <p className="text-xs text-muted-foreground">Comprehensive review</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">$50</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* book btn */}
            <div className="pt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Book Free Consultation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
