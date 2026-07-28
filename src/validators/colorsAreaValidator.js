function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export function lighten(hex, amt = 0.85) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.round(r + (255 - r) * amt)},${Math.round(
    g + (255 - g) * amt
  )},${Math.round(b + (255 - b) * amt)})`;
}

export function darken(hex, amt = 0.45) {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${Math.round(r * amt)},${Math.round(g * amt)},${Math.round(
    b * amt
  )})`;
}