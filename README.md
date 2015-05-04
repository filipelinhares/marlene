<p align="center">
	<img src="https://raw.githubusercontent.com/filipelinhares/marlene/master/assets/images/logo.png" alt="Marlene">
	<h4 align="center">A simple html5 and responsive template.</h4>
</p>

## Features
- sass compilation
- css minification
- scss linting
- autoprefixer
- browserify compilation
- js minification
- browser-sync
- local server

## Getting started
* Create a new repo for your project on Github
* In terminal run each line as a separate command
```bash
    git clone git@github.com:filipelinhares/marlene.git your-project
    cd your-project
    rm -rf .git
    git init
    git remote add origin git@github.com:your-name/your-project.git
    npm run up
```

## Commands

`npm run up`
> Is the same as: `npm install` and `bower install`.

`npm run start`
> Will open your browser in new tab with a server at `localhost:3000`.

- `npm run sass` Compile sass and minify,
- `npm run images` Optmize images.
- `npm run js` Compile js and minify.

## Configuration
Marlene has a configuration file called [marlene.json](marlene.json).

```json
{
  "srcFolders": {
    "js": "assets/javascript/main.js",
    "style": "assets/stylesheets/main.scss",
    "img": "assets/images/*"
  },
  "distFolders": {
    "js": "dist/js",
    "style": "dist/css",
    "img": "dist/images"
  },
  "sass": {
    "prefixVersions": ["last 2 versions", "ie 8", "ie 9"],
    "distFileName": "main.min.css"
  },
  "images": {
    "progressive": true,
    "multipass": true,
    "optimizationLevel": 4
  },
  "js": {
    "distFileName": "main.min.js"
  }
}
```

- `srcFolders`: The sources entry point.
- `distFolders`: The production folders.
- `sass`: SASS options:
	- `prefixVersions`: The versions of [Autoprefixer](https://github.com/postcss/autoprefixer).
	- `distFileName`: The name of the final file.
- `images`: Optimization image options.
- `js`: Javascript options:
	- `distFileName`: The name of the final file.

## Author
[Filipe Linhares](http://filipelinhares.com)

# License

The MIT License (MIT)

Copyright (c) 2015 Filipe Linhares

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
