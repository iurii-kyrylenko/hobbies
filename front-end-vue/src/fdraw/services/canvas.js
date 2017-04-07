import iterations from './iterations'
import getColor from './getColor'

const mapPoint = (srcX, srcY, trgParams) => ({
  x: trgParams.x + srcX / trgParams.zoom,
  y: trgParams.y - srcY / trgParams.zoom
})

const draw = (el, params) => {
  const context = el.getContext('2d')

  const width = params.width
  const height = params.height
  const halfWidth = Math.floor(width / 2)
  const halfHeight = Math.floor(height / 2)
  const imgData = context.createImageData(width, height)
  const maxIter = 300

  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const ii = 4 * (j * width + i)
      const cPoint = mapPoint(i - halfWidth, j - halfHeight, params)
      const nIter = iterations.mandelbrot(cPoint, maxIter)
      const c = getColor.wb(nIter / maxIter)
      imgData.data[ii + 0] = c.r
      imgData.data[ii + 1] = c.g
      imgData.data[ii + 2] = c.b
      imgData.data[ii + 3] = c.a
    }
  }
  context.putImageData(imgData, 0, 0)
}

export default {
  draw
}
