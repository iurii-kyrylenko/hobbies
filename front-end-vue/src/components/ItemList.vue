<template>
  <div>

    <div class="my-search input-group">

        <input type="text" class="form-control" :placeholder="searchPlaceholder">

        <div class="input-group-btn">

          <a class="btn btn-default" title="Apply Search Filter">
            <i class="glyphicon glyphicon-search"></i>
          </a>

          <a class="btn btn-default" title="Clear Search Filter">
            <i class="glyphicon glyphicon-remove-sign"></i>
          </a>

          <router-link to="new" append class="btn btn-default" :title="addPrompt">
            <i class="glyphicon glyphicon-plus"></i>
          </router-link>

          <a class="btn btn-default" :title="downloadPrompt">
            <i class="glyphicon glyphicon-download"></i>
          </a>

          <label for="file" class="btn btn-default" :title="uploadPrompt">
            <i class="glyphicon glyphicon-upload"></i>
          </label>

        </div>
    </div>

    <div class="panel panel-default">
        <slot></slot>
    </div>

  </div>
</template>

<script>
  export default {
    props: [
      'searchPlaceholder',
      'addPrompt',
      'removeHeader',
      'downloadPrompt',
      'uploadPrompt',
      'exportFileName'
    ]
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
   * Pager bar
   */
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
