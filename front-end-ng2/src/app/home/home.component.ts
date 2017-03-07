import { Component } from '@angular/core';

@Component({
    template: `
    <div class="panel panel-default">
      <div class="panel-body">
        <p>
            <b>MY HOBBIES</b>
            is an
            <a href="https://github.com/iurii-kyrylenko/hobbies" target="_blank">open-source project</a>
            for keeping track of books you have read/listened and movies you have watched.
        </p>
        <p>
            After logging in you will be able to:
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
            Your data is not accessible to other users.
        </p>
        <p>
            <b>This site is for demonstartion purposes only: you can loose data at any time.</b>
        </p>
      </div>
    </div>
    `
})
export class HomeComponent {}
