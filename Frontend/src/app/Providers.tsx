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
      <div className="w-full flex flex-col min-h-screen">
        <Navbar />
        <AuthProvider>
          <section className="max-w-[1024px] w-full pl-6 pr-6 mx-auto pb-16 flex-1">
            {children}
          </section>
        </AuthProvider>
        <Footer />
      </div>
    </HeroUIProvider>
  );
};
