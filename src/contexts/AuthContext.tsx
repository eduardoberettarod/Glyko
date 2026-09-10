import React, { createContext, useContext, useState } from 'react';
import { Usuario } from '@/database/users';

interface AuthContextValue {
  user: Usuario | null;
  login: (user: Usuario) => void;
  updateUser: (user: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Guarda o usuário atualmente logado para que qualquer tela
 * (Dashboard, Histórico, Perfil, Registro de medição...) saiba
 * quem é o usuário sem precisar receber isso por parâmetro de rota.
 *
 * Por enquanto a sessão vive apenas em memória (não sobrevive a um
 * fechamento completo do app). Se no futuro for necessário manter o
 * usuário logado entre aberturas do app, basta persistir `user` com
 * AsyncStorage/SecureStore aqui dentro.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  function login(usuarioLogado: Usuario) {
    setUser(usuarioLogado);
  }

  function updateUser(usuarioAtualizado: Usuario) {
    setUser(usuarioAtualizado);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um <AuthProvider>.');
  }

  return context;
}
