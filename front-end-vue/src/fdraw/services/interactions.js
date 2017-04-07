class Interactions {
  setup (elem, actions) {
    this.elem = elem
    this.actions = actions
  }

  onMouseDown = (event) => {
    this.cStart = { x: event.clientX, y: event.clientY }
  }

  onMouseUp = (event) => {
    const cEnd = { x: event.clientX, y: event.clientY }
    this.actions.move(cEnd.x - this.cStart.x, cEnd.y - this.cStart.y)
  }

  onKeyDown = (event) => {
    switch (event.keyCode) {
      case 107: case 187: this.actions.zoomIn(); break
      case 109: case 189: this.actions.zoomOut(); break
      default: return
    }
  }

  onTouchStart = (event) => {
    event.preventDefault()
    const pts = event.targetTouches.length
    if (pts === 1) {
      this.sx1 = event.targetTouches[0].clientX
      this.sy1 = event.targetTouches[0].clientY
      this.state = 1
    } else if (pts === 2) {
      this.sx1 = event.targetTouches[0].clientX
      this.sy1 = event.targetTouches[0].clientY
      this.sx2 = event.targetTouches[1].clientX
      this.sy2 = event.targetTouches[1].clientY
      this.state = 2
    } else {
      this.state = 0
    }
  }

  onTouchEnd = (event) => {
    event.preventDefault()

    if (this.state === 1) {
      this.ex1 = event.changedTouches[0].clientX
      this.ey1 = event.changedTouches[0].clientY
      this.actions.move(this.ex1 - this.sx1, this.ey1 - this.sy1)
    } else if (this.state === 2) {
      this.ex1 = event.changedTouches[0].clientX
      this.ey1 = event.changedTouches[0].clientY

      if (event.changedTouches.length > 1) {
        this.ex2 = event.changedTouches[1].clientX
        this.ey2 = event.changedTouches[1].clientY
      } else {
        this.ex2 = event.targetTouches[0].clientX
        this.ey2 = event.targetTouches[0].clientY
      }
      const ds = (this.sx1 - this.sx2) * (this.sx1 - this.sx2) +
        (this.sy1 - this.sy2) * (this.sy1 - this.sy2)

      const de = (this.ex1 - this.ex2) * (this.ex1 - this.ex2) +
        (this.ey1 - this.ey2) * (this.ey1 - this.ey2)

      if (ds > de) { this.actions.zoomOut() } else { this.actions.zoomIn() }
    }
    this.state = 0
  }

  bind () {
    this.state = 0
    this.sx1 = 0
    this.sy1 = 0
    this.sx2 = 0
    this.sy2 = 0
    this.ex1 = 0
    this.ey1 = 0
    this.ex2 = 0
    this.ey2 = 0

    this.elem.addEventListener('mousedown', this.onMouseDown)
    this.elem.addEventListener('mouseup', this.onMouseUp)
    this.elem.addEventListener('keydown', this.onKeyDown)
    this.elem.addEventListener('touchstart', this.onTouchStart)
    this.elem.addEventListener('touchend', this.onTouchEnd)
  }

  unbind () {
    this.elem.removeEventListener('mousedown', this.onMouseDown)
    this.elem.removeEventListener('mouseup', this.onMouseUp)
    this.elem.removeEventListener('keydown', this.onKeyDown)
    this.elem.removeEventListener('touchstart', this.onTouchStart)
    this.elem.removeEventListener('touchend', this.onTouchEnd)
  }

  static create (elem, actions) {
    const instance = new Interactions()
    instance.setup(elem, actions)
    return instance
  }
}

export default Interactions
