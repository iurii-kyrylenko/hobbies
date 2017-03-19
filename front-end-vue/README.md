# front-end-vue

> A front-end part for the hobbies project, implemented in Vue.js

## Endpoints

| Path                          | Method           | Auth  | Notes |
| :---------------------------- |:-----------------| :----:|:------|
| /users/login                  | post             |       |
| /users/register               | post             |       |
| /users                        | get              |       |
| /shared/books, /shared/movies | get              |       | user id is placed in the query
| /books, /movies               | get, post        | +     |
| /books/id, /movies/id         | get, put, delete | +     |
| /books/upload, /movies/upload | post             | +     |
| /settings                     | get, put         | +     |

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
