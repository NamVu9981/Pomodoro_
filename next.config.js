/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add a rule for handling MP3 files
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader", 
        options: {
          publicPath: "/_next/static/sounds/",
          outputPath: "static/sounds/",
          name: "[name].[ext]",
        },
      },
    });

    // Important: return the modified config
    return config;
  },
};
module.exports = nextConfig;
