
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

import { barrel, component, styles, story, test } from './templates'

export default {
  command: 'component <name>',
  describe: 'Generate component',
  builder: {

  },
  handler({ root, name }) {
    const dir = path.join(root, name)

    name = name
      .split('/')
      .map(([initial, ...rest]) => [initial.toUpperCase(), ...rest].join(''))
      .join('')

    console.log(chalk`🖍️  generate: {cyan [Component: ${name}]}`)

    if (fs.existsSync(dir)) {
      console.log(chalk`   {red.bold error} {red A component with that name already exists.}`)
      process.exit(0)
    }

    fs.mkdirSync(dir, { recursive: true })

    function writeFileErrorHandler(err) {
      if (err) throw err;
    }

    const log = (file) => console.log(chalk`   {green create} {dim ${file}}`)

    // index.ts
    log(`${dir}/index.ts`)
    fs.writeFile(`${dir}/index.ts`, barrel(name), writeFileErrorHandler)

    // component.tsx
    log(`${dir}/${name}.tsx`)
    fs.writeFile(`${dir}/${name}.tsx`, component(name), writeFileErrorHandler)

    // component.test.jsx
    log(`${dir}/${name}.test.tsx`)
    fs.writeFile(`${dir}/${name}.test.tsx`, test(name), writeFileErrorHandler)

    // component.stories.jsx
    log(`${dir}/${name}.stories.tsx`)
    fs.writeFile(`${dir}/${name}.stories.tsx`, story(name), writeFileErrorHandler)

    // component.module.sass
    log(`${dir}/${name}.module.sass`)
    fs.writeFile(`${dir}/${name}.module.sass`, styles(name), writeFileErrorHandler)
  }
}
