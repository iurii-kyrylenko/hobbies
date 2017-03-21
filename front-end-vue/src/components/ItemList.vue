<template>
  <div>

    <modal ref="deleteConfirm" @close="closeConfirm">
      <div slot="header"><h4>{{ removeHeader }}</h4></div>
      <div slot="body">
        Are you sure you want to remove <span class="badge">{{ itemTitle }}</span>?
      </div>
    </modal>

    <div class="my-search input-group">

        <input type="text" class="form-control"
               ref="search"
               :placeholder="searchPlaceholder"
               :value="filter"
               @keyup.enter="applySearch"
               @keyup.esc="clearSearch">

        <div class="input-group-btn">

          <a @click="applySearch" class="btn btn-default" title="Apply Search Filter">
            <i class="glyphicon glyphicon-search"></i>
          </a>

          <a @click="clearSearch" class="btn btn-default" title="Clear Search Filter">
            <i class="glyphicon glyphicon-remove-sign"></i>
          </a>

          <router-link v-if="my" to="new" append class="btn btn-default" :title="addPrompt">
            <i class="glyphicon glyphicon-plus"></i>
          </router-link>

          <a @click="download" class="btn btn-default" :title="downloadPrompt">
            <i class="glyphicon glyphicon-download"></i>
          </a>

          <label v-if="my" for="file" class="btn btn-default" :title="uploadPrompt">
            <i class="glyphicon glyphicon-upload"></i>
          </label>

        </div>
    </div>

    <form ref="uploadForm">
      <input type="file" id="file" @change="uploadChange">
    </form>

    <div class="panel panel-default">
      <slot></slot>
    </div>

    <pager v-if="true"
           :frame="8"
           :pageCount="pageCount"
           :page="page"
           @change="changePage">
    </pager>

  </div>
</template>

<script>
  import Pager from './Pager'
  import Modal from './Modal'
  import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    components: { Pager, Modal },
    props: [
      'searchPlaceholder',
      'addPrompt',
      'removeHeader',
      'downloadPrompt',
      'uploadPrompt'
    ],
    data: () => ({ itemId: '', itemTitle: '' }),
    computed: {
      ...mapGetters('items', ['my', 'pageCount', 'page', 'filter'])
    },
    methods: {
      ...mapActions('items',
        ['getItems', 'changePage', 'applyFilter', 'download', 'upload', 'delete']),
      ...mapMutations('notification', ['notify']),
      applySearch () {
        this.applyFilter(this.$refs.search.value.trim())
      },
      clearSearch () {
        this.applyFilter('')
      },
      async uploadChange (event) {
        const files = event.target.files
        if (!files.length) return
        try {
          await this.upload(files[0])
          this.notify({ msg: 'Items have been uploaded :)', type: 'info' })
        } catch (e) {
          this.notify({ msg: 'Something went wrong when uploading items :(', type: 'danger' })
        } finally {
          this.$refs.uploadForm.reset()
        }
      },
      openConfirm ({ _id, title }) {
        this.itemId = _id
        this.itemTitle = title
        this.$refs.deleteConfirm.open()
      },
      async closeConfirm (result) {
        if (!result) return
        try {
          await this.delete(this.itemId)
          this.notify({ msg: 'An item has been removed :)', type: 'info' })
        } catch (e) {
          this.notify({ msg: 'Something went wrong when removing an item :(', type: 'danger' })
        }
      }
    },
    mounted () {
      if (this.my) this.getItems()
      else this.clearSearch()
    }
  }
</script>

<style>
  /*
   * Vertical align text in table
   */
  .table td {
      vertical-align: middle !important;
  }
  /*
   * Glyphicon opacity
   */
  a > i, label > i {
      opacity: 0.5;
  }
  a:hover > i, label:hover > i {
      opacity: 1.0;
  }
  /*
   * Hide file input element
   */
  input[type="file"] {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  /*
   * Search bar
   */
  .my-search {
    margin-bottom: 18px;
  }
  /*
   * Table header
   */
  .table > thead > tr > th {
    border-bottom: 0;
    font-weight: normal;
    font-style: italic;
    opacity: 0.6;
  }
</style>
