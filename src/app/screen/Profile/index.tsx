import { View, Text, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import HeaderSection from '@/components/HeaderSection';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconProfile from '@/components/IconProfile';
import Button from '@/components/Button';
import { colors } from '@/theme/colors';
import CardProfile from '@/components/CardProfile';
import Separator from '@/components/Separator';
import { router } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import { atualizarUsuario } from '@/database/users';
import {
  cancelarLembretesDeMedicao,
  sincronizarLembretesDeMedicao,
  solicitarPermissaoDeNotificacoes,
} from '@/services/notifications';
import { exportarDadosDoUsuario } from '@/services/exportarDados';

type DataItem = {
  icon: 'bell' | 'ruler' | 'export' | 'star' | 'info';
  text: string;
  info?: string;
  isNotificationToggle?: boolean;
};

// Rótulo exibido para cada tipo de diabetes salvo no banco.
const LABEL_DO_TIPO_DE_DIABETES: Record<string, string> = {
  tipo1: 'Tipo 1',
  tipo2: 'Tipo 2',
  gestacional: 'Gestacional',
  outro: 'Outro',
};

export default function Profile() {
  const insets = useSafeAreaInsets();
  const { user, updateUser, logout } = useAuth();
  const [isUpdatingNotifications, setIsUpdatingNotifications] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  async function handleToggleNotifications(novoValor: boolean) {
    if (!user || isUpdatingNotifications) {
      return;
    }

    if (novoValor) {
      const permissaoConcedida = await solicitarPermissaoDeNotificacoes();

      if (!permissaoConcedida) {
        Alert.alert(
          'Permissão necessária',
          'Ative as notificações do Glyko nas configurações do seu celular para receber os lembretes de medição.'
        );
        return;
      }
    }

    setIsUpdatingNotifications(true);

    try {
      const usuarioAtualizado = await atualizarUsuario(user.id, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        birth_date: user.birth_date,
        diabetes_type: user.diabetes_type,
        notifications_enabled: novoValor,
      });

      updateUser(usuarioAtualizado);

      if (novoValor) {
        await sincronizarLembretesDeMedicao(user.id);
      } else {
        await cancelarLembretesDeMedicao();
      }
    } catch (error) {
      Alert.alert('Não foi possível atualizar', 'Tente novamente em instantes.');
    } finally {
      setIsUpdatingNotifications(false);
    }
  }

  async function handleExportarDados() {
    if (!user || isExporting) {
      return;
    }

    setIsExporting(true);

    try {
      await exportarDadosDoUsuario(user);
    } catch (error) {
      Alert.alert(
        'Não foi possível exportar',
        'Tente novamente em instantes.'
      );
    } finally {
      setIsExporting(false);
    }
  }

  const data: DataItem[] = [
    {
      icon: 'bell',
      text: 'Notificações',
      isNotificationToggle: true,
    },
    {
      icon: 'export',
      text: 'Exportar Dados',
      info: isExporting ? 'Gerando...' : undefined,
    },
    {
      icon: 'info',
      text: 'Sobre',
    },
  ];

  const renderItem = ({ item }: { item: DataItem }) => {
    if (item.isNotificationToggle) {
      return (
        <CardProfile
          icon={item.icon}
          text={item.text}
          toggleValue={!!user?.notifications_enabled}
          onToggleChange={handleToggleNotifications}
        />
      );
    }

    if (item.text === 'Exportar Dados') {
      return (
        <CardProfile
          icon={item.icon}
          text={item.text}
          info={item.info}
          disabled={isExporting}
          onPress={handleExportarDados}
        />
      );
    }

    return (
      <CardProfile
        icon={item.icon}
        text={item.text}
        info={item.info}
      />
    );
  };

  const nomeCompleto = user
    ? `${user.first_name} ${user.last_name}`
    : '';

  const tipoDeDiabetes = user
    ? LABEL_DO_TIPO_DE_DIABETES[user.diabetes_type] ?? user.diabetes_type
    : '';

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.text}
      renderItem={renderItem}

      ItemSeparatorComponent={() => (
        <Separator color={colors.gray[700]} />
      )}

      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 170,
        },
      ]}

      ListHeaderComponent={
        <View style={styles.header}>
          <IconProfile />

          <View style={styles.info}>
            <Text style={styles.user}>
              {nomeCompleto}
            </Text>

            <Text style={styles.diabetes}>
              Diabetes • {tipoDeDiabetes}
            </Text>
          </View>
        </View>
      }

      ListFooterComponent={
        <View style={{ marginTop: 72 }}>
          <Button
            title="SAIR"
            borderColor={colors.gray[700]}
            colorText={colors.red[400]}
            onPress={() => {
              logout();
              router.push('/');
            }}
          />
        </View>
      }
    />
  );
}
