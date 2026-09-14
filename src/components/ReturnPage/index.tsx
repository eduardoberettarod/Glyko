import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur'
import { Feather } from '@expo/vector-icons'

import { styles } from './style'
import { colors } from '@/theme/colors'
import BackButton from '../BackButton';

type ReturnPageProps = {
  title: string
}

export default function ReturnPage({ title }: ReturnPageProps) {
  return (
    <View style={styles.container}>
      <BackButton
        onPress={() => router.back()}
      />

      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>

      {/* espaçador "fantasma" pra manter o título centralizado de verdade */}
      <View style={styles.spacer} />
    </View>
  )
}