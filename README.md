# vite-plugin-mpa-inspect

[![NPM version](https://img.shields.io/npm/v/vite-plugin-mpa-inspect?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-mpa-inspect)

Forked and inspired by [vite-plugin-inspect](https://github.com/antfu/vite-plugin-inspect)

Inspect the intermediate state of Vite plugins. Useful for debugging and authoring plugins.

<img width="1304" src="https://user-images.githubusercontent.com/46585162/134683677-487e3e03-fa6b-49ad-bde0-520ebb641a96.png">

![](https://s9.gifyu.com/images/Kapture-2021-09-11-at-07.33.36.gif)

## Install

```bash
npm i -D vite-plugin-mpa-inspect
```

Add plugin to your `vite.config.ts`:

```ts
// vite.config.ts
import Inspect from 'vite-plugin-mpa-inspect'

export default {
  plugins: [
    Inspect()
  ],
}
```

Then run `npm run dev` and visit [localhost:5173/__inspect_mpa/](http://localhost:5173/__inspect_mpa/) to inspect the modules.

## Build Mode

To inspect transformation in build mode, you can pass the `build: true` option:

```ts
// vite.config.ts
import Inspect from 'vite-plugin-mpa-inspect'

export default {
  plugins: [
    Inspect({
      build: true,
      outputDir: '.vite-inspect'
    })
  ],
}
```

After running `vite build`, the inspector client will be generated under `.vite-inspect`, where you can use `npx serve .vite-inspect` to check the result.

## License

[MIT](./LICENSE) License &copy; 2021-PRESENT [Gweesin](https://github.com/gweesin)
