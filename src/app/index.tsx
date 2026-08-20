import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';
import { colors } from '@/theme/colors';

export default function Index() {

  return <Redirect href={'/screen/Dashboard'} />
  
  return (
    <View>
      <TouchableOpacity>
        <Text style={{color: colors.black}}>Pagina legal</Text>
      </TouchableOpacity>
    </View>
  )
}