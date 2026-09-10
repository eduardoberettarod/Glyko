import { View, Text, FlatList } from 'react-native'
import React from 'react'
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
import { DiabetesType } from '@/components/DiabetesTypeSelector';

type DataItem = {
  icon: 'bell' | 'ruler' | 'export' | 'star' | 'info';
  text: string;
  info?: string;
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
  const { user, logout } = useAuth();

  const data: DataItem[] = [
    {
      icon: 'bell',
      text: 'Notificações',
      info: user?.notifications_enabled ? 'On' : 'Off',
    },
    {
      icon: 'export',
      text: 'Exportar Dados',
    },
    {
      icon: 'info',
      text: 'Sobre',
    },
  ];

  const renderItem = ({ item }: { item: DataItem }) => (
    <CardProfile
      icon={item.icon}
      text={item.text}
      info={item.info}
    />
  );

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
