import {createUser} from './src/services/userService.js';
import connectDB from './src/config/db.js';
import "dotenv/config";
await connectDB();

const superAdmin = {
  name: "Super Admin",
  email: "superadmin@yourdomain.com",
  password: "TempP@ssw0rd123!",
  age: 30,
  role: "admin"
};

const user = await createUser(superAdmin);
console.log(user);