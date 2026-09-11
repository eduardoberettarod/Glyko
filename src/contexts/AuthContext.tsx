import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, buscarUsuarioPorId } from '@/database/users';
import {
  cancelarLembretesDeMedicao,
  sincronizarLembretesDeMedicao,
} from '@/services/notifications';

const CHAVE_USUARIO_LOGADO = '@glyko:userId';

interface AuthContextValue {
  user: Usuario | null;
  isLoadingUser: boolean;
  login: (user: Usuario) => void;
  updateUser: (user: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Guarda o usuário atualmente logado e persiste o id dele no
 * dispositivo, para que a sessão sobreviva ao fechamento do app.
 * O usuário só é deslogado quando `logout()` é chamado explicitamente
 * (botão "Sair" da tela Profile).
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Ao iniciar o app, verifica se existe um id salvo e recarrega
  // os dados atuais do usuário direto do banco (evita usar dados
  // desatualizados que ficariam presos no armazenamento local).
  useEffect(() => {
    async function restaurarSessao() {
      try {
        const idSalvo = await AsyncStorage.getItem(CHAVE_USUARIO_LOGADO);

        if (idSalvo) {
          const usuario = await buscarUsuarioPorId(Number(idSalvo));
          setUser(usuario);
        }
      } catch (error) {
        // Id inválido, usuário excluído, etc. Remove a sessão salva.
        await AsyncStorage.removeItem(CHAVE_USUARIO_LOGADO);
      } finally {
        setIsLoadingUser(false);
      }
    }

    restaurarSessao();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.notifications_enabled) {
      sincronizarLembretesDeMedicao(user.id);
    } else {
      cancelarLembretesDeMedicao();
    }
  }, [user]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (proximoEstado) => {
      if (proximoEstado === 'active' && user?.notifications_enabled) {
        sincronizarLembretesDeMedicao(user.id);
      }
    });

    return () => subscription.remove();
  }, [user]);

  async function login(usuarioLogado: Usuario) {
    setUser(usuarioLogado);
    await AsyncStorage.setItem(CHAVE_USUARIO_LOGADO, String(usuarioLogado.id));
  }

  function updateUser(usuarioAtualizado: Usuario) {
    setUser(usuarioAtualizado);
  }

  async function logout() {
    cancelarLembretesDeMedicao();
    setUser(null);
    await AsyncStorage.removeItem(CHAVE_USUARIO_LOGADO);
  }

  return (
    <AuthContext.Provider value={{ user, isLoadingUser, login, updateUser, logout }}>
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