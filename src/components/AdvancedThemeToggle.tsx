import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";

export function AdvancedThemeToggle() {
  const { theme, setTheme, actualTheme, isTransitioning } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = actualTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const isDark = actualTheme === 'dark';

  return (
    <div className="relative">
      {/* Advanced theme toggle button */}
      <button
        onClick={toggleTheme}
        disabled={isTransitioning || isAnimating}
        className={`
          theme-toggle-advanced 
          ${isDark ? 'dark' : ''} 
          ${isAnimating ? 'animate-pulse' : ''}
          ${isTransitioning ? 'pointer-events-none' : ''}
        `}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        {/* Sun icon */}
        <Sun className="theme-icon sun" />
        
        {/* Moon icon */}
        <Moon className="theme-icon moon" />
      </button>

      {/* Theme transition indicator */}
      {(isTransitioning || isAnimating) && (
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 animate-pulse" />
      )}
    </div>
  );
}

// Advanced theme switcher for the home page
export function AdvancedThemeSwitcher() {
  const { theme, setTheme, actualTheme } = useTheme();
  const [selectedOption, setSelectedOption] = useState(actualTheme);

  useEffect(() => {
    setSelectedOption(actualTheme);
  }, [actualTheme]);

  const options = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ] as const;

  return (
    <div className="flex items-center gap-2 p-2 rounded-xl bg-background/50 backdrop-blur-sm border border-border">
      <span className="text-sm font-medium text-muted-foreground mr-2">Theme:</span>
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = selectedOption === option.value;
        
        return (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${isSelected 
                ? 'bg-primary text-primary-foreground shadow-md' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }
            `}
            aria-label={`Switch to ${option.label} theme`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}