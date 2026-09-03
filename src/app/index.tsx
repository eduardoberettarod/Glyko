import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect } from 'expo-router';
import { colors } from '@/theme/colors';
import SwipeToStart from '@/components/SwipeToStart';
import BackButton from '@/components/BackButton';

export default function Index() {

  return <Redirect href="/screen/Dashboard" />;

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // retorna true = "eu tratei o back, não faça nada"
        // (nem fecha o app, nem navega)
        return true;
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 18 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <BackButton />
        <SwipeToStart />
      </View>
    </View>
  )
}