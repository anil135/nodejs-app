const express = require('express');
const app = express();
const port = 3000;

// Your routes here
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Export the app so it can be imported in tests
module.exports = app;

// Export the server for closing in tests
if (require.main === module) {
  app.listen(port, () => {
    console.log("Listening on " + port);
  });
}
