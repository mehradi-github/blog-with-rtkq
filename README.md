
The Blog is built with [Redux toolkit](https://redux-toolkit.js.org/introduction/getting-started) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview).

- [Installing Requirements](#installing-requirements)
- [Simulating data via MSW](#simulating-data-via-msw)


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