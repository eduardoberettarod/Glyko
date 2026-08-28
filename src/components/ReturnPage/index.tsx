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

      <View style={styles.left}>
        <TouchableOpacity style={styles.button}
          onPress={() => router.back()}
        >
          <BlurView style={styles.blur} intensity={100} tint={'dark'}>
            <Feather name='chevron-left' color={colors.white} size={28} />
          </BlurView>
        </TouchableOpacity>

      </View>
      <Text style={styles.text}>
        {title}
      </Text>

    </View>
  )
}