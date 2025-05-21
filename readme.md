<h1>Node.js + Express CRUD API with Auth</h1>

<p>
  <strong>🔒 JWT Authentication | 🛠 Modular Architecture | 🗃 MongoDB</strong>
</p>

<p>A clean, scalable backend API featuring:</p>
<ul>
  <li>✅ User CRUD operations (Create, Read, Update, Delete)</li>
  <li>✅ JWT-based authentication (Register/Login)</li>
  <li>✅ Role-based authorization (<code>User</code> vs. <code>Admin</code>)</li>
  <li>✅ Validation with <code>Joi</code></li>
  <li>✅ UUID for unique identifiers</li>
</ul>

<h2>🔐 Secret Variables (.env)</h2>
<pre><code>
MONGO_URL=XXX
PORT=5000
JWT_SECRET=XXX
EXPIRES_IN=XXX
</code></pre>

<h2>📚 API Endpoints</h2>
<p><strong>Base URL:</strong><br>
<code>{{base_url}}</code> (Set this in Postman variables, e.g., <code>http://localhost:3000/api</code>)</p>

<h3>🔐 Authentication</h3>
<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Auth Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/auth/register</td>
      <td>Register a new user</td>
      <td>❌ No</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/auth/login</td>
      <td>Login (returns JWT)</td>
      <td>❌ No</td>
    </tr>
  </tbody>
</table>

<h3>👥 User Management</h3>
<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
      <th>Auth Required</th>
      <th>Role Required</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/users/</td>
      <td>Create a new user</td>
      <td>✅ Yes (JWT)</td>
      <td><code>admin</code></td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/users/</td>
      <td>Get all users</td>
      <td>✅ Yes</td>
      <td><code>admin</code></td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/users/:id</td>
      <td>Get a user by ID</td>
      <td>❌ No</td>
      <td>❌ No</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td>/users/:id</td>
      <td>Update a user</td>
      <td>❌ No</td>
      <td>❌ No</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td>/users/:id</td>
      <td>Delete a user</td>
      <td>✅ Yes</td>
      <td><code>admin</code></td>
    </tr>
  </tbody>
</table>

<h2>📦 Postman</h2>
<p>✅ <strong>Postman collection attached to the project.</strong></p>

<hr />
<p align="center">
  <em>Made with ❤️ using Node.js, Express, MongoDB</em>
</p>
