import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Alert, Platform } from 'react-native';

import { Usuario } from '@/database/users';
import { listarMedicoes, Medicao } from '@/database/glucose_measurements';
import { listarHumores, Humor } from '@/database/moods';
import { colors } from '@/theme/colors';

// Rótulos em português usados apenas dentro deste relatório.
const LABEL_DO_TIPO_DE_DIABETES: Record<string, string> = {
  tipo1: 'Tipo 1',
  tipo2: 'Tipo 2',
  gestacional: 'Gestacional',
  outro: 'Outro',
};

const LABEL_DO_CONTEXTO_DA_MEDICAO: Record<string, string> = {
  fasting: 'Jejum',
  before_meal: 'Antes da refeição',
  after_meal: 'Depois da refeição',
  snack: 'Lanche',
  before_bed: 'Antes de dormir',
  after_exercise: 'Após atividade física',
};

const LABEL_DO_HUMOR: Record<string, string> = {
  happy: 'Feliz',
  sad: 'Triste',
  tired: 'Cansado',
  anxious: 'Ansioso',
  stressed: 'Estressado',
};

const LABEL_DA_CLASSIFICACAO: Record<string, string> = {
  low: 'Baixa',
  normal: 'Normal',
  high: 'Alta',
};

/**
 * Calcula a idade atual a partir da data de nascimento (ISO).
 */
function calcularIdade(dataNascimentoISO: string): number {
  const nascimento = new Date(dataNascimentoISO);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const aindaNaoFezAniversarioEsteAno =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());

  if (aindaNaoFezAniversarioEsteAno) {
    idade -= 1;
  }

  return idade;
}

function formatarData(dataISO: string): string {
  return new Date(dataISO).toLocaleDateString('pt-BR');
}

