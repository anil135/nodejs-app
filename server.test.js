const request = require('supertest');
const app = require('../app'); // Import the app
let server; // Define a variable for the server

// Start the server before running tests
beforeAll(async () => {
  server = app.listen(3000); // Start the server manually
});

// Test for the root route
describe('GET /', () => {
  it('responds to the world', async () => {
    const res = await request(app)
      .get('/')
      .set('Accept', 'application/json');

    // Assertions
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.message).toBe('Hello World!');
  });
});

// Test for a 404 route
describe('GET /404', () => {
  it('responds with a 404', async () => {
    const res = await request(app)
      .get('/404')
      .set('Accept', 'application/json');

    // Assertions
    expect(res.status).toBe(404);
  });
});

// Close the server after all tests
afterAll(async () => {
  await server.close(); // Close the server to stop the open handle
});

