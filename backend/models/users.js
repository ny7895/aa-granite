import bcrypt from "bcryptjs";

// 🔹 Store Admin Users Here
const users = [
  {
    email: "noahy78951@gmail.com",
    password: bcrypt.hashSync("k1DYwGBd1i6kQIps", 10), // 🔒 Hashed Password
    role: "admin",
  },
  {
    email: "owner@example.com",
    password: bcrypt.hashSync("OwnerPass456!", 10),
    role: "admin",
  },
];

export default users;
