import { View, Text } from 'react-native'
import { styles } from './style'
import { colors } from '@/theme/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

//components
import Card from '@/components/Card'
import TagStatus from '@/components/TagStatus'

export default function LastMeasurementCard() {
  return (
    <Card>
      <View style={styles.header}>

        <View style={styles.left}>

          <View style={styles.containerTitle}>
            <MaterialCommunityIcons name="diabetes" size={18} color={colors.gray[600]} />
            <Text style={styles.title}>Última medição</Text>
          </View>

          <Text style={styles.subtitle}>
            Jejum • 07h30
          </Text>

        </View>

        <TagStatus 
        status='Normal'
        />
      </View>


    </Card>
  )
}