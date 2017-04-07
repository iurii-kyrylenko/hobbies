import canvas from '../services/canvas'
import Interactions from '../services/interactions'

export default {
  props: ['value'],
  methods: {
    draw () {
      this.$emit('progress', true)
      this.interactions.unbind()
      setTimeout(() => {
        canvas.draw(this.$el, this.getState())
        setTimeout(() => {
          this.interactions.bind()
          this.$emit('progress', false)
        }, 0)
      }, 0)
    }
  },
  mounted () {
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
  }
}
