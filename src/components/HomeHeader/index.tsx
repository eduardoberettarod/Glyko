import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type HomeHeaderProps = {
  name: string,
  lastName: string,
  day: string,
  dayNumber: string,
  month: string
}

type Props = TouchableOpacityProps & {
  data: HomeHeaderProps
}

export default function HomeHeader({ data, ...rest }: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.left}>
        <TouchableOpacity style={styles.button} {...rest}>

        </TouchableOpacity>

        <View>
          <Text style={styles.label}>{data.day}, {data.dayNumber} de {data.month}</Text>
          <Text style={styles.title}>{data.name} {data.lastName}</Text>
        </View>

      </View>


      <View style={styles.right}>
        <TouchableOpacity style={styles.notification} {...rest}>
          <MaterialCommunityIcons name="bell" size={20} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  )
}