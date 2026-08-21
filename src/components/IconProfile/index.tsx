import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './style';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '@/theme/colors';
import { Icon } from '@/utils/icon';

export default function IconProfile() {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>

      <View style={styles.icon}>
        <Icon name={'edit'} size={18} />
      </View>

    </TouchableOpacity>
  )
}