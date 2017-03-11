<template>
  <ul class="pagination">

    <li v-if="page > 1">
      <a href="" @click.prevent="previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li v-for="p in pages">
      <a href="" :class="{ active: p == page }" @click.prevent="select($event, p)">{{ p }}</a>
    </li>

    <li v-if="page < pageCount">
      <a href="" @click.prevent="next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>

  </ul>
</template>

<script>
  export default {
    props: {
      frame: {
        type: Number,
        default: 10
      },
      page: Number,
      pageCount: Number
    },
    methods: {
      getPagerLimits (pageCount, page) {
        if (pageCount <= this.frame) {
          return { min: 1, max: pageCount }
        }
        const f1 = Math.floor(this.frame / 2)
        const f2 = pageCount - f1 + 1
        let min = 1
        if (f1 < page && page < f2) min = page - f1
        if (page >= f2) min = f2 - f1
        let max = min + this.frame - 1
        return { min, max }
      },
      select (event, page) {
        this.$emit('change', page)
      },
      previous (event) {
        this.$emit('change', this.page - 1)
      },
      next (event) {
        this.$emit('change', this.page + 1)
      }
    },
    computed: {
      pages () {
        const { min, max } = this.getPagerLimits(this.pageCount, this.page)
        const pa = []
        for (let i = min; i <= max; i++) {
          pa.push(i)
        }
        return pa
      }
    }
  }
</script>

<style scoped>
  .pagination {
    margin-top: 0px;
  }
  .pagination > li > a, .pagination > li > a:hover {
    color: #000;
    padding: 8px 0 6px;
    width: 32px;
    height: 40px;
    text-align: center;
  }
</style>
