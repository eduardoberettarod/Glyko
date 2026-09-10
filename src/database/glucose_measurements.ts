import { turso } from '@/database/turso';
import { classificarGlicemia } from '@/utils/glucose';

const NOME_DA_TABELA = 'glucose_measurements';

/**
 * Formato "cru" que a tabela do Turso devolve.
 *
 * Os nomes seguem exatamente os nomes das colunas
 * existentes no banco de dados.
 */
interface LinhaDaTabelaGlucose {
  id: number;
  user_id: number;
  glucose_level: number;
  classification: string;
  measurement_context: string;
  measured_at: string;
  mood_id: number | null;
  notes: string | null;
}

/**
 * Dados necessários para criar uma nova medição.
 *
 * A classificação não é recebida da tela.
 * Ela é calculada automaticamente através
 * da função classificarGlicemia().
 */
export interface DadosDaMedicao {
  user_id: number;
  glucose_level: number;
  measurement_context: string;
  measured_at: string;
  mood_id?: number | null;
  notes?: string | null;
}

/**
 * Formato da medição utilizado pelo aplicativo.
 */
export interface Medicao {
  id: number;
  user_id: number;
  glucose_level: number;
  classification: string;
  measurement_context: string;
  measured_at: string;
  mood_id: number | null;
  notes: string | null;
}

/**
 * Converte uma linha do banco para o formato
 * utilizado pelo aplicativo.
 */
function converterLinhaParaMedicao(
  linha: LinhaDaTabelaGlucose
): Medicao {
  return {
    id: linha.id,
    user_id: linha.user_id,
    glucose_level: linha.glucose_level,
    classification: linha.classification,
    measurement_context: linha.measurement_context,
    measured_at: linha.measured_at,
    mood_id: linha.mood_id,
    notes: linha.notes,
  };
}

/**
 * 1) CRIAR MEDIÇÃO
 *
 * Salva uma nova medição de glicemia no banco.
 *
 * A classificação é definida automaticamente
 * de acordo com o valor da glicemia.
 *
 * USADA EM:
 * Tela de adicionar glicemia.
 */
export async function criarMedicao(
  dados: DadosDaMedicao
): Promise<Medicao> {
  const classification = classificarGlicemia(
    dados.glucose_level
  );

  const resultado = await turso.execute({
    sql: `
      INSERT INTO ${NOME_DA_TABELA}
      (
        user_id,
        glucose_level,
        classification,
        measurement_context,
        measured_at,
        mood_id,
        notes
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `,
    args: [
      dados.user_id,
      dados.glucose_level,
      classification,
      dados.measurement_context,
      dados.measured_at,
      dados.mood_id ?? null,
      dados.notes ?? null,
    ],
  });

  const linha =
    resultado.rows[0] as unknown as LinhaDaTabelaGlucose;

  return converterLinhaParaMedicao(linha);
}

/**
 * 2) LISTAR MEDIÇÕES
 *
 * Busca as medições de um usuário.
 *
 * Retorna as medições mais recentes primeiro.
 *
 * USADA EM:
 * Tela de Histórico.
 */
export async function listarMedicoes(
  userId: number
): Promise<Medicao[]> {
  const resultado = await turso.execute({
    sql: `
      SELECT *
      FROM ${NOME_DA_TABELA}
      WHERE user_id = ?
      ORDER BY measured_at DESC
    `,
    args: [userId],
  });

  const linhas =
    resultado.rows as unknown as LinhaDaTabelaGlucose[];

  return linhas.map(converterLinhaParaMedicao);
}

/**
 * 3) BUSCAR MEDIÇÃO POR ID
 *
 * Busca uma única medição através do seu ID.
 *
 * O userId também é utilizado para garantir
 * que o usuário só consiga acessar uma medição
 * pertencente à sua própria conta.
 *
 * USADA EM:
 * Futura página de detalhes da medição.
 */
export async function buscarMedicaoPorId(
  id: number,
  userId: number
): Promise<Medicao> {
  const resultado = await turso.execute({
    sql: `
      SELECT *
      FROM ${NOME_DA_TABELA}
      WHERE id = ?
        AND user_id = ?
    `,
    args: [id, userId],
  });

  if (resultado.rows.length === 0) {
    throw new Error('Medição não encontrada.');
  }

  const linha =
    resultado.rows[0] as unknown as LinhaDaTabelaGlucose;

  return converterLinhaParaMedicao(linha);
}

/**
 * 4) ATUALIZAR MEDIÇÃO
 *
 * Atualiza os dados de uma medição existente.
 *
 * A classificação é recalculada automaticamente
 * caso o valor da glicemia seja alterado.
 *
 * USADA EM:
 * Futura edição de uma medição.
 */
