export const indexTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>sb3000</title>
  <script src="/static/client.js" type="application/javascript"></script>
</head>
<body>
  <div id="react_root">${content}</div>
</body>
</html>
`;
