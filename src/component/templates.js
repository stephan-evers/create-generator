
// index.ts
export const barrel = (name) => `
export { default as ${name} } from './${name}.tsx'
`

// component.tsx
export const component = (name) => `
import React from 'react'
import styles from './${name}.module.sass'

interface ${name}Props {}

const ${name} = ({}: ${name}Props) => {
  return <div className={styles.${name}}>Hello 👋, I am a ${name} component.</div>
}

export default ${name}
`

// component.test.tsx
export const test = (name) => `
import React from 'react'
import { render } from '@testing-library/react'
import ${name} from './${name}.tsx'

describe('${name} Component', () => {
  test('it should match the snapshot', () => {
    const { asFragment } = render(<${name} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
`

// component.stories.jsx
export const story = (name) => `
import React from 'react'
import ${name} from './${name}.tsx'

export default {
  title: '${name}',
  component: ${name},
}

export const Default = () => <${name} />
`

// component.module.sass
export const styles = (name) => `
.${name}
  border: 2px solid tomato
`
