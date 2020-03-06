# Basic Webpack + Babel project

Demonstrates a bare-bones setup of Webpack and Babel.

## Build Your Own

Here are the steps to recreate this scaffolding.

### Set up the project

Create a new project and initialize git and npm.

```bash
$ mkdir myProject
$ cd myProject
$ git init
$ npm init
```

Create a `public` folder and stick in a skeleton `index.html` HTML file that will load a JS file that we expect to eventually produce using Webpack.

```html
<!-- public/index.html -->

<!-- sourced from https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html -->
<!DOCTYPE html>
<html>

<body>
<div id="root"></div>
<noscript>
  You need to enable JavaScript to run this app.
</noscript>
<script src="../dist/bundle.js"></script>
</body>

</html>
```

(There's more you probably want with your `<header>` and such, we're ignoring that for now.)

### Set up Babel

Install all the packages:

```bash
$ yarn add @babel/core @babel/cli @babel/preset-env
```

Create a `babel.config.js` file:

```js
// babel.config.js

module.exports = {
  'presets': ['@babel/env']
}
```

Create a `src/index.js` file and put in some basic code.

```js
// src/index.js

const add = (a = 1, b = 2) => {
  return a + b
}
```

You can run Babel from the command line to verify it's working.

```bash
$ ./node_modules/.bin/babel src/index.js
```

You should get something like this printed to your console:

```
"use strict";

var add = function add() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return a + b;
};
```

### Set up webpack

Install all the packages:

```bash
$ yarn add webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader 
```

Add a `webpack.config.js` at the root:

```js
// webpack.config.js

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
  },
}
```

Add a build script to your `package.json` to run your webpack dev server:

```
{
  ...
  "scripts": {
    ...
    "start": "webpack-dev-server"
  },
}
``` 

Now run the script.

```bash
$ yarn start
```

And visit your site at http://localhost:3000. Viola, you have a working JS project.
