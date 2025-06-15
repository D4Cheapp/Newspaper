import { HeroUIProvider, ToastProvider } from '@heroui/react';

type Props = {
  children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
};
