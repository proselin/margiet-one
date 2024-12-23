const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join, resolve } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/margiet-one'),
  },
  resolve: {
    alias: {
      '@nestjs/graphql': resolve(
        __dirname,
        '../node_modules/@nestjs/graphql/dist/extra/graphql-model-shim'
      ),
    },
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      watch: false,
      progress: true,
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
