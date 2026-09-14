import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { BlurView } from 'expo-blur'
import { Feather } from '@expo/vector-icons'

import { styles } from './style'
import { colors } from '@/theme/colors'
import BackButton from '../BackButton';

type ReturnPageProps = {
  title: string
  subtitle?: string
}

// Cabeçalho de telas internas com botão de voltar, título centralizado e subtítulo opcional.
export default function ReturnPage({ title, subtitle }: ReturnPageProps) {
  return (
    <View>
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

      {!!subtitle && (
        <Text style={styles.subtitle} numberOfLines={2} ellipsizeMode="tail">
          {subtitle}
        </Text>
      )}
    </View>
  )
}