'use client';

import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return <footer className="w-full min-h-20 bg-gray-600 text-white" />;
};
