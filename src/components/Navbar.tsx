
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Bell, Menu, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <header className={cn("border-b border-security-border bg-security-background/95 backdrop-blur sticky top-0 z-50", className)}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <HandHeart className="h-6 w-6 text-[#D946EF]" />
            <span className="font-bold text-lg">SafeGuardian</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-[#D946EF] transition-colors">
            Dashboard
          </Link>
          <Link to="/alerts" className="text-sm font-medium hover:text-[#D946EF] transition-colors">
            Alerts
          </Link>
          <Link to="/cameras" className="text-sm font-medium hover:text-[#D946EF] transition-colors">
            Safety Cameras
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#D946EF] rounded-full" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
