// ES6 template literals
// indexTemplate is function that calls back content
// template would send from server
export const indexTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>mega chrenddit</title>
  <script src="/static/client.js" type="application/javascript"></script>
<body>
  <div id='react_root'>${content}</div>
</body>
</head>
</html>
`;
