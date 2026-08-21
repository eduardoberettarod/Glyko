import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import HeaderSection from '@/components/HeaderSection';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconProfile from '@/components/IconProfile';
import Button from '@/components/Button';
import { colors } from '@/theme/colors';
import CardProfile from '@/components/CardProfile';
import Separator from '@/components/Separator';

type DataItem = {
  icon: 'bell' | 'ruler' | 'export' | 'star' | 'info';
  text: string;
  info?: string;
};

export default function Profile() {
  const data: DataItem[] = [
    {
      icon: 'bell',
      text: 'Notificações',
      info: 'On',
    },
    {
      icon: 'ruler',
      text: 'Medidas',
      info: 'mg/dL',
    },
    {
      icon: 'export',
      text: 'Exportar Dados',
    },
    {
      icon: 'star',
      text: 'Contato de Emergência',
    },
    {
      icon: 'info',
      text: 'Sobre',
    },
  ];

  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: DataItem }) => (
    <CardProfile icon={item.icon} text={item.text} info={item.info} />
  );

  return (
    <ScrollView contentContainerStyle={[
      styles.container, {
        paddingTop: insets.top, paddingBottom: insets.bottom + 120
      }
    ]}>
      <View style={styles.header}>
        <IconProfile />

        <View style={styles.info}>
          <Text style={styles.user}>Eduardo Beretta</Text>
          <Text style={styles.diabetes}>Diabetes • Tipo 1</Text>
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.text}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator color={colors.gray[700]} />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      <View style={{ marginTop: 24 }}>
        <Button
          title={'SAIR'}
          borderColor={colors.gray[700]}
          colorText={colors.red[400]}
        />
      </View>
    </ScrollView>
  );
}