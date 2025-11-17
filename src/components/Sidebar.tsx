import { Home, BookOpen, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AssetsModal } from "@/components/AssetsModal";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Resources", url: "/resources", icon: BookOpen },
  { title: "News", url: "/news", icon: Newspaper },
];

export function Sidebar() {
  const navigate = useNavigate();
  
  return (
    <aside className="bg-sidebar border-r border-sidebar-border flex flex-col w-20 lg:w-64 h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out">
      {/* header */}
      <div className="p-2 lg:p-6 border-b border-sidebar-border">
        <button
          onClick={() => navigate('/')}
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <img
            src="/asset/logo.png"
            alt="FinFlow Logo"
            className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl"
          />
        </button>
      </div>

      {/* nav items */}
      <div className="flex-1 p-2 lg:p-4 space-y-2">
        {navItems.map((item) => (
          <div key={item.url} className="relative group">
            <NavLink
              to={item.url}
              end
              className="flex items-center gap-3 lg:gap-3 px-2 lg:px-4 py-3 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all justify-center lg:justify-start"
              activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium border border-primary/20"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="hidden lg:block">{item.title}</span>
            </NavLink>
            
            {/* tooltip */}
            <div className="absolute left-16 bg-sidebar-accent text-sidebar-foreground px-2 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 lg:hidden">
              {item.title}
            </div>
          </div>
        ))}
        
        {/* assets modal */}
        <div className="pt-2">
          <AssetsModal />
        </div>
      </div>

      {/* footer */}
      <div className="p-2 lg:p-4 border-t border-sidebar-border space-y-4">
        <div className="flex items-center justify-center">
          <ThemeToggle />
        </div>
        
        <div className="hidden lg:block p-4 rounded-lg bg-gradient-primary">
          <p className="text-sm font-medium text-primary-foreground mb-1">Pro Tip</p>
          <p className="text-xs text-primary-foreground/80">
            Track your spending daily to build better financial habits
          </p>
        </div>
        
        {/* mobile tip */}
        <div className="lg:hidden relative group">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="text-xs text-primary-foreground">💡</span>
            </div>
          </div>
          <div className="absolute left-16 bg-sidebar-accent text-sidebar-foreground px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            Track spending daily
          </div>
        </div>
      </div>
    </aside>
  );
}