export async function atualizarMedicao(
  id: number,
  userId: number,
  dados: Omit<DadosDaMedicao, 'user_id'>
): Promise<Medicao> {
  const classification = classificarGlicemia(
    dados.glucose_level
  );

  const resultado = await turso.execute({
    sql: `
      UPDATE ${NOME_DA_TABELA}
      SET
        glucose_level = ?,
        classification = ?,
        measurement_context = ?,
        measured_at = ?,
        mood_id = ?,
        notes = ?
      WHERE id = ?
        AND user_id = ?
      RETURNING *
    `,
    args: [
      dados.glucose_level,
      classification,
      dados.measurement_context,
      dados.measured_at,
      dados.mood_id ?? null,
      dados.notes ?? null,
      id,
      userId,
    ],
  });

  if (resultado.rows.length === 0) {
    throw new Error(
      'Não foi possível atualizar a medição: registro não encontrado.'
    );
  }

  const linha =
    resultado.rows[0] as unknown as LinhaDaTabelaGlucose;

  return converterLinhaParaMedicao(linha);
}

/**
 * 5) EXCLUIR UMA MEDIÇÃO
 *
 * Remove definitivamente uma medição.
 *
 * USADA EM:
 * Página de detalhes ou histórico.
 */
export async function excluirMedicao(
  id: number,
  userId: number
): Promise<void> {
  await turso.execute({
    sql: `
      DELETE FROM ${NOME_DA_TABELA}
      WHERE id = ?
        AND user_id = ?
    `,
    args: [id, userId],
  });
}

/**
 * 6) EXCLUIR VÁRIAS MEDIÇÕES
 *
 * Remove várias medições selecionadas pelo usuário.
 *
 * USADA EM:
 * Histórico, quando o usuário seleciona vários cards
 * e confirma a exclusão.
 */
export async function excluirMedicoes(
  ids: number[],
  userId: number
): Promise<void> {
  if (ids.length === 0) {
    return;
  }

  const placeholders = ids.map(() => '?').join(', ');

  await turso.execute({
    sql: `
      DELETE FROM ${NOME_DA_TABELA}
      WHERE user_id = ?
        AND id IN (${placeholders})
    `,
    args: [userId, ...ids],
  });
}

/**
 * 7) BUSCAR MÉTRICAS DO DIA
 *
 * Retorna:
 * - última medição
 * - maior medição
 * - menor medição
 * - média do dia
 *
 * USADA EM:
 * Painel de métricas da Home.
 */
export async function buscarMetricasDoDia(
  userId: number
) {
  const resultado = await turso.execute({
    sql: `
      SELECT
        ROUND(AVG(glucose_level), 0) AS average,
        MAX(glucose_level) AS highest,
        MIN(glucose_level) AS lowest
      FROM ${NOME_DA_TABELA}
      WHERE user_id = ?
        AND date(measured_at) = date('now')
    `,
    args: [userId],
  });

  const linha = resultado.rows[0] as unknown as {
    average: number | null;
    highest: number | null;
    lowest: number | null;
  };

  const ultimaMedicao = await turso.execute({
    sql: `
      SELECT glucose_level
      FROM ${NOME_DA_TABELA}
      WHERE user_id = ?
        AND date(measured_at) = date('now')
      ORDER BY measured_at DESC
      LIMIT 1
    `,
    args: [userId],
  });

  return {
    average: linha.average,
    highest: linha.highest,
    lowest: linha.lowest,
    latest:
      ultimaMedicao.rows.length > 0
        ? Number(ultimaMedicao.rows[0].glucose_level)
        : null,
  };
}

/**
 * 8) BUSCAR DADOS DO GRÁFICO
 *
 * Busca as medições de acordo com o período escolhido.
 *
 * Períodos disponíveis:
 * - 7 dias
 * - 3 meses
 * - 6 meses
 *
 * USADA EM:
 * Gráfico da tela de Histórico.
 */
export async function buscarDadosGrafico(
  userId: number,
  periodo: 7 | 90 | 180
): Promise<Medicao[]> {
  const resultado = await turso.execute({
    sql: `
      SELECT *
      FROM ${NOME_DA_TABELA}
      WHERE user_id = ?
        AND measured_at >= datetime('now', '-' || ? || ' days')
      ORDER BY measured_at ASC
    `,
    args: [userId, periodo],
  });

  const linhas =
    resultado.rows as unknown as LinhaDaTabelaGlucose[];

  return linhas.map(converterLinhaParaMedicao);
}