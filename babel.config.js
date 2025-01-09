module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // Reanimated's Babel plugin here:
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
    ['react-native-worklets-core/plugin'],
  ],
};
