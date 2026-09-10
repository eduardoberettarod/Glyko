import { turso } from '@/database/turso';
import * as Crypto from 'expo-crypto';

const NOME_DA_TABELA = 'users';

/**
 *
 * Os nomes seguem exatamente os nomes das colunas
 * existentes no banco de dados.
 */
interface LinhaDaTabelaUsers {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birth_date: string;
  diabetes_type: string;
  notifications_enabled: number;
  created_at: string;
}

/**
 * Dados necessários para criar ou atualizar um usuário.
 */
export interface DadosDoUsuario {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birth_date: string;
  diabetes_type: string;
  notifications_enabled?: boolean;
}

/**
 * Formato do usuário que será utilizado pelo aplicativo.
 *
 * A senha não é retornada para as telas.
 */
export interface Usuario {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  diabetes_type: string;
  notifications_enabled: boolean;
  created_at: string;
}


/**
 * Converte uma senha em um hash SHA-256.
 *
 * A senha original nunca é salva no banco.
 */
async function gerarHashSenha(senha: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    senha
  );
}


/**
 * Converte o valor booleano usado pelo aplicativo
 * para o valor INTEGER utilizado pelo SQLite.
 *
 * Banco:
 * 1 = ativado
 * 0 = desativado
 */
function notificacoesParaBanco(
  notifications_enabled: boolean = true
): number {
  return notifications_enabled ? 1 : 0;
}


/**
 * Converte uma linha do banco para o formato
 * utilizado pelo aplicativo.
 */
function converterLinhaParaUsuario(
  linha: LinhaDaTabelaUsers
): Usuario {
  return {
    id: linha.id,
    first_name: linha.first_name,
    last_name: linha.last_name,
    email: linha.email,
    birth_date: linha.birth_date,
    diabetes_type: linha.diabetes_type,
    notifications_enabled: linha.notifications_enabled === 1,
    created_at: linha.created_at,
  };
}


/**
 * 1) CRIAR USUÁRIO
 *
 * Cria um novo usuário no banco.
 *
 * Antes de salvar, a senha é transformada em hash.
 *
 * USADA EM:
 * Tela de cadastro.
 */
export async function criarUsuario(
  dados: DadosDoUsuario
): Promise<Usuario> {

  const senhaHash = await gerarHashSenha(dados.password);

  const resultado = await turso.execute({
    sql: `
      INSERT INTO ${NOME_DA_TABELA}
      (
        first_name,
        last_name,
        email,
        password,
        birth_date,
        diabetes_type,
        notifications_enabled
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      RETURNING *
    `,
    args: [
      dados.first_name,
      dados.last_name,
      dados.email,
      senhaHash,
      dados.birth_date,
      dados.diabetes_type,
      notificacoesParaBanco(dados.notifications_enabled),
    ],
  });

  const linha =
    resultado.rows[0] as unknown as LinhaDaTabelaUsers;

  return converterLinhaParaUsuario(linha);
}


/**
 * 2) BUSCAR USUÁRIO POR ID
 *
 * Busca um único usuário utilizando seu ID.
 *
 * USADA EM:
 * Perfil e outras telas que precisam dos dados
 * do usuário atualmente logado.
 */
export async function buscarUsuarioPorId(
  id: number
): Promise<Usuario> {

  const resultado = await turso.execute({
    sql: `
      SELECT *
      FROM ${NOME_DA_TABELA}
      WHERE id = ?
    `,
    args: [id],
  });

  if (resultado.rows.length === 0) {
    throw new Error('Usuário não encontrado.');
  }

  const linha =
    resultado.rows[0] as unknown as LinhaDaTabelaUsers;

  return converterLinhaParaUsuario(linha);
}


/**
 * 3) BUSCAR USUÁRIO POR EMAIL
 *
 * Busca um usuário utilizando seu email.
 *
 * USADA EM:
 * Login.
 *
 * Retorna null caso o email não esteja cadastrado.
 */
