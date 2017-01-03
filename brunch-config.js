/* eslint-disable global-require */
module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/,
      },
    },
    stylesheets: { joinTo: 'app.css' },
  },

  plugins: {
    babel: {
      presets: ['es2015', 'es2016', 'react'],
      plugins: [
        'transform-object-rest-spread',
        'transform-class-properties',
      ],
    },
    postcss: {
      processors: [
        require('postcss-simple-vars')(),
        require('autoprefixer')(),
      ],
      modules: true,
    },
  },

  server: {
    path: 'server/app.js',
  },
};
