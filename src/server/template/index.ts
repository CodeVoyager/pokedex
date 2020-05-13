/* eslint-disable @typescript-eslint/no-explicit-any */
import assets from '../../../webpack-assets.json';
import { State } from '../../universal/state/store/index.js';

interface TemplateHtml {
  body: string;
  head: {
    title: string;
  };
}

export const pageTemplate = (
  { body, head: { title } }: TemplateHtml,
  state: State,
  env?: string
): string => `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${title}
${
  (env || '').trim() === 'production'
    ? `<link rel="stylesheet" href="/${(assets as any).app.css}">`
    : ``
}
    <link href="https://fonts.googleapis.com/css?family=Fira+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap" rel="stylesheet">
</head>

<body>
    <main class="container">
        <div id="app">${body}</div>
    </main>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(state)};
${
  (env || '').trim() === 'production'
    ? '(window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {}).inject = function () {}'
    : ''
}
    </script>
    <script src="${
      (env || '').trim() === 'production'
        ? `/${(assets as any).app.js}`
        : `http://localhost:5005/app.js`
    }"></script>
</body>
</html>
`;
