import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { styles } from './style';
import Button from '@/components/Button';

export default function Index() {

  const router = useRouter();


  return (
    <View style={[styles.container, ]}>


      <View style={styles.footer}>

        <Button
          title={'Login'}
          borderColor={colors.emerald[500]}
          color={colors.emerald[500]}
          onPress={() => router.push('/screen/Dashboard')}
        />

        <Button
          title={'Criar conta'}
          borderColor={colors.gray[700]}
          colorText={colors.gray[700]}
        />

      </View>

    </View>
  )
}