// const path = require('path')
 
// module.exports = {
//   sassOptions: {
//     includePaths: [path.join(__dirname, 'styles')],
//   },
//   images: {
//     domains: ['res.cloudinary.com', 'media.dev.to']
//   }
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/haiphamcoder.github.io",
  output: "export",
  reactStrictMode: true,
};

module.exports = nextConfig;
