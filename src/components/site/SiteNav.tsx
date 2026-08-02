import React from 'react';
import { Link } from '@tanstack/react-router';

export function SiteNav() {
  return (
    <nav className="flex items-center gap-6">
      <Link 
        to="/" 
        className="font-body text-sm text-ink/60 hover:text-ink transition-colors"
      >
        Home
      </Link>
      <Link 
        to="/advertise" 
        className="font-body text-sm text-ink/60 hover:text-ink transition-colors"
      >
        Advertise
      </Link>
      <Link 
        to="/drive" 
        className="font-body text-sm text-ink/60 hover:text-ink transition-colors"
      >
        Drive
      </Link>
      <Link 
        to="/about" 
        className="font-body text-sm text-ink/60 hover:text-ink transition-colors"
      >
        About
      </Link>
    </nav>
  );
}
