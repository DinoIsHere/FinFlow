import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  type?: 'slide' | 'fade' | 'scale' | 'none';
  stagger?: boolean;
}

export function PageTransition({ 
  children, 
  className, 
  type = 'slide',
  stagger = false 
}: PageTransitionProps) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (children !== displayChildren) {
      setIsVisible(false);
      
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsVisible(true);
      }, 150); // Half of slide out animation

      return () => clearTimeout(timer);
    }
  }, [children, displayChildren]);

  const transitionClasses = {
    slide: 'page-transition',
    fade: 'page-transition fade',
    scale: 'page-transition scale',
    none: ''
  };

  const containerClasses = cn(
    'transition-all duration-300',
    isVisible ? 'opacity-100' : 'opacity-0',
    transitionClasses[type],
    stagger && 'page-stagger',
    className
  );

  return (
    <div className={containerClasses}>
      {displayChildren}
    </div>
  );
}

// Hook for easier usage
export function usePageTransition(type: 'slide' | 'fade' | 'scale' = 'slide') {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setDisplayLocation(location);
    }
  }, [location, displayLocation]);

  return { location: displayLocation };
}