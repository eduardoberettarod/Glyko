import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { colors } from '@/theme/colors'
import { styles } from './style'

//components
import Scroll from '@/components/Scroll';
import Header from '@/components/Header'
import HeaderSection from '@/components/HeaderSection';
import MetricsPanel from '@/components/MetricsPanel';
import Alert from '@/components/Alert';
import PieChart from '@/components/PieChart';


export default function Index() {

  const insets = useSafeAreaInsets()

  return (
    <Scroll style={styles.container}>
      <View style={styles.header}>
        <HeaderSection
          title={'Bom dia, Eduardo'}
          subtitle={'Visão Geral'}
        />
      </View>

      <View style={styles.chart}>
        <View style={styles.textChartContainer}>
          <Text style={styles.label}>Hoje</Text>
          <Text style={styles.label}>Últimas 24h</Text>
        </View>
        <PieChart />
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

    </Scroll>
  )
}