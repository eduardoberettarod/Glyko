import React, { useCallback, useState } from 'react';

import { View, Text, Alert } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';

import { styles } from './style';

// components

import HeaderSection from '@/components/HeaderSection';
import Filter from '@/components/Filter';
import Card from '@/components/Card';
import Scroll from '@/components/Scroll';
import LineChart from '@/components/LIneChart';
import Dropdown from '@/components/Dropdown';
import SelectionBar from '@/components/SelectionBar';

import { styles as dropdownStyles } from '@/components/Dropdown/style';

import { useAuth } from '@/contexts/AuthContext';
import { buscarDadosGrafico, excluirMedicoes, Medicao } from '@/database/glucose_measurements';

type Period = '7d' | '3m' | '6m';
type Level = 'low' | 'normal' | 'high';

// Quantos dias cada período representa na consulta ao banco.
const DIAS_POR_PERIODO: Record<Period, 7 | 90 | 180> = {
  '7d': 7,
  '3m': 90,
  '6m': 180,
};

const DIAS_DA_SEMANA_ABREVIADOS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES_ABREVIADOS = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

// Usados no título de cada grupo de medições (ex: "Hoje, Setembro 11"
// ou "Quinta, Setembro 10").
const DIAS_DA_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// No período de 7 dias o rótulo do gráfico mostra o dia da semana,
// nos períodos mais longos mostra o mês (mais legível com muitos pontos).
function rotuloDoGrafico(dataISO: string, period: Period) {
  const data = new Date(dataISO);
  return period === '7d'
    ? DIAS_DA_SEMANA_ABREVIADOS[data.getDay()]
    : MESES_ABREVIADOS[data.getMonth()];
}

