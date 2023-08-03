module.exports = {
  stories: ['../ts/**/*.stories.mdx', '../ts/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-storysource', 'storybook-dark-mode'],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  features: {
    storyStoreV7: true,
    interactionsDebugger: true
  },
  typescript: {
    check: false
  },
  // docs: {
  //   autodocs: true
  // }
};
