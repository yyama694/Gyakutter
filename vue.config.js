module.exports = {
  pages: {
    index: {
      entry: "src/main.js", //entry for the public page
      template: "public/index.html", // source template
      filename: "index.html" // output as dist/*
    },
    privacy: {
      entry: "src/privacyPoricy.js", //entry for the public page
      template: "public/privacy_poricy.html", // source template
      filename: "privacy_poricy.html" // output as dist/*
    }
  },
  outputDir: "docs",
  assetsDir: "./",
  publicPath: "./"
};
