
const colorPalette = (c, maxIter) => {
  if (c.x < 0 || c.x > 1 || c.y < 0 || c.y > 1) {
    return 0
  }
  return c.x * maxIter
}

// http://linas.org/art-gallery/escape/smooth.html
const normalize = (mz, n) => {
  if (n === 0) return 0
  const t = Math.log(mz) / 2
  return n - Math.log(t) / Math.log(2)
}

const mandelbrot = (c, maxIter) => {
  let z = { x: 0, y: 0 }
  for (let i = 0; i < maxIter; i++) {
    const zz = {
      x: z.x * z.x - z.y * z.y + c.x,
      y: 2 * z.x * z.y + c.y
    }
    const mz = zz.x * zz.x + zz.y * zz.y
    if (mz > 4) {
      return normalize(mz, i)
    }
    z = zz
  }
  return maxIter
}

export default {
  colorPalette,
  mandelbrot
}
