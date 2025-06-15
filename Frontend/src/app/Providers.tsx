import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { Footer } from 'components/Footer/Footer';
import { Navbar } from 'components/Navbar/Navbar';

import { AuthProvider } from './authContext';

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <Navbar />
      <AuthProvider>
        <section className="max-w-[1024px] w-full flex-1 min-h-full pl-6 pr-6 mx-auto pb-16">
          {children}
        </section>
      </AuthProvider>
      <Footer />
    </HeroUIProvider>
  );
};
