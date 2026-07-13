import { View, Text } from 'react-native'
import { styles } from './style'


type Props = {
  children: React.ReactNode; 
};

export default function Card({children}: Props) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}