<template>
  <ul v-if="pageCount" class="pagination">

    <li v-if="page > 1">
      <a href="" @click.prevent="previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>

    <li v-for="p in pages" :key="p" :class="{ active: p == page }">
      <a href="" @click.prevent="select(p)">{{ p }}</a>
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
      select (page) {
        this.$emit('change', page)
      },
      previous () {
        this.$emit('change', this.page - 1)
      },
      next () {
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
    padding: 8px 0 6px;
    color: #000;
    width: 32px;
    height: 40px;
    text-align: center;
  }
  .active > a {
    background-color: #aaa !important;
    color: #fff !important;
    border-color: #aaa !important;
  }
</style>
