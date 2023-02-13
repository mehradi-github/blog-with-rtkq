
The Blog is built with [Redux toolkit](https://redux-toolkit.js.org/introduction/getting-started) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview).

- [Store Setup with configureStore](#store-setup-with-configurestore)
- [Defining Mutation Endpoints](#defining-mutation-endpoints)
- [Installing Requirements](#installing-requirements)
- [Simulating data via MSW](#simulating-data-via-msw)


## Store Setup with configureStore
Every Redux app needs to [configure and create a Redux store](https://redux-toolkit.js.org/usage/usage-guide#store-setup). This usually involves several steps:

- Importing or creating the root reducer function
- Setting up middleware, likely including at least one middleware to handle asynchronous logic
- Configuring the Redux DevTools Extension
- Possibly altering some of the logic based on whether the application is being built for development or production

## Defining Mutation Endpoints
[Mutation endpoints](https://redux-toolkit.js.org/rtk-query/usage/mutations) are defined by returning an object inside the endpoints section of createApi, and defining the fields using the build.mutation() method.

## Installing Requirements

```bash
# Redux + TypeScript template
npx create-react-app blog-with-rtkq --template redux-typescript
```
```javascript
# npm start runs a server on port 3001
"scripts": {
    "start": "set PORT=3001 && react-scripts start",
}
```
Learn more: [Install ESLint, Prettier, ESLint Plugin for Testing Library, ESLint Plugin for Jest DOM](https://github.com/mehradi-github/ref-jest-rtl/)

ESLint Plugin for Testing Library
[https://github.com/testing-library/eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)

ESLint Plugin for Jest DOM
[https://github.com/testing-library/eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom)

```bash
#Install plugins
npm i -D eslint-plugin-jest-dom eslint-plugin-testing-library
# git remote set url
git remote set-url origin git@github.com:mehradi-github/ref-blog-with-rtkq.git
```
## Simulating data via MSW
Mock by intercepting requests on the network level: [Simulating data from server](https://github.com/mehradi-github/ref-cafe-msw#simulating-data-from-server)