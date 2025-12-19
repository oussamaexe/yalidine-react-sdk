export default {
  input: 'dist/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'YalidineSDK'
    }
  ],
  external: ['react', 'react-dom', 'axios']
};
