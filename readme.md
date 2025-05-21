Node.js + Express CRUD API with Auth
🔒 JWT Authentication | 🛠 Modular Architecture | 🗃 MongoDB

A clean, scalable backend API with:
✅ User CRUD operations (Create, Read, Update, Delete)
✅ JWT-based authentication (Register/Login)
✅ Role-based authorization (User vs. Admin)
✅ Validation (Joi)
✅ UUID for unique identifiers

SECRET VARIABLES(.ENV CONTENT)
MONGO_URL=XXX
PORT = 5000
JWT_SECRET=XXX
EXPIRES_IN=XXX

📚 API Endpoints
Base URL
{{base_url}} (Set this in Postman variables, e.g., http://localhost:3000/api)

🔐 Authentication
Method	Endpoint	    Description	            Auth Required
POST	/auth/register	Register a new user	    ❌ No
POST	/auth/login	    Login (returns JWT)	    ❌ No

👥 User Management
Method	Endpoint	Description	        Auth Required	Role Required
POST	/users/	    Create a new user	✅ Yes (JWT)	    admin
GET	    /users/	    Get all users	    ✅ Yes	        admin
GET	    /users/:id	Get a user by ID	❌ No	        ❌ No
PUT	    /users/:id	Update a user	    ❌ No	        ❌ No
DELETE	/users/:id	Delete a user	    ✅ Yes	        admin

POSTMAN collection attached to the project.

