import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from '@/theme/colors'
import { styles } from './style'

//components
import HomeHeader from '@/components/HomeHeader'

export default function Index() {

  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <HomeHeader
      data={{
        name: 'Eduardo',
        lastName: 'Beretta',
        day: 'Terça-feira',
        month: 'junho',
        dayNumber: '2'
      }}
      activeOpacity={0.8}
      />
    </View>
  )
}