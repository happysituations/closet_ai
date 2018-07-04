var port = process.env.PORT || 3000;
var express = require('express');
var path = require('path');
var app = express();

app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});