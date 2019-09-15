<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <p>
          <b>MY HOBBIES</b>
          is an
          <a href="https://github.com/iurii-kyrylenko/hobbies" target="_blank">open-source project</a>
          for keeping track of books you have read/listened and movies you have watched.
      </p>
      <p>
          After logging in you are able to:
      </p>
      <ul>
          <li>Add an item (book or movie) to the list.</li>
          <li>Modify an existing item.</li>
          <li>Remove an item.</li>
          <li>Perform search for specific item(s).</li>
          <li>Download items as a file in JSON format.</li>
          <li>Upload items from JSON file.</li>
      </ul>
      <p>
          Also you have the possibilities to:
      </p>
      <ul>
          <li>Share data with other people.</li>
          <li>Change you personal settings.</li>
      </ul>
      <p>
          Unathorized people can see and download the shared data.
      </p>
      <hr />
      <b>Change log</b>
      <p>
        <ul>
          <li>
            Sep 15, 2019: Handle errors from TMDb API. Update dependencies.
          </li>
          <li>
            Nov 4, 2018: Filter out people without hobbies.
          </li>
          <li>
            Nov 3, 2018: Update to latest versions of Vue.js and other libraries.
          </li>
          <li>
            May 25, 2017: Change movie info service from <a href="http://www.omdbapi.com/" target="_blank">OMDb</a> to <a href="https://www.themoviedb.org/" target="_blank">TMDb</a>.
          </li>
          <li>
            Apr 24, 2017: Wire up the <a href="http://www.omdbapi.com/" target="_blank">OMDb</a> api service to obtain the movie info.
          </li>
        </ul>
      </p>
    </div>
  </div>
</template>
