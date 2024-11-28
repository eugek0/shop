// next.config.js
const withPlugins = require('next-compose-plugins')

const optimizedImages = import('next-optimized-images')
const withFonts = require('next-fonts')

module.exports = withPlugins([optimizedImages, withFonts], {
  optimizeImages: true,
  handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif', 'jpg'],
  webp: {
    preset: 'default',
    quality: 85,
  },
  mozjpeg: {
    quality: 85,
  },
  disableStaticImages: false,
  optimizeImagesInDev: true,

  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: `${process.env.PROXY_URL}/:slug*`,
      },
    ]
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(woff(2)?|eot|ttf|otf|svg|jpe?g)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next',
          name: '[name].[ext]',
          outputPath: 'static/fonts',
        },
      },
    })

    return config
  },

  images: {
    domains: ['u-project-studio.ru'],
    loader: 'default',
    formats: ['image/webp'],
    deviceSizes: [320, 640, 768, 1024, 1600],
    imageSizes: [16, 32, 48, 64, 96],
  },

  poweredByHeader: false,
  generateBuildId: () => 'build',
})
