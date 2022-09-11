const withPlugins = require('next-compose-plugins');

nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
      issuer: {
        test: /\.(js|ts|css|scss|sass)x?$/,
      },
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
      issuer: {
        test: /\.(js|ts|css|scss|sass)x?$/,
      },
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
  compiler: {
    styledComponents: {
      // Not supported yet.
      pure: true,
    },
  },
};

module.exports = withPlugins([], nextConfig);
