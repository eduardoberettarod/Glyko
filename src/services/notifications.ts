import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

import { listarMedicoes } from '@/database/glucose_measurements';

/**
 * Horários (em hora cheia, 0-23) em que o app deve lembrar
 * o usuário de registrar a glicemia.
 *
 * 8h  -> manhã
 * 12h -> meio-dia
 * 16h -> tarde
 * 20h -> noite
 */
export const HORARIOS_DE_LEMBRETE = [8, 12, 16, 20] as const;

// Quanto tempo antes do horário do lembrete uma medição já feita
// é suficiente para cancelar aquele lembrete específico.
const JANELA_DE_TOLERANCIA_EM_HORAS = 1;

// Prefixo usado no identificador de cada notificação agendada,
// para conseguirmos encontrar/cancelar só as nossas (e não outras
// notificações que o app venha a ter no futuro).
const PREFIXO_DO_IDENTIFICADOR = 'glyko-lembrete-medicao';

function identificadorDoLembrete(hora: number): string {
  return `${PREFIXO_DO_IDENTIFICADOR}-${hora}h`;
}

/**
 * Define como uma notificação deve se comportar quando chega
 * com o app aberto (mostrar banner, tocar som, etc).
 *
 * Deve ser chamada uma única vez, o quanto antes (ex: no
 * carregamento do app).
 */
export function configurarComportamentoDasNotificacoes() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

/**
 * Cria o canal de notificações no Android (obrigatório a partir
 * do Android 8). No iOS esta chamada não faz nada.
 */
async function configurarCanalAndroid() {
  if (Platform.OS !== 'android') {
    return;
  }

  await Notifications.setNotificationChannelAsync('lembretes-de-medicao', {
    name: 'Lembretes de medição',
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
  });
}

/**
 * Pede permissão ao usuário para enviar notificações.
 *
 * Retorna `true` se a permissão foi concedida.
 *
 * USADA EM:
 * Tela de Perfil, ao ativar as notificações, e no login,
 * caso a preferência do usuário já esteja ativada.
 */
export async function solicitarPermissaoDeNotificacoes(): Promise<boolean> {
  // Notificações locais exigem um dispositivo físico ou emulador
  // com Google Play Services; em simuladores simples a API pode
  // não estar disponível.
  if (!Device.isDevice) {
    return false;
  }

  await configurarCanalAndroid();

  const permissaoAtual = await Notifications.getPermissionsAsync();

  if (permissaoAtual.granted) {
    return true;
  }

  const novaPermissao = await Notifications.requestPermissionsAsync();
  return novaPermissao.granted;
}

/**
 * Cancela os 4 lembretes diários (usado quando o usuário desativa
 * as notificações no Perfil, ou antes de reagendar o dia).
 *
 * USADA EM:
 * Tela de Perfil, ao desativar as notificações.
 */
export async function cancelarLembretesDeMedicao(): Promise<void> {
  await Promise.all(
    HORARIOS_DE_LEMBRETE.map((hora) =>
      Notifications.cancelScheduledNotificationAsync(identificadorDoLembrete(hora))
    )
  );
}

/**
 * Verifica se o usuário já registrou alguma medição dentro da
 * janela de tolerância que antecede o horário informado.
 *
 * Ex: para o lembrete das 12h, verifica se há alguma medição
 * entre 11h e 12h.
 */
function jaMediuAntesDoHorario(
  horarioAlvo: Date,
  medicoes: { measured_at: string }[]
): boolean {
  const inicioDaJanela =
    horarioAlvo.getTime() - JANELA_DE_TOLERANCIA_EM_HORAS * 60 * 60 * 1000;

  return medicoes.some((medicao) => {
    const medidoEm = new Date(medicao.measured_at).getTime();
    return medidoEm >= inicioDaJanela && medidoEm <= horarioAlvo.getTime();
  });
}

/**
 * Monta a data de hoje no horário (hora cheia) informado.
 */
function horarioDeHoje(hora: number): Date {
  const data = new Date();
  data.setHours(hora, 0, 0, 0);
  return data;
}

/**
 * Reagenda os lembretes de medição do dia atual para um usuário.
 *
 * Para cada um dos 4 horários (8h, 12h, 16h, 20h):
 * - Se o horário já passou hoje, nenhum lembrete é agendado para ele.
 * - Se o usuário já mediu a glicemia na 1h anterior ao horário,
 *   o lembrete daquele horário é cancelado/não é agendado.
 * - Caso contrário, o lembrete é (re)agendado para aquele horário.
 *
 * Deve ser chamada:
 * - ao logar/abrir o app com o usuário já logado;
 * - sempre que uma nova medição for registrada;
 * - ao ativar as notificações na tela de Perfil.
 *
 * USADA EM:
 * AuthContext (login/foreground) e tela de Registro de medição.
 */
export async function sincronizarLembretesDeMedicao(userId: number): Promise<void> {
  const permissaoConcedida = await solicitarPermissaoDeNotificacoes();

  if (!permissaoConcedida) {
    return;
  }

  const medicoesDeHoje = await listarMedicoes(userId);
  const agora = new Date();

  await Promise.all(
    HORARIOS_DE_LEMBRETE.map(async (hora) => {
      const identificador = identificadorDoLembrete(hora);
      const horarioAlvo = horarioDeHoje(hora);

      // Sempre limpa o agendamento anterior antes de decidir de novo,
      // para não deixar lembretes duplicados ou desatualizados.
      await Notifications.cancelScheduledNotificationAsync(identificador);

      const horarioJaPassouHoje = horarioAlvo.getTime() <= agora.getTime();
      if (horarioJaPassouHoje) {
        return;
      }

      if (jaMediuAntesDoHorario(horarioAlvo, medicoesDeHoje)) {
        return;
      }

      await Notifications.scheduleNotificationAsync({
        identifier: identificador,
        content: {
          title: 'Hora de medir a glicemia',
          body: 'Você ainda não registrou sua glicemia neste horário. Que tal medir agora?',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: horarioAlvo,
        },
      });
    })
  );
}
