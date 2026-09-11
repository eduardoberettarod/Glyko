import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import AbstractGradient from '@/components/AbstractGradient'
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {

  const router = useRouter();
  const insets = useSafeAreaInsets()
  const { user, isLoadingUser } = useAuth();

  // Enquanto verifica se existe uma sessão salva, não renderiza nada
  // para evitar o "flash" da tela de boas-vindas antes do redirect.
  if (isLoadingUser) {
    return <View style={{ flex: 1, backgroundColor: colors.black }} />;
  }

  // Já existe uma sessão salva: pula direto para o Dashboard.
  if (user) {
    return <Redirect href="/screen/Dashboard" />;
  }

  return (
    <View style={[
      styles.container, {
        paddingTop: insets.top + 30,
        paddingBottom: insets.bottom + 30
      }
    ]}
    >
      <AbstractGradient height={500} />
      <AbstractGradient height={700} />

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>Bem vindo ao <Text style={styles.glyko}>GLYKO!</Text></Text>
          </View>

          <Text style={styles.subtitle}>O futuro do monitoramento de glicemia</Text>
        </View>

        <View style={styles.footer}>
          <Button
            title={'Criar Conta'}
            borderColor={colors.emerald[500]}
            color={colors.emerald[500]}
            onPress={() => router.push('/RegisterPerson')}
          />

          <Button
            title={'Login'}
            borderColor={colors.gray[700]}
            colorText={colors.gray[700]}
            onPress={() => router.push('/Login')}
          />
        </View>
      </View>
    </View>
  )
}