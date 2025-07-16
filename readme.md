<!DOCTYPE html>
<html lang="en">
<body>

  <h1>🚀 Identity Microservice</h1>
  <p>
    This is an <strong>authentication and user management microservice</strong> built with Node.js, Express.js, and MongoDB.  
    It handles user registration, login, Google OAuth, email verification, password reset, and admin-level user management.  
    Designed as part of my backend learning journey with microservices architecture.
  </p>

  <h2>🔐 Features</h2>

  <h3>Auth Services</h3>
  <ul>
    <li>Public Registration</li>
    <li>Login</li>
    <li>Logout</li>
    <li>Refresh Token</li>
    <li>Email Verification (before first login)</li>
    <li>Forgot Password</li>
    <li>Sign-up / Sign-in with Google</li>
  </ul>

  <h3>User Services</h3>
  <ul>
    <li>System Registration (Admin Only)</li>
    <li>Display All Users</li>
    <li>Get User by ID</li>
    <li>Update User by ID</li>
    <li>Delete User by ID</li>
  </ul>

  <h2>⚙️ Non-Functional Features</h2>
  <ul>
    <li>JWT Authentication</li>
    <li>Role-Based Authorization</li>
    <li>Server-Side Validation</li>
    <li>Pagination with Filtering</li>
    <li>Custom Error Handling</li>
  </ul>

  <h2>🧪 Documentation</h2>
  <ul>
    <li><strong>Postman Collection:</strong> Available in the <code>doc/</code> directory</li>
    <li><strong>Swagger Docs:</strong> Access via <code>/api-docs</code> on your running server</li>
  </ul>

  <h2>🛠️ Tech Stack</h2>
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB</li>
  </ul>

  <h2>🔧 .env Configuration</h2>
  <pre><code>
MONGO_URL=
PORT=

JWT_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_EXPIRES_IN=
REFRESH_EXPIRES_IN=

EMAIL_USER=
EMAIL_PASSWORD=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SESSION_SECRET=
  </code></pre>

  <h2>📦 Dependencies</h2>
  <pre><code>
"dependencies": {
  "bcrypt": "^6.0.0",
  "cookie-parser": "^1.4.7",
  "dotenv": "^16.5.0",
  "express": "^5.1.0",
  "express-session": "^1.18.1",
  "joi": "^17.13.3",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.15.0",
  "nodemailer": "^7.0.3",
  "passport": "^0.7.0",
  "passport-google-oauth20": "^2.0.0",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1",
  "uuid": "^11.1.0"
},
"devDependencies": {
  "nodemon": "^3.1.10"
}
  </code></pre>

</body>
</html>
