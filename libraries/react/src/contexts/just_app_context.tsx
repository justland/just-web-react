import type { JustApp } from '@just-web/app'
import { createContext } from 'react'
import type { ReactGizmo } from '../gizmos/react_gizmo.js'

export type JustReactApp = JustApp & ReactGizmo

export const JustAppRootContext = createContext<JustApp & Partial<ReactGizmo>>(undefined as any)
