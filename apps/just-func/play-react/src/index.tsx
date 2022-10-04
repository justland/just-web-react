import { createApp } from '@just-web/app'
import browserPlugin from '@just-web/browser'
import browserContributionsPlugin from '@just-web/browser-contributions'
import commandsPlugin from '@just-web/commands'
import contributionsPlugin from '@just-web/contributions'
import { logLevels } from '@just-web/log'
import osPlugin from '@just-web/os'
import routePlugin from '@just-web/routes'
import React from 'react'
import ReactDOM from 'react-dom'
import { createColorLogReporter } from 'standard-log-color'
import App from './App'
import { createDocument } from './docs/createDocument'
import { createDocView } from './docViews/createDocView'
import reportWebVitals from './reportWebVitals'
import { createAppStore } from './store'
import './styles.css'

void (async () => {
  const reporter = createColorLogReporter()
  const app = await createApp({
    name: 'play-react',
    log: { logLevel: logLevels.all, reporters: [reporter] }
  }).extend(contributionsPlugin())
    .extend(commandsPlugin())
    .extend(osPlugin())
    .extend(browserPlugin())
    .extend(browserContributionsPlugin())
    .extend(routePlugin())
  createAppStore(app)

  app.contributions.commands.add({
    command: 'app.newDocument',
    name: 'Create a new document'
  })

  app.commands.register('app.newDocument', () => {
    const doc = createDocument()
    createDocView(doc)
  })

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.routes.register('/', () => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    )

    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals()
  })

  app.routes.register('/error', () => {
    ReactDOM.render(
      <div>something went wrong</div>,
      document.getElementById('root')
    )
  })

  await app.start()
})()
