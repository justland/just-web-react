/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  customTitle: '@just-web React Documentation',
  customTitleLink: 'https://github.com/justland/just-web-react',
  entryPointStrategy: 'packages',
  entryPoints: [
    'components/react-commands',
    'libraries/react'
  ],
  out: 'docs'
}
