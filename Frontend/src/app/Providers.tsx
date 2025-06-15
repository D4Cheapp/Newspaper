import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { Footer } from 'components/Footer/Footer';
import { Navbar } from 'components/Navbar/Navbar';

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <Navbar />
      {children}
      <Footer />
    </HeroUIProvider>
  );
};
