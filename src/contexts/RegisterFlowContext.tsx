import React, { createContext, useContext, useState } from 'react';
import { DiabetesType } from '@/components/DiabetesTypeSelector';

interface RegisterFlowData {
  firstName: string;
  lastName: string;
  birthDate: Date | undefined;
  email: string;
  password: string;
  diabetesType: DiabetesType;
}

interface RegisterFlowContextValue {
  data: RegisterFlowData;
  updateData: (partial: Partial<RegisterFlowData>) => void;
  /** true quando o fluxo foi aberto a partir de "Editar Perfil" em vez do cadastro inicial. */
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const initialData: RegisterFlowData = {
  firstName: '',
  lastName: '',
  birthDate: undefined,
  email: '',
  password: '',
  diabetesType: 'tipo1',
};

const RegisterFlowContext = createContext<RegisterFlowContextValue | undefined>(undefined);

/**
 * Guarda os dados preenchidos ao longo das 3 telas de cadastro
 * (dados pessoais -> credenciais -> tipo de diabetes) para que
 * a última tela consiga enviar tudo de uma vez para `criarUsuario`.
 */
export function RegisterFlowProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<RegisterFlowData>(initialData);
  const [isEditing, setIsEditing] = useState(false);

  function updateData(partial: Partial<RegisterFlowData>) {
    setData((current) => ({ ...current, ...partial }));
  }

  return (
    <RegisterFlowContext.Provider value={{ data, updateData, isEditing, setIsEditing }}>
      {children}
    </RegisterFlowContext.Provider>
  );
}

export function useRegisterFlow() {
  const context = useContext(RegisterFlowContext);

  if (!context) {
    throw new Error('useRegisterFlow precisa ser usado dentro de um <RegisterFlowProvider>.');
  }

  return context;
}
