import { createGlobalStyle } from 'styled-components';

const globalStyles = createGlobalStyle`
    body {
      background-color: #282c34;
      margin: 0;
      font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    * {
      box-sizing: border-box;
    }
`

export default globalStyles