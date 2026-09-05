import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import Button from '@/components/Button';
import AbstractGradient from '@/components/AbstractGradient'

export default function Index() {

  const router = useRouter();
  const insets = useSafeAreaInsets()

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

      <View style={styles.header}>
        <Image
          source={require('@/assets/logoComplete.png')}
          style={styles.image}
          contentFit="contain"
        />
      </View>

      <View style={styles.content}>



        <View style={styles.textContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>Bem vindo ao</Text>
            <Text style={styles.glyko}>GLYKO!</Text>
          </View>

          <Text style={styles.subtitle}>O futuro do monitoramento de glicemia</Text>
        </View>

        <View style={styles.footer}>

          <Button
            title={'Criar conta'}
            borderColor={colors.emerald[500]}
            color={colors.emerald[500]}
            onPress={() => router.push('/RegisterPerson')}
          />

          <Button
            title={'Login'}
            borderColor={colors.gray[700]}
            colorText={colors.gray[700]}
            onPress={() => router.push('/screen/Dashboard')}
          />

        </View>
      </View>

    </View>
  )
}