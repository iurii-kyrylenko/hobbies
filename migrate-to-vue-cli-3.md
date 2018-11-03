1. Install latest vue cli:
> npm install -g @vue/cli`

2. Generate front-end progect. Select Babel, Router, Vuex, Linter and all default options, except bowser history:
>  vue create front-end

3. Install dependencies for `front-end`:
> npm i -S axios bootstrap-css-only@^3.3.7 file-saver vuelidate

4. Replace `src` folder with `src` from old project.

5. Change import path for `file-saver`:
> import { saveAs } from 'file-saver/dist/FileSaver'

6. Create `vue.config.js` file:
```js
module.exports = {
  runtimeCompiler: true,
  outputDir: '../back-end/public'
}
```
