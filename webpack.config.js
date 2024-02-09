const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const deps = require("./package.json").dependencies;

module.exports = (env) => {
  if (env.target === "production") {
    console.log("production");
    process.env.NODE_ENV = "production";
  }
  const environment = process.env.NODE_ENV || "";

  const envpath = "./.env" + (environment !== "" ? "." + environment : "");

  // Load the .env file
  require("dotenv").config({ path: envpath });
  process.env.ENV = process.env.NODE_ENV || "development";
  process.env.envpath = envpath;

  return {
    // target identifies which .env file to use

    output: {
      publicPath: "http://localhost:3000/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 3000,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "public", globOptions: { ignore: ["**/index.html"] } }],
      }),
      new ModuleFederationPlugin({
        name: "soloboard",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {},
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
      }),
    ],
  };
};
