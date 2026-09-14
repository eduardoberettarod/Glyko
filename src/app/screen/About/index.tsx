import { View, Text } from 'react-native'
import React from 'react'

import { styles } from './style';

import Scroll from '@/components/Scroll';
import ReturnPage from '@/components/ReturnPage';

type Topico = {
  titulo: string;
  paragrafos: string[];
};

const TOPICOS: Topico[] = [
  {
    titulo: 'O que é o Glyko',
    paragrafos: [
      'O Glyko é um aplicativo de registro de glicemias, desenvolvido para atender pessoas diabéticas que não contam com uma forma prática de acompanhar suas medições no dia a dia. A proposta é simples: substituir o caderno de anotações por um histórico digital, organizado e sempre acessível.',
    ],
  },
  {
    titulo: 'Por que o Glyko existe',
    paragrafos: [
      'Durante anos, acompanhei de perto meu irmão, que é diabético, anotando manualmente cada medição de glicemia em um caderno. Depois de dez anos me dedicando ao desenvolvimento de software, decidi usar esse conhecimento para criar algo que o dispensasse dessa rotina.',
      'O Glyko também carrega a memória da minha avó e de outras pessoas queridas que enfrentaram a diabetes ao longo da vida. Não há como saber se este aplicativo poderia ter feito diferença para elas, mas ele foi desenvolvido com elas em mente.',
    ],
  },
  {
    titulo: 'Agradecimentos',
    paragrafos: [
      'Este projeto não seria possível sem o apoio de colegas de sala, professores, amigos e familiares, que acompanharam de perto cada etapa do seu desenvolvimento. Meu sincero agradecimento a todos vocês.',
    ],
  },
];

export default function About() {
  return (
    <Scroll style={styles.container}>
      <View style={{ marginBottom: 48 }}>
        <ReturnPage title="Sobre" />
      </View>

      {TOPICOS.map((topico) => (
        <View key={topico.titulo} style={styles.section}>
          <Text style={styles.sectionLabel}>{topico.titulo}</Text>

          <View style={styles.sectionBox}>
            {topico.paragrafos.map((paragrafo, index) => (
              <Text
                key={index}
                style={[
                  styles.paragraph,
                  index > 0 && styles.paragraphSpacing,
                ]}
              >
                {paragrafo}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </Scroll>
  )
}