function formatarHorario(dataISO: string): string {
  return new Date(dataISO).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatarDataEHorarioDeGeracao(): string {
  return new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Mesmas cores usadas no gráfico de pizza do Dashboard (Normal/Alta/Baixa),
// para que o PDF fique consistente com o restante do app.
function corDaClassificacao(classification: string): string {
  if (classification === 'high') return colors.red[600];
  if (classification === 'low') return colors.sky[700];
  return colors.green[700];
}

// Sanitiza texto livre (observações) antes de jogar dentro do HTML,
// já que ele vem direto do que o usuário digitou.
function escaparHtml(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function montarLinhaDaTabela(
  medicao: Medicao,
  nomeDoHumorPorId: Map<number, string>
): string {
  const nomeDoHumor =
    medicao.mood_id !== null ? nomeDoHumorPorId.get(medicao.mood_id) : undefined;

  const humorEmPortugues = nomeDoHumor
    ? LABEL_DO_HUMOR[nomeDoHumor] ?? nomeDoHumor
    : '—';

  const contexto =
    LABEL_DO_CONTEXTO_DA_MEDICAO[medicao.measurement_context] ??
    medicao.measurement_context;

  const classificacao =
    LABEL_DA_CLASSIFICACAO[medicao.classification] ?? medicao.classification;

  const observacao = medicao.notes ? escaparHtml(medicao.notes) : '—';

  return `
    <tr>
      <td>${formatarData(medicao.measured_at)}</td>
      <td>${formatarHorario(medicao.measured_at)}</td>
      <td class="valor">${medicao.glucose_level} mg/dL</td>
      <td>
        <span class="badge" style="background:${corDaClassificacao(medicao.classification)}">
          ${classificacao}
        </span>
      </td>
      <td>${contexto}</td>
      <td>${humorEmPortugues}</td>
      <td>${observacao}</td>
    </tr>
  `;
}

function montarHtmlDoRelatorio(
  usuario: Usuario,
  medicoes: Medicao[],
  humores: Humor[]
): string {
  const idade = calcularIdade(usuario.birth_date);
  const tipoDeDiabetes =
    LABEL_DO_TIPO_DE_DIABETES[usuario.diabetes_type] ?? usuario.diabetes_type;

  const nomeDoHumorPorId = new Map(humores.map((humor) => [humor.id, humor.name]));

  // Ordem cronológica (mais antiga primeiro), que é como um médico
  // normalmente prefere acompanhar a evolução da glicemia.
  const medicoesEmOrdemCronologica = [...medicoes].reverse();

  const linhasDaTabela = medicoesEmOrdemCronologica
    .map((medicao) => montarLinhaDaTabela(medicao, nomeDoHumorPorId))
    .join('');

  const tabelaOuMensagemVazia =
    medicoesEmOrdemCronologica.length > 0
      ? `
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Glicemia</th>
              <th>Classificação</th>
              <th>Contexto</th>
              <th>Humor</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>
            ${linhasDaTabela}
          </tbody>
        </table>
      `
      : `<p class="vazio">Nenhuma medição registrada até o momento.</p>`;

  return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            color: ${colors.gray[900]};
            padding: 32px 40px;
            font-size: 12px;
          }

          .cabecalho {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 3px solid ${colors.emerald[600]};
            padding-bottom: 16px;
            margin-bottom: 24px;
          }

          .cabecalho h1 {
            margin: 0;
            font-size: 22px;
            color: ${colors.emerald[700]};
          }

          .cabecalho .subtitulo {
            margin-top: 4px;
            font-size: 12px;
            color: ${colors.gray[600]};
          }

          .gerado-em {
            text-align: right;
            font-size: 10px;
            color: ${colors.gray[600]};
          }

          .paciente {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
            background: ${colors.gray[100]};
            border: 1px solid ${colors.gray[200]};
            border-radius: 8px;
            padding: 16px 20px;
            margin-bottom: 24px;
          }

          .paciente .campo {
            min-width: 140px;
          }

          .paciente .rotulo {
            font-size: 10px;
            text-transform: uppercase;
            color: ${colors.gray[600]};
            margin-bottom: 2px;
          }

          .paciente .valor-campo {
            font-size: 14px;
            font-weight: bold;
            color: ${colors.gray[900]};
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            text-align: left;
            padding: 8px 10px;
            border-bottom: 1px solid ${colors.gray[200]};
            font-size: 11px;
          }

          th {
            background: ${colors.gray[900]};
            color: ${colors.white};
            text-transform: uppercase;
            font-size: 10px;
          }

          td.valor {
            font-weight: bold;
          }

          tr:nth-child(even) td {
            background: ${colors.gray[100]};
          }

          .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 999px;
            color: ${colors.white};
            font-size: 10px;
            font-weight: bold;
          }

          .vazio {
            color: ${colors.gray[600]};
            font-style: italic;
          }

          .rodape {
            margin-top: 24px;
            font-size: 9px;
            color: ${colors.gray[600]};
            border-top: 1px solid ${colors.gray[200]};
            padding-top: 8px;
          }
        </style>
      </head>
      <body>
        <div class="cabecalho">
          <div>
            <h1>Glyko</h1>
            <div class="subtitulo">Relatório de acompanhamento de glicemia</div>
          </div>
          <div class="gerado-em">Gerado em<br />${formatarDataEHorarioDeGeracao()}</div>
        </div>

        <div class="paciente">
          <div class="campo">
            <div class="rotulo">Paciente</div>
            <div class="valor-campo">${usuario.first_name} ${usuario.last_name}</div>
          </div>

          <div class="campo">
            <div class="rotulo">Idade</div>
            <div class="valor-campo">${idade} anos</div>
          </div>

          <div class="campo">
            <div class="rotulo">Tipo de diabetes</div>
            <div class="valor-campo">${tipoDeDiabetes}</div>
          </div>

          <div class="campo">
            <div class="rotulo">Total de medições</div>
            <div class="valor-campo">${medicoesEmOrdemCronologica.length}</div>
          </div>
        </div>

        ${tabelaOuMensagemVazia}

        <div class="rodape">
          Documento gerado automaticamente pelo aplicativo Glyko, com base nos registros informados pelo próprio paciente.
          Este relatório não substitui a avaliação clínica de um profissional de saúde.
        </div>
      </body>
    </html>
  `;
}

/**
 * Abre a folha de compartilhamento nativa do sistema para o PDF já gerado
 * (enviar por e-mail, WhatsApp, imprimir, etc).
 */
async function compartilharPdf(uri: string): Promise<void> {
  const podeCompartilhar = await Sharing.isAvailableAsync();

  if (!podeCompartilhar) {
    Alert.alert(
      'Não foi possível compartilhar',
      'O compartilhamento de arquivos não está disponível neste dispositivo.'
    );
    return;
  }

  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: 'Histórico de glicemia',
    UTI: 'com.adobe.pdf',
  });
}

/**
 * Salva o PDF diretamente no dispositivo.
 *
 * - Android: usa a Storage Access Framework para o usuário escolher a pasta
 *   e salvar o arquivo de fato, sem passar pela folha de compartilhamento.
 * - iOS: não existe uma API pública para salvar um arquivo sem interação do
 *   usuário. Nesse caso reaproveitamos a folha de compartilhamento, que já
 *   inclui a opção "Salvar em Arquivos".
 */
async function salvarPdfNoDispositivo(uri: string, nomeDoArquivo: string): Promise<void> {
  if (Platform.OS === 'android') {
    try {
      const permissoes = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (!permissoes.granted) {
        Alert.alert(
          'Permissão negada',
          'Não foi possível salvar o arquivo sem acesso à pasta escolhida.'
        );
        return;
      }

      const conteudoEmBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const novoArquivoUri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissoes.directoryUri,
        nomeDoArquivo,
        'application/pdf'
      );

      await FileSystem.writeAsStringAsync(novoArquivoUri, conteudoEmBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Alert.alert('Sucesso', 'O relatório foi salvo no dispositivo.');
    } catch (error) {
      Alert.alert('Não foi possível salvar', 'Tente novamente em instantes.');
    }
  } else {
    await compartilharPdf(uri);
  }
}

/**
 * Gera um PDF com os dados do usuário e todo o seu histórico de
 * medições, e pergunta se ele deseja salvar o arquivo no dispositivo
 * ou compartilhá-lo (enviar por e-mail/WhatsApp, imprimir, etc).
 *
 * Pensado para ser entregue a um médico: nome, idade, tipo de
 * diabetes e a tabela completa de medições com data, hora, valor,
 * classificação, contexto, humor e observação.
 *
 * USADA EM:
 * Tela de Perfil, botão "Exportar Dados".
 */
export async function exportarDadosDoUsuario(usuario: Usuario): Promise<void> {
  const [medicoes, humores] = await Promise.all([
    listarMedicoes(usuario.id),
    listarHumores(),
  ]);

  const html = montarHtmlDoRelatorio(usuario, medicoes, humores);

  const { uri } = await Print.printToFileAsync({ html });

  const nomeDoArquivo = `historico-glicemia-${usuario.first_name.toLowerCase()}.pdf`;

  // Aguarda a escolha do usuário antes de resolver a promise, para que a
  // tela de Perfil continue mostrando "Gerando..." até a ação terminar.
  return new Promise((resolve) => {
    Alert.alert(
      'Relatório gerado',
      'O que você deseja fazer com o arquivo?',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve() },
        {
          text: 'Salvar no dispositivo',
          onPress: async () => {
            await salvarPdfNoDispositivo(uri, nomeDoArquivo);
            resolve();
          },
        },
        {
          text: 'Compartilhar',
          onPress: async () => {
            await compartilharPdf(uri);
            resolve();
          },
        },
      ],
      { cancelable: true, onDismiss: () => resolve() }
    );
  });
}