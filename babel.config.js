function babelConfig(api) {
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.js',
          '.ts',
          '.tsx',
          '.ios.js',
          '.ios.ts',
          '.ios.tsx',
          '.android.js',
          '.android.ts',
          '.android.tsx',
          '.json',
        ],
      },
    ],
  ];

  if (api) {
    const env = api.env();
    //
    // console.log('\n\n!-!-!-!-!-!-!-!-!-!-! ENVIRONMENT ===> ', env);
    //
    if (env === 'production') {
      plugins.push('transform-remove-console');
    }
    //
    api.cache(false); //Do not cache this config, and re-execute the function every time
  }

  return {
    presets,
    plugins,
  };
}

module.exports = babelConfig;
