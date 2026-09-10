import { createClient } from '@libsql/client/web';

const urlDoTurso = process.env.EXPO_PUBLIC_TURSO_URL;
const tokenDoTurso = process.env.EXPO_PUBLIC_TURSO_TOKEN;


if (!urlDoTurso || !tokenDoTurso) {
  throw new Error(
    'Variáveis de ambiente do Turso não configuradas. Verifique o arquivo .env (EXPO_PUBLIC_TURSO_URL / EXPO_PUBLIC_TURSO_TOKEN).'
  );
}

export const turso = createClient({
  url: urlDoTurso,
  authToken: tokenDoTurso,
});
