import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from '@/theme/colors'
import { styles } from './style'

//components
import Header from '@/components/Header'
import HeaderSection from '@/components/HeaderSection';
import MetricsPanel from '@/components/MetricsPanel';
import Alert from '@/components/Alert';


export default function Index() {

  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <Header />

      <View style={styles.header}>
        <HeaderSection
          title={'Bom dia, Eduardo'}
          subtitle={'Visão Geral'}
        />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelText}>Painel de Métricas</Text>
        <MetricsPanel />
      </View>

      <Alert
        icon={'history'}
        title={'Revisar Histórico'}
        text={'Verifique as medições dos últimos 30 dias'}
      />

    </View>
  )
}