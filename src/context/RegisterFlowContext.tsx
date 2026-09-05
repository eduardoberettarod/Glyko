import { createContext, useContext, useState } from 'react';

type RegisterFlowContextType = {
  footerTop: number | null;
  setFooterTop: (y: number) => void;
};

const RegisterFlowContext = createContext<RegisterFlowContextType | null>(null);

export function RegisterFlowProvider({ children }: { children: React.ReactNode }) {
  const [footerTop, setFooterTop] = useState<number | null>(null);
  return (
    <RegisterFlowContext.Provider value={{ footerTop, setFooterTop }}>
      {children}
    </RegisterFlowContext.Provider>
  );
}

export function useRegisterFlow() {
  const ctx = useContext(RegisterFlowContext);
  if (!ctx) throw new Error('useRegisterFlow deve estar dentro de RegisterFlowProvider');
  return ctx;
}