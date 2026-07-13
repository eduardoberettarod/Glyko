import { View, Text } from 'react-native'
import { styles } from './style'

type Props = {
  status: string
}


export default function TagStatus({ status }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {status}
      </Text>
    </View>
  )
}