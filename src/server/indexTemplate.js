// ES6 template literals
// indexTemplate is function that calls back content
// template would send from server
export const indexTemplate = (content, token) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>mega chrenddit</title>
  <script src="/static/client.js" type="application/javascript"></script>
  <script>
    window.__token__ = '${token}'
  </script>
<body>
  <div id='react_root'>${content}</div>
  <div id='modal_root'></div>
  <div id='dropdown_root'></div>
</body>
</head>
</html>
`;
