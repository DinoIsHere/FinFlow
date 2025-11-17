import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, BookOpen, Shield, ArrowRight, Sparkles, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Target,
    title: "Smart Budget Tracking",
    description: "Monitor your spending patterns and set realistic financial goals that adapt to your lifestyle.",
  },
  {
    icon: BookOpen,
    title: "Financial Education",
    description: "Access curated resources to build your money management skills and financial confidence.",
  },
  {
    icon: LineChart,
    title: "Visual Analytics",
    description: "Understand your financial health through intuitive charts and personalized insights.",
  },
  {
    icon: Shield,
    title: "Overspending Protection",
    description: "Get alerts and guidance to help you avoid impulse purchases and stay on track.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background page-transition">
      {/* nav area */}
      <nav className="absolute top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/public/logo.png"
              alt="FinFlow Logo"
              className="w-14 h-14 rounded-xl"
            />
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="gap-2 glass-card hover-lift btn-premium">
              Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* main section */}
      <section className="relative h-screen w-full overflow-hidden hero-glow">
        {/* bg video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20 float"
          >
            <source src="/bgvid.mp4" type="video/mp4" />
          </video>
          {/* overlay */}
          <div className="absolute inset-0 bg-background/60 grid-pattern" />
        </div>
        
        {/* content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Built for the next generation of financial leaders
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Take Control of Your
              <span className="block gradient-text">
                Financial Future
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              FinFlow empowers young adults to build healthy financial habits, overcome spending challenges,
              and achieve their money goals with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 btn-premium shimmer-border text-primary-foreground hover:opacity-90 transition-opacity hover-lift">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/resources">
                <Button size="lg" variant="outline" className="gap-2 glass-card hover-lift">
                  <BookOpen className="w-5 h-5" />
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <ArrowRight className="w-6 h-6 text-foreground/60 rotate-90" />
          </div>
        </div>
      </section>

      {/* mission part */}
      <section className="w-full px-6 py-16 md:py-24 bg-gradient-card border-y border-border">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium glass-card glow">
            <Sparkles className="w-4 h-4" />
            Our Mission
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Empowering Youths in The Era of Disruption
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center space-y-4 hover-lift glass-card rounded-xl p-6">
              <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center float">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Digital Transformation</h3>
              <p className="text-muted-foreground">
                In an era where financial apps are complex and overwhelming, we provide a simple, intuitive platform designed for young minds.
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift glass-card rounded-xl p-6">
              <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center float">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Financial Literacy</h3>
              <p className="text-muted-foreground">
                With rising inflation and economic uncertainty, empowering youths with proper financial education and tools is crucial for their future.
              </p>
            </div>
            
            <div className="text-center space-y-4 hover-lift glass-card rounded-xl p-6">
              <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center float">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Sustainable Habits</h3>
              <p className="text-muted-foreground">
                Building lifelong financial discipline through gamification, education, and personalized guidance for long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools and resources designed specifically for young adults navigating their financial journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card border-border hover:border-primary/50 transition-all group hover-lift shimmer-border">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform float">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors gradient-text">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* cta part */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <Card className="bg-gradient-primary border-0 overflow-hidden relative shimmer-border glow">
          <div className="absolute inset-0 bg-grid-white/10 grid-pattern" />
          <CardContent className="p-8 md:p-12 text-center relative">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 gradient-text">
              Ready to Transform Your Financial Life?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of young adults who are already building better financial habits with FinFlow.
            </p>
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 gap-2 hover-lift btn-premium"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* footer */}
      <footer className="border-t border-border bg-background/50 glass-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 hover-lift">
              <img
                src="/logo.png"
                alt="FinFlow Logo"
                className="w-10 h-10 rounded-lg float"
              />
              <span className="font-bold text-foreground gradient-text">FinFlow</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 FinFlow. Empowering youth financial literacy.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 glow" />
              <span className="text-xs text-muted-foreground">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
