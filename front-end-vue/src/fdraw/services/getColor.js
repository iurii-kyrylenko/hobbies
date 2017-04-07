const wb = (h) => {
  let r, g, b, i, p, q
  i = (h === 1) ? 6 : Math.floor(h * 7)
  p = h * 7 - i
  q = 1 - p
  switch (i % 7) {
    case 0: r = 1; g = q; b = 1; break
    case 1: r = q; g = 0; b = 1; break
    case 2: r = 0; g = p; b = 1; break
    case 3: r = 0; g = 1; b = q; break
    case 4: r = p; g = 1; b = 0; break
    case 5: r = 1; g = q; b = 0; break
    case 6: r = q; g = 0; b = 0; break
    default: break
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: 255
  }
}

export default {
  wb
}
