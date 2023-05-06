export function roundToSignificantDigits(num, significantDigits) {
  const factor = Math.pow(10, significantDigits - 1 - Math.floor(Math.log10(Math.abs(num))));
  return Math.round(num * factor) / factor;
}