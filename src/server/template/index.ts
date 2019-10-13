import assets from '../../../webpack-assets.json';
import { IState } from '../../universal/state/store/index.js';

export const pageTemplate = (html: string, state: IState) => `
<!DOCTYPE html>
<html>

<head>
    <title>Boilerplate</title>
</head>

<body>
    <main class="container">
        <div id="app">${html}</div>
    </main>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)};
      ${
        (process.env.NODE_ENV || '').trim() === 'production'
          ? '(window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {}).inject = function () {}'
          : ''
      }
    </script>
    <script src="${
      (process.env.NODE_ENV || '').trim() === 'production'
        ? (assets as any).app.js
        : `http://localhost:5005/app.js`
    }"></script>
</body>
</html>
`;
