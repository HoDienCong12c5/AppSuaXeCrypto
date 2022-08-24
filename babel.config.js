module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.js', '.ios.js', '.android.js'],
        alias: {
          common: './common',
          controller: './controller',
          assets: './assets',
          frontend: '.Frontend',
          modals: './modals',
          reduxs: './reduxs',
          components: './components'
        }
      }
    ]
  ],
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  }
};
