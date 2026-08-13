import { View } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { usePathname, useRouter } from 'expo-router'
import { styles } from './style';
import TabBarIcon from '../TabBarIcon';

const tabs = [
  { name: 'house', route: '/screen/Dashboard' },
  { name: 'history', route: '/screen/History' },
  { name: 'person', route: '/screen/Profile' },
] as const

export default function TabBar() {
  const pathname = usePathname()
  const router = useRouter()

  const activeTab = tabs.find((tab) => tab.route === pathname)?.name ?? 'house'

  return (
    <View style={styles.container}>
      <BlurView style={styles.blur} tint={'dark'} intensity={100}>
        {tabs.map((tab) => (
          <TabBarIcon
            key={tab.name}
            name={tab.name}
            size={24}
            active={activeTab === tab.name}
            onPress={() => router.push(tab.route)}
          />
        ))}
      </BlurView>
    </View>
  )
}