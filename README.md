# Product Backlog React UI

By Ralf Tischer, 2023-2024.

React user interface to work with simplified product backlogs.
Application code and `README.md` documentation are _work in progress_.

<!-- MD-TOC START LEVEL 2 -->

## Table of Contents

- [TODO](#todo)
- [Links](#links)
- [Technical Background](#technical-background)
  - [React Components](#react-components)
- [Available Scripts](#available-scripts)
  - [`npm start`](#`npm-start`)
  - [`npm test`](#`npm-test`)
  - [`npm run deploy`](#`npm-run-deploy`)
  - [`npm run build`](#`npm-run-build`)
  - [`npm run eject`](#`npm-run-eject`)
- [Author](#author)

<!-- MD-TOC END -->

# Links

* Product Backlog UI on GitHub Pages: [https://ralftischer.github.io/product-backlog-react-ui/](https://ralftischer.github.io/product-backlog-react-ui/)
* Product Backlog Backend GitHub (private) repository: [https://github.com/RalfTischer/product-backlog-flask-api](https://github.com/RalfTischer/product-backlog-flask-api)

# Technical Background

The [React app](https://ralftischer.github.io/product-backlog-react-ui/) calls a Flask API to access a simple SQLite database.

## React Components

![Charts of Components](./docu/ProductBacklogComponents.png)


# Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run deploy`

Deploy project tp GitHub Pages to the `gh-pages` branch of this repository.


 ```bash
 $ npm run deploy -- -m "Deploy React app to GitHub Pages"
 ```

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

# Author
Ralf Tischer
2023-2024
