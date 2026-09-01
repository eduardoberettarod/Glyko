import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';
import { colors } from '@/theme/colors';
import SwipeToStart from '@/components/SwipeToStart';

export default function Index() {

  // return <Redirect href={'/screen/Dashboard'} />

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <SwipeToStart />
    </View>
  )
}