export async function buscarUsuarioPorEmail(
  email: string
): Promise<Usuario | null> {

  const resultado = await turso.execute({
    sql: `
      SELECT *
      FROM ${NOME_DA_TABELA}
      WHERE email = ?
    `,
    args: [email],
  });

  if (resultado.rows.length === 0) {
    return null;
  }

  const linha =
    resultado.rows[0] as unknown as LinhaDaTabelaUsers;

  return converterLinhaParaUsuario(linha);
}


/**
 * 4) AUTENTICAR USUÁRIO
 *
 * Busca o usuário pelo email e verifica se a senha
 * informada corresponde ao hash armazenado no banco.
 *
 * USADA EM:
 * Tela de login.
 *
 * Retorna o usuário caso os dados estejam corretos.
 * Retorna null caso email ou senha estejam incorretos.
 */
export async function autenticarUsuario(
  email: string,
  senha: string
): Promise<Usuario | null> {

  const resultado = await turso.execute({
    sql: `
      SELECT *
      FROM ${NOME_DA_TABELA}
      WHERE email = ?
    `,
    args: [email],
  });

  if (resultado.rows.length === 0) {
    return null;
  }

  const linha =
    resultado.rows[0] as unknown as LinhaDaTabelaUsers;

  const senhaHash = await gerarHashSenha(senha);

  if (senhaHash !== linha.password) {
    return null;
  }

  return converterLinhaParaUsuario(linha);
}


/**
 * 5) ATUALIZAR USUÁRIO
 *
 * Atualiza os dados do usuário.
 *
 * A senha não é alterada por esta função.
 *
 * USADA EM:
 * Tela de perfil.
 */
export async function atualizarUsuario(
  id: number,
  dados: Omit<DadosDoUsuario, 'password'>
): Promise<Usuario> {

  const resultado = await turso.execute({
    sql: `
      UPDATE ${NOME_DA_TABELA}
      SET
        first_name = ?,
        last_name = ?,
        email = ?,
        birth_date = ?,
        diabetes_type = ?,
        notifications_enabled = ?
      WHERE id = ?
      RETURNING *
    `,
    args: [
      dados.first_name,
      dados.last_name,
      dados.email,
      dados.birth_date,
      dados.diabetes_type,
      notificacoesParaBanco(dados.notifications_enabled),
      id,
    ],
  });

  if (resultado.rows.length === 0) {
    throw new Error(
      'Não foi possível atualizar o usuário: usuário não encontrado.'
    );
  }

  const linha =
    resultado.rows[0] as unknown as LinhaDaTabelaUsers;

  return converterLinhaParaUsuario(linha);
}


/**
 * 6) ALTERAR SENHA
 *
 * Gera um novo hash para a senha e salva no banco.
 *
 * USADA EM:
 * Tela de alteração de senha.
 */
export async function alterarSenha(
  id: number,
  novaSenha: string
): Promise<void> {

  const senhaHash = await gerarHashSenha(novaSenha);

  const resultado = await turso.execute({
    sql: `
      UPDATE ${NOME_DA_TABELA}
      SET password = ?
      WHERE id = ?
    `,
    args: [senhaHash, id],
  });

  if (resultado.rowsAffected === 0) {
    throw new Error(
      'Não foi possível alterar a senha: usuário não encontrado.'
    );
  }
}


/**
 * 7) EXCLUIR USUÁRIO
 *
 * Remove definitivamente o usuário do banco.
 *
 * O ON DELETE CASCADE das tabelas relacionadas
 * será responsável por remover os dados associados.
 *
 * USADA EM:
 * Exclusão da conta.
 */
export async function excluirUsuario(
  id: number
): Promise<void> {

  await turso.execute({
    sql: `
      DELETE FROM ${NOME_DA_TABELA}
      WHERE id = ?
    `,
    args: [id],
  });
}

