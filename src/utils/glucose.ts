export function classificarGlicemia(valor: number) {
  if (valor < 70) return 'low';
  if (valor > 140) return 'high';

  return 'normal';
}