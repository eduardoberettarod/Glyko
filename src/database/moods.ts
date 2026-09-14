/**
 * LOCALIZAÇÃO: src/services/moods.ts
 *
 * PROPÓSITO:
 * Funções relacionadas à tabela "moods".
 *
 * Os humores são pré-definidos pelo aplicativo.
 */

import { turso } from '@/database/turso';

const NOME_DA_TABELA = 'moods';

export interface Humor {
  id: number;
  name: string;
}

// Busca no banco todos os humores cadastrados na tabela "moods", ordenados por id, e retorna a lista tipada.
export async function listarHumores(): Promise<Humor[]> {
  const resultado = await turso.execute({
    sql: `
      SELECT id, name
      FROM ${NOME_DA_TABELA}
      ORDER BY id ASC
    `,
    args: [],
  });

  return resultado.rows as unknown as Humor[];
}