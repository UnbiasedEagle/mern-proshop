import bcrypt from "bcryptjs";

const users = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
  },
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
    isAdmin: true,
  },
];

export default users;
