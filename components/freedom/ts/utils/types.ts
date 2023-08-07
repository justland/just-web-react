import type { ReactElement, ReactNode } from 'react'
import type { ReactTag } from './react.types.js'

export interface OptionalChildrenProps<TSlot> {
	children?: ReactNode | ((bag: TSlot) => ReactElement)
}

export interface OverridableProps<TTag extends ReactTag> {
	as?: TTag
}
