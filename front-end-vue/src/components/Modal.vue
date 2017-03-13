<template>
  <transition name="modal">
    <div v-if="showModal" tabindex="-1" class="modal-mask"
         @keyup.esc="close(false)" @keyup.enter="close(true)">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <button class="close" @click="close(false)">
              <span aria-hidden="true">&times;</span>
            </button>
            <slot name="header"></slot>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"></slot>
            <button class="btn btn-default" @click="close(true)">Yes</button>
            <button class="btn btn-default" @click="close(false)">No</button>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        showModal: false
      }
    },
    methods: {
      open () {
        this.showModal = true
        this.$nextTick(() => this.$el.focus())
      },
      close (result) {
        this.showModal = false
        this.$emit('close', result)
      }
    }
  }
</script>

<style>
  /*
   * backdrop
   */
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity .3s ease;
  }

  /*
   * transition="modal"
   */
  .modal-enter,
  .modal-leave-active {
    opacity: 0;
  }
</style>
