import FWorker from 'worker-loader!../services/fworker'
import Interactions from '../services/interactions'

export default {
  props: ['value'],
  methods: {
    draw () {
      this.$emit('progress', true)
      this.interactions.unbind()

      const context = this.$el.getContext('2d')
      const params = this.getState()
      const image = context.createImageData(params.width, params.height)
      this.fworker.postMessage({ image, params })
    }
  },
  mounted () {
    this.fworker = new FWorker()

    this.fworker.onmessage = (e) => {
      const context = this.$el.getContext('2d')
      context.putImageData(e.data.image, 0, 0)

      this.interactions.bind()
      this.$emit('progress', false)
    }

    this.interactions = Interactions.create(this.$el, {
      move: (dx, dy) => {
        this.changeState(({ x, y, zoom: z }) => ({ x: x - dx / z, y: y + dy / z }))
      },
      zoomIn: () => {
        this.changeState(({ zoom }) => ({ zoom: zoom * 1.5 }))
      },
      zoomOut: () => {
        this.changeState(({ zoom }) => ({ zoom: zoom / 1.5 }))
      }
    })
    this.draw()
  },
  beforeDestroy () {
    this.fworker.terminate()
  }
}