// Formata uma data ISO como horário no padrão hh:mm, exibido em cada item da lista.
function horarioFormatado(dataISO: string) {
  const data = new Date(dataISO);
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// Chave única (ano-mês-dia) usada para saber se duas medições
// aconteceram no mesmo dia.
function chaveDoDia(dataISO: string) {
  const data = new Date(dataISO);
  return `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`;
}

// Título exibido acima do grupo de medições daquele dia.
// Hoje -> "Hoje, Setembro 11"
// Outros dias -> "Quinta, Setembro 10"
function tituloDoDia(dataISO: string) {
  const data = new Date(dataISO);
  const hoje = new Date();

  const ehHoje =
    data.getFullYear() === hoje.getFullYear() &&
    data.getMonth() === hoje.getMonth() &&
    data.getDate() === hoje.getDate();

  const mes = MESES[data.getMonth()];
  const dia = data.getDate();

  if (ehHoje) {
    return `Hoje, ${mes} ${dia}`;
  }

  return `${DIAS_DA_SEMANA[data.getDay()]}, ${mes} ${dia}`;
}

type GrupoDeMedicoes = {
  chave: string;
  titulo: string;
  itens: Medicao[];
};

// Agrupa as medições (já ordenadas da mais recente para a mais antiga)
// em blocos por dia, mantendo a ordem cronológica decrescente:
// primeiro o grupo de hoje, depois ontem, depois anteontem...
function agruparPorDia(medicoes: Medicao[]): GrupoDeMedicoes[] {
  const grupos: GrupoDeMedicoes[] = [];

  for (const medicao of medicoes) {
    const chave = chaveDoDia(medicao.measured_at);
    const ultimoGrupo = grupos[grupos.length - 1];

    if (ultimoGrupo && ultimoGrupo.chave === chave) {
      ultimoGrupo.itens.push(medicao);
    } else {
      grupos.push({
        chave,
        titulo: tituloDoDia(medicao.measured_at),
        itens: [medicao],
      });
    }
  }

  return grupos;
}

// Tela de histórico: lista as medições agrupadas por dia, com gráfico, filtros de período/nível e seleção múltipla para exclusão.
export default function History() {

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();

  const [period, setPeriod] = useState<Period>('7d');
  const [levelFilter, setLevelFilter] = useState<Level | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [measurements, setMeasurements] = useState<Medicao[]>([]);

  // Busca no banco as medições do usuário dentro do período selecionado e guarda no estado.
  const carregarMedicoes = useCallback(async () => {
    if (!user) {
      return;
    }

    const dados = await buscarDadosGrafico(user.id, DIAS_POR_PERIODO[period]);
    setMeasurements(dados);
  }, [user, period]);

  useFocusEffect(
    useCallback(() => {
      carregarMedicoes();
    }, [carregarMedicoes])
  );


  
  const periods: { label: string; value: Period }[] = [
    {
      label: 'Últimos 7 dias',
      value: '7d',
    },
    {
      label: 'Últimos 3 meses',
      value: '3m',
    },
    {
      label: 'Últimos 6 meses',
      value: '6m',
    },
  ];

  // Atualiza o período do filtro (7 dias, 3 meses ou 6 meses), ignorando valor nulo.
  const handlePeriodChange = (value: Period | null) => {
    if (value) {
      setPeriod(value);
    }
  };

  // Ativa o modo de seleção múltipla ao segurar um item, adicionando-o à lista de selecionados.
  const handleLongPress = (id: number) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  };

  // Ao tocar num item: marca/desmarca se o modo de seleção estiver ativo, senão abre a tela de detalhe da medição.
  const handlePress = (id: number) => {
    if (selectedIds.length > 0) {
      setSelectedIds(prev =>
        prev.includes(id)
          ? prev.filter(selectedId => selectedId !== id)
          : [...prev, id]
      );
      return;
    }

    router.push(`/screen/History/${id}`);
  };

  // Abre um alerta pedindo confirmação antes de apagar, já que a exclusão é definitiva.
  const confirmarExclusao = () => {
    if (!user || selectedIds.length === 0) {
      return;
    }

    const quantidade = selectedIds.length;
    const ehPlural = quantidade > 1;

    Alert.alert(
      ehPlural ? `Excluir ${quantidade} registros?` : 'Excluir registro?',
      ehPlural
        ? 'Essas medições serão apagadas permanentemente. Essa ação não pode ser desfeita.'
        : 'Essa medição será apagada permanentemente. Essa ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: handleDelete },
      ]
    );
  };

  // Exclui definitivamente as medições selecionadas, limpa a seleção e recarrega a lista.
  const handleDelete = async () => {
    if (!user || selectedIds.length === 0) {
      return;
    }

    try {
      await excluirMedicoes(selectedIds, user.id);
      setSelectedIds([]);
      carregarMedicoes();
    } catch (error) {
      Alert.alert('Não foi possível excluir', 'Tente novamente em instantes.');
    }
  };

  const filteredMeasurements = levelFilter
    ? measurements.filter(item => item.classification === levelFilter)
    : measurements;

  // Mais recentes primeiro (buscarDadosGrafico retorna em ordem crescente,
  // pensada para o gráfico de linha).
  const measurementsMaisRecentesPrimeiro = [...filteredMeasurements].reverse();

  // Agrupa as medições já ordenadas em blocos por dia.
  const gruposPorDia = agruparPorDia(measurementsMaisRecentesPrimeiro);

  const chartData = measurements.map((medicao) => ({
    value: medicao.glucose_level,
    label: rotuloDoGrafico(medicao.measured_at, period),
  }));

  return (
    <Scroll
      style={styles.container}
      overlay={
        selectedIds.length > 0 ? (
          <SelectionBar
            selectedCount={selectedIds.length}
            onCancel={() => setSelectedIds([])}
            onDelete={confirmarExclusao}
          />
        ) : null
      }
    >

      <View style={styles.header}>
        <HeaderSection
          title="Consulte seu histórico de glicemia e acompanhe suas variações."
          subtitle="Histórico"
          haveSub={true}
        />
      </View>

      <View style={styles.chart}>

        <Dropdown
          value={period}
          onChange={handlePeriodChange}
          items={periods}
          placeholder="Período"
          style={dropdownStyles.dropdown}
          textStyle={dropdownStyles.dropdownText}
          dropDownContainerStyle={dropdownStyles.dropdownContainer}
        />

        <LineChart
          data={chartData}
          period={period}
        />

      </View>

      <View style={styles.filter}>
        <Filter value={levelFilter} onChange={setLevelFilter} />
      </View>

      <View style={{ gap: 24, marginTop: 24 }}>

        {gruposPorDia.map(grupo => (
          <View key={grupo.chave} style={{ gap: 12 }}>
            <Text style={styles.label}>{grupo.titulo}</Text>

            {grupo.itens.map(item => (
              <Card
                key={item.id}
                level={item.classification as 'low' | 'normal' | 'high'}
                glucoseLevel={item.glucose_level}
                time={horarioFormatado(item.measured_at)}
                selected={selectedIds.includes(item.id)}
                onLongPress={() => handleLongPress(item.id)}
                onPress={() => handlePress(item.id)}
              />
            ))}
          </View>
        ))}

      </View>

    </Scroll>
  );
}