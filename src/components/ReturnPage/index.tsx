import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur'
import { Feather } from '@expo/vector-icons'

import { styles } from './style'
import { colors } from '@/theme/colors'

type ReturnPageProps = {
  title: string
}

export default function ReturnPage({ title }: ReturnPageProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        activeOpacity={0.8}
      >
        <BlurView style={styles.blur} intensity={100} tint="dark">
          <Feather name="chevron-left" color={colors.white} size={24} />
        </BlurView>
      </TouchableOpacity>

      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>

      {/* espaçador "fantasma" pra manter o título centralizado de verdade */}
      <View style={styles.spacer} />
    </View>
  )
}