// Classifica um valor de glicemia como 'low' (abaixo de 70), 'high' (acima de 140) ou 'normal' (entre os dois).
export function classificarGlicemia(valor: number) {
  if (valor < 70) return 'low';
  if (valor > 140) return 'high';

  return 'normal';
}