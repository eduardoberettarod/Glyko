import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from '@/theme/colors'
import { styles } from './style'

//components
import HomeHeader from '@/components/HomeHeader'
import LastMeasurementCard from '@/components/Home/LastMeasurementCard'

//utils
import { getCurrentDate } from '@/utils/getCurrentDate'

export default function Index() {

  const insets = useSafeAreaInsets()

  const currentDate = getCurrentDate()

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <HomeHeader
        data={{
          name: 'Eduardo',
          lastName: 'Beretta',
          day: currentDate.day,
          month: currentDate.month,
          dayNumber: currentDate.dayNumber,
        }}
        activeOpacity={0.8}
      />

      <View style={styles.content}>
        <LastMeasurementCard />
      </View>

    </View>
  )
}