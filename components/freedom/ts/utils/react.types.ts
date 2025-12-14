import type { JSXElementConstructor } from 'react'

export type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>
