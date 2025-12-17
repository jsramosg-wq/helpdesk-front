const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const usersPath = path.join(__dirname, "../data/users.json");
let users = require("../data/users.json");

exports.getUsers = (req, res) => res.json(users);

exports.createUser = (req, res) => {
    const { name, email, password, role } = req.body;
    const newUser = { id: uuid(), name, email, password, role };
    users.push(newUser);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    res.json({ message: "Usuario creado", user: newUser });
};
