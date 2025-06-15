'use client';

import { Roles } from 'constants/roles';

import { createContext, useContext } from 'react';

type AuthContextType = {
  role: Roles | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const role = localStorage.getItem('role') as Roles;
  return <AuthContext.Provider value={{ role }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
